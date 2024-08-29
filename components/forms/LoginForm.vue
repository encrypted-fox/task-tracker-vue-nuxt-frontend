<template lang="pug">
.auth__form.flex.border-styling.w-350px.flex-col.gap-25px
  .auth__form-header.py-25px.division-styling.border-0.border-b-1px
    h1.auth__form__title.text-center.text-styling.m-0 Вход
  form.auth__form-content.flex.flex-col.gap-15px.px-25px
    .field
      label.field-label(for="login") Логин
      input.field-string.w-full(id="login" placeholder="Начните писать..." :value="login" @input="changeLogin")
    .field
      label.field-label(for="password") Пароль
      input.field-string.w-full(id="password" type="password" placeholder="Начните писать..." :value="password" @input="changePassword") 
        
  .auth__form-footer.flex.justify-between.px-6.pb-6
    button.btn-lg.btn-secondary(@click="switchToRegister") Зарегистрироваться
    button.btn-lg.btn-primary(@click="submit" :disabled="isButtonDisabled") Войти
</template>
<script setup lang="ts">
const emit = defineEmits(['switch-to-register'])

const login = useState<string>("login-form__login");
const password = useState<string>("login-form__password");

const isButtonDisabled = computed(() => {
  return !password.value || !login.value
})

const changeLogin = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;

  login.value = val
};

const changePassword = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;

  password.value = val;
};

const switchToRegister = () => {
  emit('switch-to-register')
}

useHead(<any>{
  title: 'Вход'
})
</script>