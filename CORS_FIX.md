# Решение проблемы CORS на production

## Проблема
При загрузке приложения с `https://ift-1.brojs.ru` статические файлы загружаются с `https://static.brojs.ru/travelforge/master/index.js`, но сервер не отправляет CORS заголовки.

## Решения

### 1. Настройка на стороне сервера static.brojs.ru (обязательно)

Сервер `static.brojs.ru` должен отправлять следующие заголовки для всех статических файлов:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**Это критично!** Без этих заголовков на сервере статических файлов приложение не будет работать.

### 2. Изменения в bro.config.js

Уже добавлено:
```javascript
output: {
  publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
  crossOriginLoading: 'anonymous'
}
```

Это добавляет атрибут `crossorigin="anonymous"` к тегам `<script>` и `<link>`.

### 3. Альтернативное решение - использование относительных путей

Если возможно, можно изменить `publicPath` на относительный путь, но это зависит от архитектуры brojs.

## Что нужно сделать

1. **Связаться с администраторами brojs** и попросить настроить CORS заголовки на сервере `static.brojs.ru` для домена `ift-1.brojs.ru`

2. **Пересобрать проект** после изменений в `bro.config.js`:
   ```bash
   npm run build:prod
   ```

3. **Задеплоить** обновленную версию через admin.brojs.ru

## Проверка

После настройки CORS заголовков на сервере, проверьте в консоли браузера:
- Запросы к `static.brojs.ru` должны возвращать заголовок `Access-Control-Allow-Origin`
- Ошибки CORS должны исчезнуть

