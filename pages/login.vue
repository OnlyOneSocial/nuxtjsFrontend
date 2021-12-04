
<template>
  <div class="content">
    <div class="signin">
      <div class="signin-form">
        <div class="signin-form__header">
          <UiBaseCaption
            :title="$t('Login')"
          />
          <LogoIcon />
        </div>
        <UiBaseInput
          v-model="login"
          :label="$t('UserName')"
          placeholder="Введите Ваш логин"
        />
        <UiBaseInput
          v-model="password"
          :label="$t('UserPassword')"
          type="password"
          autocomplete="current-password"
          placeholder="Введите Ваш пароль"
        />
        <div class="login-form-store-password">
          <input id="login-form-store-password-checkbox" v-model="savePassword" type="checkbox">
          <label for="login-form-store-password-checkbox">{{ $t('SavePassword') }}?</label>
        </div>
        <div class="signin-form__captcha">
          <recaptcha />
        </div>
        <UiBaseButton
          :label="$t('Login')"
          width="fluid"
          size="lg"
          @click="Auth"
        />
        <div class="signin-form__subtitle">
          При нажатии Войти происходит проверка существования аккаунта, если аккаунт не найден, то вы успешно зарегистрируете новый аккаунт
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import Vue from 'vue'
import { mapActions } from 'vuex'
import LogoIcon from '~/assets/svg/logo.svg'

export default Vue.extend({
  components: { LogoIcon },
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
      this.$api.$post('/auth/login', {
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
<style lang="postcss" scoped>

.signin {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 8vh auto 0;

	&-form {
		max-width: 578px;
		padding: 20px 56px 48px;
		border-radius: 14px;
		background-color: #fff;

		& .input-group {
			&:not(:last-child) {
				margin-bottom: 20px;
			}
		}

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 12px 0;
			border-bottom: 1px solid #e6eaef;
			margin-bottom: 24px;

			& svg {
				flex: none;
			}
		}

		&__subtitle {
			margin-top: 24px;
			text-align: center;
			font-size: 1.4rem;
			line-height: 150%;
			font-weight: 400;
		}

		&__captcha {
			margin-top: 10px;
			margin-bottom: 12px;
			display: flex;
			justify-content: center;
		}
	}
}
</style>
