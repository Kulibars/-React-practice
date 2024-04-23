Облости хранения данных:

- база данных json-server
- BFF
- redux store

Сущности приложения:

- пользователь: База данных (список пользователей), BFF (сессия текущего пользователя), redux store (отображение в браузере)
- роль пользователя: База данных (список ролей), BFF (сессия пользователя с ролью), redux store (использование в браузере(на клиенте))
- статья: База данных (список статей), redux store (отображение в браузере)
- комментарий: База данных (список комментариев), redux store (отображение комментариев)

таблицы базы данных:

- пользователи - users: id / login / password / registed_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- комментарии - comments: id / author_id / posts_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для redux store (на клиенте):

- user: id / login / roleId / session
- posts: массив post: id / title / imageUrl / content / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt

- users: массив user: id / login / registedAt / role
