<!--
    Сверстал Михаил Лебединец lebedinets.ru
    Собрала и подключила к проекту Кейтлин Лис
-->
<template>
  <div class="content">
    <div class="login-container">
      <div class="login-header">
        <div class="login-header-text">
          <span>{{ $t('Login') }}</span>
        </div>

        <div class="login-header-logo">
          <img src="/img/login/login-header-logo.svg" alt="Логотип OnlyOne">
        </div>

        <div class="login-header-line" />
      </div>

      <div class="login-form">
        <div class="login-form-text">
          <span>{{ $t('UserName') }}</span>
        </div>
        <div class="login-form-input-container">
          <div class="login-form-input-icon">
            <img src="/img/login/login-form-input-icon-login.svg">
          </div>

          <div class="login-form-inputbox">
            <input v-model="login" type="text" placeholder="Введите Ваш логин">
          </div>
        </div>

        <div class="login-form-text">
          <span>{{ $t('UserPassword') }}</span>
        </div>
        <div class="login-form-input-container">
          <div class="login-form-input-icon">
            <img src="/img/login/login-form-input-icon-password.svg">
          </div>

          <div class="login-form-inputbox">
            <input v-model="password" type="password" placeholder="Введите Ваш пароль">
          </div>

          <div v-if="false" class="login-form-input-show">
            <img src="/img/login/login-form-input-show.svg">
          </div>
        </div>

        <div class="login-form-store-password">
          <input type="checkbox" id="login-form-store-password-checkbox" v-model="savePassword">
          <label for="login-form-store-password-checkbox">{{ $t('SavePassword') }}?</label>
        </div>

        <div class="login-form-captcha">
          <recaptcha />
        </div>

        <div class="login-form-button">
          <button title="Войти или создать новый аккаунт" @click="Auth">
            {{ $t('Login') }}
          </button>
        </div>
      </div>

      <div class="login-footer">

        <div class="login-footer-string">
          <span>При нажатии Войти происходит проверка существования аккаунта, если аккаунт не найден, то вы успешно зарегистрируете новый аккаунт</span>
        </div>

      </div>

      <div v-if="false" class="login-footer">
        <div class="login-footer-string">
          <span>У Вас нет аккаунта?</span>
          <a href="#">Регистрация</a>
        </div>

        <div class="login-footer-string">
          <span>Вы забыли пароль?</span>
          <a href="#"><nobr>Восстановить пароль</nobr></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data () {
    return {
      login: '',
      password: '',
      savePassword: false,
      captcha: ''
    }
  },
  head () {
    return {
      title: 'Авторизация в социальной сети - Only One',
      description: 'Свободная социальная сеть с открытым исходным кодом ',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Only One - Свободная социальная сеть' },
        { hid: 'og:image', name: 'og:image', content: 'http://only-one.su/img/OnlyOneSocial.png' }
      ]
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
      this.$api.$post('https://social.katelinlis.ru/api/auth/login', {
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
        location.href = `/user/${data.userid}`
        // this.$router.push(`/user/${data.userid}`)
      })
      await this.$recaptcha.reset()
    },
    ...mapActions(['getMe'])
  }

})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Roboto:wght@500;700&display=swap');

body {
    background: #E5E5E5;
}

.login-container {
    width: 578px;
    height: 676px;

    /* center */
    margin-left: auto;
    margin-right: auto;

    margin-top: 0px;

    background: #FFFFFF;

    border-radius: 14px;
}

.login-header-text {
    margin-left: 78px;
    padding-top: 51px;

    font-size: 30px;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
}
.login-header-logo {
    position: relative;
    float: right;

    margin-right: 74.39px;
    top: -37px;
}
.login-header-line {
    width: 427px;
    height: 1px;

    /* center */
    margin-left: auto;
    margin-right: auto;

    margin-top: 29px;

    background: #D7E2F2;
}

.login-form-text {
    margin-left: 78px;
    margin-top: 29px;

    font-family: "Roboto", sans-serif;

    color: #606580;
}
.login-form-input-container {
    width: 426px;
    height: 64px;

    /* center */
    margin-left: auto;
    margin-right: auto;

    margin-top: 14px;

    background: #F5F8FD;

    border-radius: 6px;
}

.login-form-input-icon {
    margin-left: 20.63px;
    padding-top: 18.56px;
}

.login-form-inputbox {
    position: relative;

    margin-left: 64px;
    top: -45.5px;
}
.login-form-inputbox > input {
    height: 58px;
    width: 290px;

    border: none;
    background: none;

    font-size: 14px;
    color: #8C99B2;

    outline: none;
}

.login-form-input-show {
    position: relative;
    float: right;

    margin-right: 27px;
    top: -82px;
}
.login-form-input-show:hover {
    cursor: pointer;
}

.login-form-store-password {
    margin-left: 78px;
    margin-top: 9px;

    font-family: "Roboto", sans-serif;

    color: #606580;
}

.login-form-captcha {
    margin-left: 78px;
    margin-top: 9px;
}

.login-form-button {
    margin-left: 76px;
    margin-top: 12px;
}
.login-form-button > button {
    width: 426px;
    height: 64px;

    background: #0F62FE;
    border: none;

    color: #FFFFFF;
    font-family: "Inter", sans-serif;
    font-size: 16px;

    border-radius: 6px;

    transition: 0.25s;
}
.login-form-button > button:hover {
    cursor: pointer;
    background: #0d57e0;
}

.login-footer {
    text-align: center;

    margin-left: 10px;
    margin-right: 10px;

    margin-top: 20px;
}
.login-footer-string {
    font-family: "Inter", sans-serif;
    margin-bottom: 14px;
}
.login-footer-string > span {
    color: #696F79;
    margin-right: 6px;
}
.login-footer-string > a{
    color: #0F62FE;
    text-decoration: none;
}

@media screen and (max-width: 578px) {
    .login-container {
        width: auto;
        margin-top: auto;
    }

    .login-header-text {
        margin-left: 38px;
        padding-top: 31px;
    }
    .login-header-logo {
        margin-right: 38px;
    }
    .login-header-line {
        width: auto;

        margin-left: 38px;
        margin-right: 38px;
    }

    .login-form-text {
        margin-left: 38px;
    }
    .login-form-input-container {
        width: auto;

        margin-left: 38px;
        margin-right: 38px;
    }
    .login-form-inputbox > input {
        width: 65%;
    }

    .login-form-store-password {
        margin-left: 38px;
    }
    
    .login-form-captcha {
        margin-left: 38px;
    }

    .login-form-button {
        margin-left: 38px;
        margin-right: 38px;
    }
    .login-form-button > button {
        width: 100%;
    }
}
</style>
