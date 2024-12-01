export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  messages: {
    ru: {
      pages: {
        auth: {
          login: {
            title: 'Вход'
          },
          register: {
            title: 'Регистрация'
          }
        },
        tasks: {
          title: 'Список задач',
        },
      },
      forms: {
        login: {
          login: 'Вход',
          forgotPassword: 'Забыли пароль?',
        },
        register: {
          register: 'Регистрация',
          email: 'Электронная почта',
          repeatPassword: 'Повторите пароль',
        },
        common: {
          toRegister: 'Зарегистрироваться',
          toLogin: 'Войти',

          username: 'Имя пользователя',
          password: 'Пароль',
          startTyping: 'Начните писать...',
          emailPlaceholder: "example{'@'}gmail.com",
          search: 'Поиск...',
        },
      },
      menu: {
        tasks: 'Задачи',
        boards: 'Доски',
        projects: 'Проекты',
        calendar: 'Календарь',
        team: 'Команда',
        profile: 'Профиль',
        theme: 'Сменить тему',
        translate: 'Сменить язык',
        settings: 'Настройки',
        logout: 'Вы успешно вышли из аккаунта!',
        exit: 'Выход',
      },
      modals: {
        forgotPassword: {
          passwordRecovery: 'Восстановление пароля',
          enterUsernameOrEmail:
            'Введите имя пользователя или электронную почту',
          recover: 'Восстановить',
        },
      },
      common: {
        cancel: 'Отмена',
        listEmpty: 'Список пуст',
        returnHome: 'На главную страницу',
      },
      messages: {
        passwordErrors: {
          no2UpperCase: 'Нужно 2 или больше заглавные буквы',
          no3LowerCase: 'Нужно 3 или больше строчные буквы',
          no2Digits: 'Нужно 2 или больше цифры',
          noSpecialSign: 'Нужен специальный символ',
          no8Characters: 'Нужно 8 или больше символов',
          noMatch: 'Пароли не совпадают',
        },

        usernameError: 'Имя пользователя должно содержать минимум 3 символа',
        emailError: 'Неправильный формат электронной почты',

        loginSuccessMessage: 'Вход выполнен успешно!',
        loginErrorMessage: 'Во время входа произошла ошибка!',

        registerSuccessMessage: 'Регистрация выполнена успешно!',
        registerErrorMessage: 'Во время регистрации произошла ошибка!',

        recoverySuccessMessage:
          'Восстановление выполнено успешно! Проверьте почту',
        recoveryErrorMessage: 'Во время восстановления произошла ошибка!',
        ordinaryErrorMessage: 'Произошла ошибка!',
      },
    },
    en: {
      pages: {
        auth: {
          login: {
            title: 'Login'
          },
          register: {
            title: 'Register'
          }
        },
        tasks: {
          title: 'Tasks list',
        },
      },
      forms: {
        login: {
          login: 'Login',
          forgotPassword: 'Forgot password?',
        },
        register: {
          register: 'Register',
          email: 'Email',
          repeatPassword: 'Repeat password',
        },
        common: {
          toRegister: 'Register',
          toLogin: 'Login',

          username: 'Username',
          password: 'Password',
          startTyping: 'Start typing...',
          emailPlaceholder: "example{'@'}gmail.com",
          search: 'Search...',
        },
      },
      menu: {
        tasks: 'Tasks',
        boards: 'Boards',
        projects: 'Projects',
        calendar: 'Calendar',
        team: 'Team',
        profile: 'Profile',
        theme: 'Change theme',
        translate: 'Change language',
        settings: 'Settings',
        logout: 'Logout was successful!',
        exit: 'Exit',
      },
      modals: {
        forgotPassword: {
          passwordRecovery: 'Recover password',
          enterUsernameOrEmail: 'Enter username or email',
          recover: 'Recover',
        },
      },
      common: {
        cancel: 'Cancel',
        listEmpty: 'List is empty',
        returnHome: 'To main page',
      },
      messages: {
        passwordErrors: {
          no2UpperCase: 'Need 2 or more uppercase letters',
          no3LowerCase: 'Need 3 or more lowercase letters',
          no2Digits: 'Need 2 or more digits',
          noSpecialSign: 'Need special symbol',
          no8Characters: 'Need 8 or more symbols',
          noMatch: "Passwords don't match",
        },

        usernameError: 'Username must contain at least 3 symbols',
        emailError: 'Incorrect email format',

        loginSuccessMessage: 'Login is successfull!',
        loginErrorMessage: 'There is an error during login!',

        registerSuccessMessage: 'Registration is successfull!',
        registerErrorMessage: 'There is an error during registration!',

        recoverySuccessMessage: 'Recovery is successfull! Check the email',
        recoveryErrorMessage: 'There is an error during recovery!',
        ordinaryErrorMessage: 'There is an error!',
      },
    },
  },
}))
