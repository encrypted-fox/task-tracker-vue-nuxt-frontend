<template lang="pug">
.auth__form.flex.border-styling.rounded-md.w-350px.flex.flex-col.gap-25px
  .auth__form-header.py-25px.division-styling.border-0.border-b-1px
    h1.auth__form__title.text-center.text-styling.m-0 Регистрация
  form.auth__form-content.flex.flex-col.gap-15px.px-25px
    .field
      label.field-label(for="login") Логин
      input.field-string.w-full(id="login" placeholder="Начните писать..." :value="login" @input="changeLogin" :class="{'field-invalid': isLoginTooShort}")
      Transition(name='disappear-element' mode='out-in')
        .field-error(v-if="isLoginTooShort")
          | {{ loginError }}
    .field
      label.field-label(for="password") Пароль
      input.field-string.w-full(id="password" type="password" placeholder="Начните писать..." :value="password" @input="changePassword" :class="{'field-invalid': isWeak}") 
      Transition(name='fade' mode='out-in')
        .field-input-error(v-if="isWeak || isPasswordNotMatch")
          TransitionGroup(name='disappear-element')
            .field-error(v-for="(val) in currentErrors", :key="val.name")
              | {{ val.label }}
    .field
      label.field-label(for="repeatPassword") Повторить пароль
      input.field-string.w-full(id="repeatPassword" type="password" placeholder="Начните писать..." :value="repeatPassword" @input="changeRepeatPassword" :class="{'field-input-input--error': isPasswordNotMatch}") 
        
  .auth__form-footer.flex.justify-between.px-25px.pb-25px
    button.btn-lg.btn-secondary(@click="switchToLogin") Войти
    button.btn-lg.btn-primary(@click="submit" :disabled="isButtonDisabled") Зарегистрироваться
</template>

<script setup lang="ts">
import type { AuthErrorMessages  } from '~/types';
import { passwordErrors, loginError } from '~/utils/errors';

const emit = defineEmits(['switch-to-login'])

const login = useState<string>("register-form__login");
const password = useState<string>("register-form__password");
const repeatPassword = useState<string>("register-form__repeatPassword");

const isWeak = useState<boolean>("isWeak", () => false);
const isPasswordNotMatch = useState<boolean>("isPasswordNotMatch", () => false);
const isLoginTooShort = useState<boolean>("isLoginTooShort", () => false);

const errorMessages = useState<AuthErrorMessages>("errorMessages", () => ({
  no2UpperCase: false,
  no3LowerCase: false,
  no2Digits: false,
  noSpecialSign: false,
  no8Characters: false,
  noMatch: false,
}));

const currentErrors = computed(() => {
  return passwordErrors.filter(el => {
    return (errorMessages.value as any)[el.name]
  })
})

const isButtonDisabled = computed(() => {
  return isWeak.value || !password.value || !login.value || isLoginTooShort.value || isPasswordNotMatch.value
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

const changeRepeatPassword = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;

  isPasswordNotMatch.value = false;

  if (val !== password.value) {
    isPasswordNotMatch.value = true;
    errorMessages.value.noMatch = true;
  } else {
    errorMessages.value.noMatch = false;
  }

  if (isPasswordNotMatch.value) console.log("weak");

  repeatPassword.value = val;
};

const switchToLogin = () => {
  emit('switch-to-login')
}

useHead(<any>{
  title: 'Регистрация'
})
</script>