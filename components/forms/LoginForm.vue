<template lang="pug">
.auth__form.flex.border-styling.w-350px.flex-col.gap-25px
  .auth__form-header.py-25px.division-styling.border-0.border-b-1px
    h1.auth__form__title.text-center.text-styling.m-0 Вход

  form.auth__form-content.flex.flex-col.gap-15px.px-25px
    FieldsStringField(label='Логин' name="login" placeholder="Начните писать..." :value="login" @input="changeLogin")
    FieldsStringField(label='Пароль' name="password" placeholder="Начните писать..." type="password" :value="password" @input="changePassword")

  .auth__form-footer.flex.justify-between.px-6.pb-6
    button.btn-lg.btn-secondary(@click="switchToRegister") Зарегистрироваться
    button.btn-lg.btn-primary(@click="submit" :disabled="isButtonDisabled") Войти
</template>
<script setup lang="ts">
const emit = defineEmits(['switch-to-register'])

const login = useState<string>(() => '');
const password = useState<string>(() => '');

const isButtonDisabled = computed(() => {
  return !password.value || !login.value
})

const changeLogin = (val: string) => {
  login.value = val
};

const changePassword = (val: string) => {
  password.value = val;
};

const switchToRegister = () => {
  emit('switch-to-register')
}

useHead(<any>{
  title: 'Вход'
})
</script>