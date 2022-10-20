## Подготовка до развёртывания/деплоя:
- Установка всех зависимостей (`express`, `morgan*`, `eslint`, `nodemon`, `pg`, `pg-hstore`, `sequelize`, `sequelize-cli`, `dotenv`, `cors`)
- Инициализация `ESLint` (npx eslint --init)
- Инициализация `Sequelize` (npx sequelize init)
- Настройка БД (конфигурация > создание БД > создание модели > миграция (продумать значение по умолчанию))
- Подготовить скрипты в package.json (отдельное внимание для `start`)
- Подготовить переменные окружения (пакет `dotenv`, находит файл .env и загружает все переменные окружения в окружение текущего процесса, важен порядок инициализации)

## Поиск в БД через метод .findOrCreate(), на примере счётчика:
```
app.get('/', async (req, res) => {
  // деструктуризация первого элемента массива, т.к. метод findOrCreate() возвращает массив
  const [counter] = await Counter.findOrCreate({
    where: {},
    default: {
      counter: 0,
    },
  });
  counter.counter += 1;
  await counter.save();
  res.send(`This page was visited ${counter.counter} times`);
});
```
## Конфигурация ДБ в режиме 'production' ("DATABASE_URL" — зарезервированная переменная окружения для сервиса Heroku):
```
"production": {
    "use_env_variable": "DATABASE_URL",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized" : false
      }
    }
  }
```

## Этапы развёртывая/деплоя Docker образа на Heroku:
1. Логин на Heroku, через `heroku-cli`
2. Создать приложение внутри сервиса Heroku
3. Создать БД Postgres внутри сервиса Heroku и связать с нужным приложением
4. Подготовить когфигурацию БД в режиме `production`
5. Выбрать метод развёртывания
6. Подготовить скрипты запуска приложения в `package.json`
7. Подготовить `Dockerfile` и `.dockerignore`
8. В `Dockerfile` явно указать переменную окружения: `ENV NODE_ENV production`
9. Подготовить образ с определённым именем: `docker build -t registry.heroku.com/<heroku_app_id>/web .`, 
10. Авторизироваться в реестр контейнеров Heroku командой: `heroku container:login`
11. После формирования образа/репозитория его необходимо залить в хранилище образов Heroku, через команду: `docker push registry.heroku.com/<heroku_app_id>/web:latest`
12. Зарелизить загруженный образ/репозиторий можно используя команду: `heroku container:release web --app <heroku_app_id>`

## Полезные команды Heroku:
- `heroku login` - авторизация в Heroku через терминал
- `heroku apps` - список текущих приложений на Heroku
- `heroku container:login` - авторизация в реестр контейнеров Heroku
- `heroku container:release web --app <heroku_app_id>` - релиз контейнера
- `heroku logs` - получить последние логи
- `heroku logs --tail --app <heroku_app_id>` - логирование приложения в реальном времени
- `heroku run --app <heroku_app_id> bash` - переход в bash терминал Heroku приложения
- `heroku restart --app <heroku_app_id>` - рестарт Heroku проекта

## Этапы развёртывая/деплоя на render.com:
1. Логин на render.com
2. Подготовить облачную БД с PostgreSQL на render.com через `New` > `PostgreSQL`
3. Создать приложение внутри сервиса Render.com через `New` > `Web Service`
4. Заполнить форму для дальнейшего развёртывания с указанием окружения `Node.js`
5. Подвязать `GitHub`/`GitLab` аккаунты для связи с проектом/репозиторием или используйте публичную ссылку
6. Заполнить переменные окружения, `DATABASE_URL` и другие...
7. Заполнить `Build Command`, например: `npm i && npm run db-migrate`  и `Start Command`, например: `node app.js`
8. Начать развёртывание с отслежитванием логов
9. Дождаться окончания развёртывания, иногда около 5 минут