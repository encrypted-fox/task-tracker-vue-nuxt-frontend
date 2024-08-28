<template lang="pug">
.auth.h-100vh.w-100.flex.justify-center.items-center
  .auth__logo-container.flex.w-300px.h-550px.justify-center.items-flex-start.left-radius-6
    img.mt-50(src="@/assets/icons/logo.svg")
  .auth__form-container.w-600px.h-550px.flex.justify-center.items-center.right-radius-6
    .auth__form.w-350px.flex.flex-column.gap-25.radius-6
      .auth__form-header.pv-25
        .auth__form__title.text-center Вход
      form.auth__form-content.flex.flex-column.gap-20.ph-25
        .auth__form__field.flex.flex-column.gap-10
          label.field-label.block(for="login") Логин
          input.field-input(id="login" :value="login" @input="changeLogin" :class="{'field-input--warn': isLoginTooShort}")
          Transition(name='fade')
            .field-input-error(v-if="isLoginTooShort")
              | {{ loginTooShortError }}
        .auth__form__field.flex.flex-column.gap-10
          label.field-label.block(for="password") Пароль
          input.field-input(id="password" type="password" :value="password" @input="changePassword" :class="{'field-input--warn': isWeak}") 
          Transition(name='fade')
            .field-input-error(v-if="isWeak")
              TransitionGroup(name='fade')
                .field-input-error(v-for="(val) in currentMessages", :key="val.name")
                  | {{ val.label }}
            
      .auth__form-footer.flex.justify-space-between.ph-25.pb-25
        button.btn.btn-secondary(@click="goToRegister") Зарегистрироваться
        button.btn.btn-primary(@click="submit" :disabled="isButtonDisabled") Войти
      
</template>
<script setup lang="ts">
interface ErrorMessages {
  no2UpperCase: boolean;
  no3LowerCase: boolean;
  no2Digits: boolean;
  noSpecialSign: boolean;
  no8Characters: boolean;
}

const router = useRouter()

const login = useState<string>("login");
const password = useState<string>("password");

const isWeak = useState<boolean>("isWeak", () => false);
const isLoginTooShort = useState<boolean>("isLoginTooShort", () => false);

const loginTooShortError = 'Логин должен содержать минимум 3 символа';
const errorMessages = useState<ErrorMessages>("errorMessages", () => ({
  no2UpperCase: false,
  no3LowerCase: false,
  no2Digits: false,
  noSpecialSign: false,
  no8Characters: false,
}));


const errorMessagesLabels = [
  { name: "no2UpperCase", label: "Нужно 2 или больше заглавные буквы" },
  { name: "no3LowerCase", label: "Нужно 3 или больше строчные буквы" },
  { name: "no2Digits", label: "Нужно 2 или больше цифры" },
  { name: "noSpecialSign", label: "Нужно специальный символ" },
  { name: "no8Characters", label: "Нужно 8 или больше символов" },
];

const currentMessages = computed(() => {
  return errorMessagesLabels.filter(el => {
    return (errorMessages.value as any)[el.name]
  })
})

const isButtonDisabled = computed(() => {
  return isWeak.value || !password.value || !login.value || isLoginTooShort.value
})

const getMessageLabel = (key: string): string | undefined => {
  return errorMessagesLabels.find(el => el.name === key)?.label
}

const changeLogin = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;

  isLoginTooShort.value = false;

  if (val.length < 3) {
    isLoginTooShort.value = true
  } else {
    isLoginTooShort.value = false
  }

  login.value = val
};

const changePassword = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;

  isWeak.value = false;

  if (!val.match(/(?=.*[A-ZА-Я].*[A-ZА-Я])/)) {
    isWeak.value = true;
    errorMessages.value.no2UpperCase = true;
  } else {
    errorMessages.value.no2UpperCase = false;
  }

  if (!val.match(/(?=.*[0-9].*[0-9])/)) {
    isWeak.value = true;
    errorMessages.value.no2Digits = true;
  } else {
    errorMessages.value.no2Digits = false;
  }

  if (!val.match(/(?=.*[a-zа-я].*[a-zа-я].*[a-zа-я])/)) {
    isWeak.value = true;
    errorMessages.value.no3LowerCase = true;
  } else {
    errorMessages.value.no3LowerCase = false;
  }

  if (!val.match(/(?=.*[\!\@\#\$\&\*\-\^\%\"\'\(\)\=\+\\\/\#\;)])/)) {
    isWeak.value = true;
    errorMessages.value.noSpecialSign = true;
  } else {
    errorMessages.value.noSpecialSign = false;
  }

  if (!val.match(/.{8}/)) {
    isWeak.value = true;
    errorMessages.value.no8Characters = true;
  } else {
    errorMessages.value.no8Characters = false;
  }

  if (isWeak.value) console.log("weak");

  password.value = val;
};

const goToRegister = () => {
  router.push('/auth/register')
}
</script>
<style lang="scss" scoped>
@use '~/assets/scss/variables.scss' as *;
.auth {
  &__logo {
    &-container {
      background-color: $dark-blue-grey;
    }
  }
  &__form {
    border: 1px solid $grey;

    &-header {
      border-bottom: 1px solid $grey;
    }

    &__title {
      font-size: 24px;
      font-weight: 600;
    }

    &-container {
      border: 1px solid $grey;
      box-sizing: border-box;
    }

    &-field {
      &__label {
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
}

.field-input--warn {
  outline-color: $red;
}

.field-input-error {
  color: $red;
  font-size: 12px;
}

:deep(.fade-enter-active),
:deep(.fade-leave-active) {
  transition: opacity 0.2s ease;
}

:deep(.fade-enter-from),
:deep(.fade-leave-to) {
  opacity: 0;
}
</style>

// TODO tests and register page