<template>
  <div class="content">
    <div style="margin: 0 auto;text-align:center">
      <label for="InputUsername">Имя пользователя</label>
      <input id="InputUsername" v-model="login">

      <label for="InputPassword">Пароль</label>
      <input id="InputPassword" v-model="password" type="password">
      <br>
      <label for="SavePassword">Сохранить пароль?</label>
      <input id="SavePassword" v-model="savePassword" type="checkbox">

      <div id="captcha" style="text-align: -webkit-center">
        <recaptcha />
      </div>
      <div style="margin-top: 15px;">
        <input type="button" title="Авторизация или регистрация нового аккаунта" value="Войти" @click="Auth">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      login: '',
      password: '',
      savePassword: false,
      captcha: ''
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef

    this.login = localStorage.getItem('login')
    this.password = localStorage.getItem('password')
    this.savePassword = localStorage.getItem('savePassword')
  },

  methods: {
    async Auth () {
      const captcha = await this.$recaptcha.getResponse()
      this.$api.$post('https://social.katelinlis.xyz/api/auth/login', {
        username: this.login,
        password: this.password,
        captcha

      }).then((data) => {
        localStorage.setItem('login', this.login)
        localStorage.setItem('password', this.password)
        localStorage.setItem('token', this.password)
        this.$cookies.set('token', data.token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        localStorage.setItem('savePassword', this.savePassword)
        this.$router.push(`/user/${data.userid}`)
      })
      await this.$recaptcha.reset()
    }
  }

})
</script>
<style scoped>
label[for="InputUsername"],label[for="InputPassword"]{
  display: block;
}
input[type="button"]{
  text-decoration: none;
  display: inline-block;
  width: 140px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  margin: 10px 20px;
  font-family: 'Montserrat', sans-serif;

  text-transform: uppercase;
  text-align: center;

  color: #524f4e;
  background: white;
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
  transition: .3s;
}
input[type="button"]:hover{
  background: #2EE59D;
  box-shadow: 0 15px 20px rgba(46, 229, 157, .4);
  color: white;
  transform: translateY(-7px);
}
</style>
