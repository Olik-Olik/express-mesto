# Здесь будет ваш проект на Реакте с авторизацией и регистрацией

Используйте ваши предыдущие наработки по проекту Mesto. 
Это может быть работа 11-го спринта или его улучшенная версия
после 2-х последних спринтов.

Все запросы на авторизацию, регистрацию и проверку токена 
должны работать через сервис `https://auth.nomoreparties.co`.
Остальные запросы, не относящиеся к этой проектной работе
могут быть к бэкенду из предыдущих спринтов.



Инфраструктура проекта
Создайте проект
Создайте папку с проектом и инициализируйте в ней package.json.
Настройте editorconfig

Затем создайте в корне проекта файл .editorconfig и скопируйте туда настройки:
# http://editorconfig.org
Настройте линтер eslint
Он отлавливает ошибки и следит за единообразием кода.  
Мы будем работать по самому популярному стайлгайду — Airbnb.
Для начала установите три dev-зависимости:
Сам ESLint. 
Ещё две dev-зависимости:
eslint-config-airbnb-base
eslint-plugin-import

В корне проекта создайте файл .eslintrc и добавьте в него:
{
"extends": "airbnb-base"
}
В файл package.json добавьте новую команду lint.
При её запуске выполняется запуск eslint: npx eslint ..

eslint в редактор код
Добавьте исключение _id
 .eslintrc добавьте исключение для идентификатора _id.
Стайлгайд Airbnb.

Инициализируйте git-репозиторий
Инициализируйте git-репозиторий в корне проекта и создайте файл .gitignore:
vim .gitignore
git add .gitignore

Точку входа — файл app.js
Заведите в нём express-сервер и настройте его запуск на 3000 порту.
npm run start 

Настройте хот релоуд-установите пакет nodemon
Приложение с хот релоудом должно запускаться командой:
npm run dev 

База данных, контроллеры и роуты для карточек и пользователей
Подключитесь к Mongo
В app.js подключитесь к серверу MongoDB по адресу:
mongodb://localhost:27017/mestodb
xcode-select --install
sudo xcodebuild -license
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew tap mongodb/brew
brew install mongodb-community@4.4
Для запуска: brew services start mongodb-community@4.2
Сервер запущен
Ссылка на установщик Compass: https://www.mongodb.com/download-center/compass.

