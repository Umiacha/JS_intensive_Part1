// 1) все посты
const resAll = await fetch('https://jsonplaceholder.typicode.com/posts');
const posts = await resAll.json();

// 2) один пост
const resOne = await fetch('https://jsonplaceholder.typicode.com/posts/3');
const post = await resOne.json();

// 3) создать
const newPostBody = { userId: 1, title: 'Hello', body: 'world' };
const resCreate = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newPostBody),
});
const created = await resCreate.json();   // { id: 101, ... }

// 4) редактировать целиком
await fetch('https://jsonplaceholder.typicode.com/posts/3', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 1, title: 'Edited', body: 'text' }),
});

// 5) удалить
await fetch('https://jsonplaceholder.typicode.com/posts/3', { method: 'DELETE' });

// 6) посты пользователя
const resUser = await fetch('https://jsonplaceholder.typicode.com/users/1/posts');
const userPosts = await resUser.json();
