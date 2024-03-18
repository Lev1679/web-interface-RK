// Конфигурация подключения к базе данных SQL Server
const config = {
  user: 'MySQL Local',
  password: '123123',
  server: 'localhost', // Или IP-адрес вашего SQL Server
  database: 'BD',
  options: {
      encrypt: false, // Установите значение в true, если используете шифрование
      connectionTimeout: 15000, // Тайм-аут подключения (в миллисекундах)
      requestTimeout: 15000, // Тайм-аут запроса (в миллисекундах)
      pool: {
          max: 10, // Максимальное количество соединений в пуле
          min: 0, // Минимальное количество соединений в пуле
          idleTimeoutMillis: 30000 // Максимальное время ожидания для соединений в пуле (в миллисекундах)
      }
  }
};
