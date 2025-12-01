# TravelForge API Endpoints

Все API endpoints доступны через brojs с префиксом `/api`.

## Основные endpoints

### Health Check
- `GET /api/health` - Проверка работоспособности API

### Cities (Города)
- `GET /api/cities` - Получить все города
- `GET /api/cities/search` - Поиск городов по параметрам
- `GET /api/cities/:id` - Получить город по ID

### Trips (Поездки)
- `GET /api/trips` - Получить все поездки пользователя
- `POST /api/trips` - Создать новую поездку
- `GET /api/trips/:id` - Получить поездку по ID
- `PUT /api/trips/:id` - Обновить поездку
- `DELETE /api/trips/:id` - Удалить поездку

### Currencies (Валюты)
- `GET /api/currencies` - Получить курсы валют
- `GET /api/currencies/rates` - Получить актуальные курсы

### Travel Bot
- `POST /api/travelbot` - Получить рекомендации от travel bot

### Auth (Аутентификация)
- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход в систему
- `GET /api/auth/profile` - Получить профиль пользователя (требует токен)

## Генерация контента (старые endpoints)

- `GET /api/generate` - Генерация каталога товаров
- `POST /api/generate-image` - Генерация изображения
- `GET /api/card-image/:uuid` - Получить сгенерированное изображение

## Тестирование

Для тестирования API endpoints используйте:

```bash
# Health check
curl http://localhost:8099/api/health

# Получить все города
curl http://localhost:8099/api/cities

# Тестирование через скрипт
node test-api.js
```

## Примечания

- Все endpoints требуют правильной настройки CORS
- Auth endpoints требуют JWT токен в заголовке `Authorization: Bearer <token>`
- Backend должен быть запущен отдельно через `npm run dev:backend` (порт 5000)
- Или через brojs на порту 8099 (встроенный API)

