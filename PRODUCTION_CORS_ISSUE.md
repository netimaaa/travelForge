# Проблема CORS на production

## Текущая ситуация

При загрузке приложения с `https://ift-1.brojs.ru` статические файлы загружаются с `https://static.brojs.ru/travelforge/master/index.js`, но возникают две проблемы:

1. **404 ошибка** - файл не найден (возможно файлы не загружены или неправильная версия)
2. **CORS ошибка** - сервер `static.brojs.ru` не отправляет CORS заголовки

## Решение

### 1. Проверка билда на admin.brojs.ru

Убедитесь, что:
- Билд завершился успешно
- Файлы загружены на `static.brojs.ru`
- Используется правильная версия (в URL видно `master`)

### 2. Настройка CORS на сервере static.brojs.ru (ОБЯЗАТЕЛЬНО)

**Это критично!** Сервер `static.brojs.ru` должен отправлять следующие заголовки для всех статических файлов:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**Свяжитесь с администраторами brojs** через admin.brojs.ru или напрямую для настройки этих заголовков на сервере.

### 3. Конфигурация проекта

Конфигурация `bro.config.js` теперь соответствует emotion-diary:
- Упрощенная конфигурация без proxy
- Все API запросы обрабатываются через `stubs/api`
- `publicPath` настроен правильно

## Docker

Созданы файлы:
- `Dockerfile` - для сборки и запуска backend
- `docker-compose.yml` - для оркестрации сервисов
- `.dockerignore` - для оптимизации сборки

Для запуска backend в Docker:
```bash
docker-compose up backend
```

## Важно

Проблема с CORS на `static.brojs.ru` **не может быть решена на стороне клиента**. Это настройка сервера, которую должны сделать администраторы brojs.

