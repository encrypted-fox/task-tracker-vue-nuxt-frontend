<template lang="pug">
.auth.h-100vh.w-100.flex.justify-center.items-center
  .auth__logo-container.flex.w-300px.h-550px.justify-center.items-flex-start.left-radius-6
    img.mt-50(src="@/assets/icons/logo.svg")
  .auth__form-container.w-600px.h-550px.flex.justify-center.items-center.right-radius-6
    .auth__form.w-350px.flex.flex-column.gap-25.radius-6
      .auth__form-header.pv-25
        .auth__form__title.text-center Регистрация
      .auth__form-content.flex.flex-column.gap-20.ph-25
        .auth__form__field.flex.flex-column.gap-10
          label.field-label.block(for="login") Логин
          input.field-input(id="login")
        .auth__form__field.flex.flex-column.gap-10
          label.field-label.block(for="password") Пароль
          input.field-input(id="password" type="password") 
        .auth__form__field.flex.flex-column.gap-10
          label.field-label.block(for="password") Повторить пароль
          input.field-input(id="password" type="password") 
      .auth__form-footer.flex.justify-flex-end.ph-25.pb-25
        button.btn.btn-primary Зарегистрироваться
      
</template>
<script setup>
const msg = useState('msg', 'Hello')
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
</style>