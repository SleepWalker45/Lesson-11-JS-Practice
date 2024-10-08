// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

const { User } = require('../class/user')

User.create({
  email: 'test@mail.com',
  password: 123,
  role: 1,
})

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('signup', {
    // вказуємо назву контейнера
    name: 'signup',
    // вказуємо назву компонентів
    component: ['back-button', 'field', 'field-password', 'field-checkbox', 'field-select'],

    // вказуємо назву сторінки
    title: 'Signup page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      role: [
        {value: User.USER_ROLE.USER, text: 'Пользователь'},
        {value: User.USER_ROLE.ADMIN, text: 'Администратор'},
        {value: User.USER_ROLE.DEVELOPER, text: 'Разработчик'},
      ]
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/signup', function (req, res) {
  const { email, password, role } = req.body;

  console.log(req.body);

  if (!email || !password || !role) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют!'
    })
  }

  try {
    User.create({ email, password, role });

    return res.status(200).json({
      message: 'Пользователь успешно создан!'
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Ошибка создания пользователя!'
    })
  }
})

// Підключаємо роутер до бек-енду
module.exports = router
