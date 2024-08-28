<template lang="pug">
.auth__form.w-350px.flex.flex-column.gap-25.radius-6
  .auth__form-header.pv-25
    h1.auth__form__title.text-center Вход
  form.auth__form-content.flex.flex-column.gap-20.ph-25
    .field.flex.flex-column.gap-10
      label.field-label.block(for="login") Логин
      input.field-input(id="login" :value="login" @input="changeLogin" :class="{'field-input--error': isLoginTooShort}")
      Transition(name='fade' mode='out-in')
        .auth__form__field-input-error(v-if="isLoginTooShort")
          | {{ loginError }}
    .field.flex.flex-column.gap-10
      label.field-label.block(for="password") Пароль
      input.field-input(id="password" type="password" :value="password" @input="changePassword" :class="{'field-input--error': isWeak}") 
      Transition(name='fade' mode='out-in')
        .auth__form__field-input-error(v-if="isWeak")
          TransitionGroup(name='fade')
            .auth__form__field-input-error(v-for="(val) in currentErrors", :key="val.name")
              | {{ val.label }}
        
  .auth__form-footer.flex.justify-between.ph-25.pb-25
    button.btn.btn-secondary(@click="switchToRegister") Зарегистрироваться
    button.btn.btn-primary(@click="submit" :disabled="isButtonDisabled") Войти
</template>

<script setup lang="ts">
import type { ErrorMessages } from '~/types';
import { passwordErrors, loginError } from '~/utils/errors';

const emit = defineEmits(['switch-to-register'])

const login = useState<string>("login");
const password = useState<string>("password");

const isWeak = useState<boolean>("isWeak", () => false);
const isLoginTooShort = useState<boolean>("isLoginTooShort", () => false);

const errorMessages = useState<ErrorMessages>("errorMessages", () => ({
  no2UpperCase: false,
  no3LowerCase: false,
  no2Digits: false,
  noSpecialSign: false,
  no8Characters: false,
}));

const currentErrors = computed(() => {
  return passwordErrors.filter(el => {
    return (errorMessages.value as any)[el.name]
  })
})

const isButtonDisabled = computed(() => {
  return isWeak.value || !password.value || !login.value || isLoginTooShort.value
})

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

const switchToRegister = () => {
  emit('switch-to-register')
}

useHead(<any>{
  title: 'Вход'
})
</script>
<style lang="scss" scoped>
@use '~/assets/scss/colors.scss' as *;

.auth__form {
  border: 1px solid $grey;

  &-header {
    border-bottom: 1px solid $grey;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
}
</style>