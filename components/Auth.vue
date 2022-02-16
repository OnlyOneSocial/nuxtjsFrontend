<template>
  <div class="login-container">
    <div v-if="!index" class="login-header">
      <h1 class="login-header-text">
        {{ $t('Login') }}
      </h1>

      <div class="login-header-logo">
        <img src="/img/login/login-header-logo.svg" alt="Логотип OnlyOne">
      </div>

      <div class="login-header-line" />
    </div>
    <form id="login-form" action="login" @submit="Auth">
      <div class="login-form">
        <div class="login-form-text">
          <span>{{ $t('UserName') }}</span>
        </div>
        <div class="login-form-input-container">
          <div class="login-form-input-icon">
            <img src="/img/login/login-form-input-icon-login.svg">
          </div>

          <div class="login-form-inputbox">
            <input
              id="login-username"
              v-model="login"
              tabindex="0"
              name="username"
              type="text"
              placeholder="Введите Ваш логин"
            >
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
            <input
              id="login-password"
              v-model="password"
              tabindex="0"
              name="password"
              type="password"
              placeholder="Введите Ваш пароль"
            >
          </div>

          <div v-if="false" class="login-form-input-show">
            <img src="/img/login/login-form-input-show.svg">
          </div>
        </div>

        <div v-if="false" class="login-form-store-password">
          <input id="login-form-store-password-checkbox" v-model="savePassword" type="checkbox">
          <label for="login-form-store-password-checkbox">{{ $t('SavePassword') }}?</label>
        </div>

        <div class="login-form-captcha">
          <recaptcha />
        </div>

        <div class="login-form-button">
          <input type="submit" :class="{mini:index}" :value="$t('Login')" title="Войти или создать новый аккаунт">
        </div>
      </div>
    </form>

    <div v-if="true" class="login-footer">
      <div class="login-footer-string">
        <span>У Вас нет аккаунта?</span>
        <NuxtLink :to="`/register`">
          Регистрация
        </NuxtLink>
      </div>

      <div v-if="false" class="login-footer-string">
        <span>Вы забыли пароль?</span>
        <a href="#"><nobr>Восстановить пароль</nobr></a>
      </div>
    </div>
  </div>
</template>

<script >
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  props: {
    index: {
      type: Boolean
    }
  },
  data () {
    return {
      login: '',
      password: '',
      savePassword: false,
      captcha: '',
      err: ''
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef

    // this.login = localStorage.getItem('login')
    // this.password = localStorage.getItem('password')
    this.savePassword = localStorage.getItem('savePassword')
  },

  methods: {
    async Auth (e) {
      e.preventDefault()
      try {
        const captcha = await this.$recaptcha.getResponse()
        this.$api.$post('/user/login', {
          username: this.login,
          password: this.password,
          captcha

        }).then((data) => {
          /* localStorage.setItem('login', this.login)
          if (this.savePassword) {
            localStorage.setItem('password', this.password)
          } */

          localStorage.setItem('token', this.password)
          this.$cookies.set('token', data.jwt, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          localStorage.setItem('savePassword', this.savePassword)
          location.href = `/user/${data.id}`
        // this.$router.push(`/user/${data.userid}`)
        }).catch((err) => {
          if (err.response.status === 400) {
            this.err = err.response.data.error
            this.$toast.error(err.response.data.error, {
              position: 'bottom-center',
              duration: 5000
            })
          // redirect('/login')
          }
        })
        await this.$recaptcha.reset()
      } catch (error) {
        if (error === 'Failed to execute') {
          this.$toast.error('Вы не прошли капчу', {
            position: 'bottom-center',
            duration: 5000
          })
        }
      }
    },
    ...mapActions(['getMe'])
  }

})
</script>
<style scoped>

.login-container {
    width: 578px;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 40px;

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
    font-family: "Inter", sans-serif;
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

    font-family: "Inter", sans-serif;

    color: #606580;
}
.login-form-input-container {
    width: 80%;
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

    font-family: "Inter", sans-serif;

    color: #606580;
}

.login-form-captcha {
    margin-left: 78px;
    margin-top: 9px;
}

.login-form-button {

    padding-top: 12px;
    padding-left: 60px;
    padding-right: 60px;
}
.login-form-button > input[type="submit"] {
     width: 100%;
    height: 64px;

    background: #0F62FE;
    border: none;

    color: #FFFFFF;
    font-family: "Inter", sans-serif;
    font-size: 16px;

    border-radius: 6px;

    transition: 0.25s;
}

.login-form-button > input[type="submit"]:hover {
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
        margin-top: 0px;
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

}
</style>
