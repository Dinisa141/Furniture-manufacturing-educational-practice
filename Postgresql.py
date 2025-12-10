import pandas as pd
from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres:Dinis141592@localhost:5432/shopPostgres')

files_to_tables = {
    'Material_type_import.xlsx': 'material_type',
    'Product_type_import.xlsx': 'product_type', 
    'Product_workshops_import.xlsx': 'product_workshops',
    'Products_import.xlsx': 'products',
    'Workshops_import.xlsx': 'workshops'
}

for file_name, table_name in files_to_tables.items():
    try:
        print(f"Загрузка {file_name}...")
        
        # Укажите кодировку для чтения файла
        df = pd.read_excel(file_name, engine='openpyxl')
        
        print(f"  Прочитано строк: {len(df)}, колонок: {len(df.columns)}")
        print(f"  Колонки: {list(df.columns)}")
        
        # ПРЕЖДЕ ЧЕМ ЗАГРУЖАТЬ - ОЧИСТИТЕ ДАННЫЕ
        # Преобразуем все строковые колонки в правильную кодировку
        for col in df.columns:
            if df[col].dtype == 'object':  # если это строка
                df[col] = df[col].apply(lambda x: str(x).encode('latin1').decode('utf-8', errors='ignore') 
                                        if isinstance(x, str) else x)
        
        # Загрузка в базу
        df.to_sql(
            table_name,
            engine,
            if_exists='replace',
            index=False
        )
        
        print(f"✓ Успешно загружено в таблицу '{table_name}'")
        
    except Exception as e:
        print(f"✗ Ошибка: {str(e)}")
        print(f"  Тип ошибки: {type(e).__name__}")