<template>
  <header class="header">
    <div class="header-nav">
      <NuxtLink
        :to="{ name: 'index' }"
        class="header-nav__logo"
        title="MSN - modern social network alpha"
      >
        <LogoIcon />
      </NuxtLink>
      <template v-if="me.id">
        <UiBaseButton
          :label="$t('Logout')"
          @click="logout"
        />
      </template>
      <template v-else>
        <NuxtLink to="/login" class="button button-md button-danger">
          <span>{{ $t('Login') }}</span>
        </NuxtLink>
      </template>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import LogoIcon from '~/assets/svg/logo.svg'

export default {
  components: { LogoIcon },
  computed: {
    ...mapState({
      me: state => state.me
    })
  },
  methods: {
    logout () {
      this.$cookies.remove('token')
      localStorage.removeItem('token')
      this.$store.commit('SetMe', { id: 0 })

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="postcss" scoped>
.header {
	background-color: #fff;
	padding: 12px 24px;

	&-nav {
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&__logo {
			flex: none;
		}
	}
}

</style>
