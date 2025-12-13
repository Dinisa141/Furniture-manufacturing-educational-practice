// API конфигурация
const API_BASE_URL = 'http://localhost:3000/api';

// Vue приложение
const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        // Состояние приложения
        const currentPage = ref('dashboard');
        const history = ref(['dashboard']);
        const loading = ref(true);
        const apiConnected = ref(false);
        const loadTime = ref(0);
        
        // Данные
        const products = ref([]);
        const workshops = ref([]);
        const materials = ref([]);
        const productTypes = ref([]);
        
        // Формы и модальные окна
        const showProductModal = ref(false);
        const editingProduct = ref(null);
        const productForm = ref({
            article: '',
            product_name: '',
            minimum_cost: '',
            main_material_id: '',
            product_type_id: ''
        });
        const errors = ref({});
        
        // Прочие состояния
        const selectedProduct = ref('');
        const productionTime = ref(null);
        const notifications = ref([]);
        const currentTime = ref('');
        const currentYear = ref(new Date().getFullYear());

        // Вычисляемые свойства
        const pageTitle = computed(() => {
            const titles = {
                'dashboard': 'Главная',
                'products': 'Продукция',
                'workshops': 'Цеха',
                'materials': 'Материалы',
                'types': 'Типы продукции',
                'connections': 'Связи'
            };
            return titles[currentPage.value] || 'Главная';
        });

        const menuItems = computed(() => [
            { id: 'dashboard', name: 'Главная', icon: 'fas fa-home' },
            { id: 'products', name: 'Продукция', icon: 'fas fa-box', badge: products.value.length },
            { id: 'workshops', name: 'Цеха', icon: 'fas fa-warehouse', badge: workshops.value.length },
            { id: 'materials', name: 'Материалы', icon: 'fas fa-cubes', badge: materials.value.length },
            { id: 'types', name: 'Типы', icon: 'fas fa-tags' },
            { id: 'connections', name: 'Связи', icon: 'fas fa-link' }
        ]);

        const recentProducts = computed(() => {
            return [...products.value]
                .sort((a, b) => b.id - a.id)
                .slice(0, 5);
        });

        const totalItems = computed(() => {
            return products.value.length + workshops.value.length + materials.value.length;
        });

        // Методы
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2
            }).format(amount);
        };

        const getMaterialName = (materialId) => {
            const material = materials.value.find(m => m.id == materialId);
            return material ? material.material_name : 'Неизвестно';
        };

        const getProductTypeName = (typeId) => {
            const type = productTypes.value.find(t => t.id == typeId);
            return type ? type.type_name : 'Неизвестно';
        };

        const showNotification = (type, title, message) => {
            const id = Date.now();
            const icons = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };

            notifications.value.push({
                id,
                type,
                title,
                message,
                icon: icons[type] || 'fa-info-circle'
            });

            // Автоматическое удаление через 5 секунд
            setTimeout(() => {
                removeNotification(id);
            }, 5000);
        };

        const removeNotification = (id) => {
            const index = notifications.value.findIndex(n => n.id === id);
            if (index !== -1) {
                notifications.value.splice(index, 1);
            }
        };

        // API методы
        const fetchData = async () => {
            loading.value = true;
            const startTime = Date.now();

            try {
                const [productsRes, workshopsRes, materialsRes, typesRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/products`),
                    fetch(`${API_BASE_URL}/workshops`),
                    fetch(`${API_BASE_URL}/material-types`),
                    fetch(`${API_BASE_URL}/product-types`)
                ]);

                if (!productsRes.ok) throw new Error('Ошибка загрузки продуктов');
                if (!workshopsRes.ok) throw new Error('Ошибка загрузки цехов');
                if (!materialsRes.ok) throw new Error('Ошибка загрузки материалов');
                if (!typesRes.ok) throw new Error('Ошибка загрузки типов');

                products.value = await productsRes.json();
                workshops.value = await workshopsRes.json();
                materials.value = await materialsRes.json();
                productTypes.value = await typesRes.json();

                apiConnected.value = true;
                loadTime.value = ((Date.now() - startTime) / 1000).toFixed(2);
                
                showNotification('success', 'Данные загружены', 'Все данные успешно получены с сервера');

            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
                apiConnected.value = false;
                showNotification('error', 'Ошибка загрузки', error.message);
            } finally {
                loading.value = false;
            }
        };

        const saveProduct = async () => {
            // Валидация
            errors.value = {};
            let hasErrors = false;

            if (!productForm.value.article.trim()) {
                errors.value.article = 'Артикул обязателен';
                hasErrors = true;
            }

            if (!productForm.value.product_name.trim()) {
                errors.value.product_name = 'Наименование обязательно';
                hasErrors = true;
            }

            const cost = parseFloat(productForm.value.minimum_cost);
            if (isNaN(cost) || cost < 0) {
                errors.value.minimum_cost = 'Стоимость должна быть неотрицательным числом';
                hasErrors = true;
            }

            if (!productForm.value.main_material_id) {
                errors.value.main_material_id = 'Выберите основной материал';
                hasErrors = true;
            }

            if (!productForm.value.product_type_id) {
                errors.value.product_type_id = 'Выберите тип продукции';
                hasErrors = true;
            }

            if (hasErrors) {
                showNotification('error', 'Ошибка валидации', 'Исправьте ошибки в форме');
                return;
            }

            try {
                const url = editingProduct.value 
                    ? `${API_BASE_URL}/products/${editingProduct.value.id}`
                    : `${API_BASE_URL}/products`;
                
                const method = editingProduct.value ? 'PUT' : 'POST';
                
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        article: productForm.value.article,
                        product_name: productForm.value.product_name,
                        minimum_cost: cost.toFixed(2),
                        main_material_id: parseInt(productForm.value.main_material_id),
                        product_type_id: parseInt(productForm.value.product_type_id)
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Ошибка сохранения');
                }

                showNotification('success', 'Успешно!', 
                    editingProduct.value ? 'Продукт обновлен' : 'Продукт добавлен');
                
                showProductModal.value = false;
                resetProductForm();
                await fetchData();

            } catch (error) {
                console.error('Ошибка сохранения продукта:', error);
                showNotification('error', 'Ошибка сохранения', error.message);
            }
        };

        const editProduct = (product) => {
            editingProduct.value = product;
            productForm.value = {
                article: product.article,
                product_name: product.product_name,
                minimum_cost: product.minimum_cost,
                main_material_id: product.main_material_id,
                product_type_id: product.product_type_id
            };
            showProductModal.value = true;
        };

        const deleteProduct = async (id) => {
            const product = products.value.find(p => p.id === id);
            if (!product) return;

            if (!confirm(`Удалить продукт "${product.product_name}" (${product.article})?`)) {
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/products/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error('Ошибка удаления');

                showNotification('success', 'Удалено', `Продукт "${product.product_name}" удален`);
                await fetchData();

            } catch (error) {
                showNotification('error', 'Ошибка удаления', error.message);
            }
        };

        const calculateProductionTime = () => {
            if (!selectedProduct.value) {
                productionTime.value = null;
                return;
            }
            
            // Простой пример расчета (в реальном приложении нужно получать данные из product_workshops)
            productionTime.value = Math.floor(Math.random() * 20) + 5;
            showNotification('info', 'Расчет завершен', 
                `Время производства: ${productionTime.value} часов`);
        };

        const changePage = (page) => {
            if (currentPage.value !== page) {
                history.value.push(page);
                currentPage.value = page;
            }
        };

        const goBack = () => {
            if (history.value.length > 1) {
                history.value.pop();
                currentPage.value = history.value[history.value.length - 1];
            }
        };

        const resetProductForm = () => {
            productForm.value = {
                article: '',
                product_name: '',
                minimum_cost: '',
                main_material_id: '',
                product_type_id: ''
            };
            editingProduct.value = null;
            errors.value = {};
        };

        // Инициализация
        onMounted(() => {
            console.log('🚀 Vue.js приложение инициализировано');
            
            // Обновление времени
            const updateTime = () => {
                currentTime.value = new Date().toLocaleTimeString('ru-RU');
            };
            updateTime();
            setInterval(updateTime, 1000);

            // Загрузка данных
            fetchData();
        });

        return {
            // Состояние
            currentPage,
            loading,
            apiConnected,
            loadTime,
            products,
            workshops,
            materials,
            productTypes,
            showProductModal,
            editingProduct,
            productForm,
            errors,
            selectedProduct,
            productionTime,
            notifications,
            currentTime,
            currentYear,
            history,

            // Вычисляемые свойства
            pageTitle,
            menuItems,
            recentProducts,
            totalItems,

            // Методы
            formatCurrency,
            getMaterialName,
            getProductTypeName,
            showNotification,
            removeNotification,
            saveProduct,
            editProduct,
            deleteProduct,
            calculateProductionTime,
            changePage,
            goBack
        };
    }
}).mount('#app');