const express = require('express');
const cors = require('cors');
require('dotenv').config();

const materialTypesRoutes = require('./routes/materialTypes');
const productTypesRoutes = require('./routes/productTypes');
const productsRoutes = require('./routes/products');
const workshopsRoutes = require('./routes/workshops');
const productWorkshopsRoutes = require('./routes/productWorkshops');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка CORS для Vue.js фронтенда
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true
}));
app.use(express.json());

// Роуты
app.use('/api/material-types', materialTypesRoutes);
app.use('/api/product-types', productTypesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/workshops', workshopsRoutes);
app.use('/api/product-workshops', productWorkshopsRoutes);

// Проверка работы API
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK',
        message: 'Manufacturing API is running',
        timestamp: new Date().toISOString()
    });
});

// Главная страница
app.get('/', (req, res) => {
    res.json({ 
        message: 'Manufacturing Management System API',
        version: '1.0.0',
        endpoints: [
            '/api/products - Products management',
            '/api/workshops - Workshops management',
            '/api/material-types - Materials management',
            '/api/product-types - Product types',
            '/api/product-workshops - Product-workshop connections'
        ]
    });
});

// Обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`✅ Backend server is running on port ${PORT}`);
    console.log(`📊 API available at http://localhost:${PORT}/api`);
});