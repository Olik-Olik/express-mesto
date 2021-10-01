# Здесь будет ваш проект на Реакте с авторизацией и регистрацией

# УРРРА
sudo netstat -lntp | grep 3000 

###Используйте ваши предыдущие наработки по проекту Mesto. 
Это может быть работа 11-го спринта или его улучшенная версия
после 2-х последних спринтов.

###Все запросы на авторизацию, регистрацию и проверку токена 
должны работать через сервис `https://auth.nomoreparties.co`.
Остальные запросы, не относящиеся к этой проектной работе
могут быть к бэкенду из предыдущих спринтов.

###Чтобы обрабатывать запрос HTTP POST в Экспресс .js версии 4 и выше,
вам необходимо установить модуль промежуточного программного обеспечения  body-parser
npm install body-parser --save


###Инфраструктура проекта
Создайте проект
Создайте папку с проектом и инициализируйте в ней package.json.
Настройте editorconfig

Затем создайте в корне проекта файл .editorconfig и скопируйте туда настройки:
### http://editorconfig.org

###Настройте линтер .eslintrc
Он отлавливает ошибки и следит за единообразием кода.  
Мы будем работать по самому популярному стайлгайду — Airbnb.
npm install eslint --save-dev
./node_modules/.bin/eslint --init
Установим 
eslint-config-airbnb-base
eslint-plugin-import

{
"extends": "airbnb-base"
}
"no-underscore-dangle": [ "error",
{
"allow": [ "_id" ]
}


###Инициализируйте git-репозиторий
Инициализируйте git-репозиторий в корне проекта и создайте файл .gitignore и установить,
т.к. по умолчанию он не добавляется в репозиторий:
gitignore
git add .gitignore
git commit -m "message" .gitignore

###express
npm i -S express

###Точку входа — файл app.js
Заведите в нём express-сервер и настройте его запуск на 3000 порту.
npm run start 

###Настройте хот релоуд-установите пакет nodemon
"dev": "nodemon app.js"
Приложение с хот релоудом должно запускаться командой:
npm run dev 

###База данных, контроллеры и роуты для карточек и пользователей
Подключитесь к Mongo
В app.js подключитесь к серверу MongoDB по адресу:
mongodb://localhost:27017/mestodb
Запуск
brew services start mongodb-community@4.4
npm i mongoose
###Запускаем сервер MongoDB
Сервер mongo запускают командой mongod:
mongod
Это нужно делать до запуска Node.js приложения.
Иначе оно не сможет подключиться к базе данных и взаимодействовать с ней.


xcode-select --install
sudo xcodebuild -license
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew tap mongodb/brew
brew install mongodb-community@4.4
Для запуска: brew services start mongodb-community@4.2
###Ссылка на установщик Compass: https://www.mongodb.com/download-center/compass.

