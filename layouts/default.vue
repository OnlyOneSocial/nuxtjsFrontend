<template>
  <div class="wrapper">
    <LayoutHeader v-if="$nuxt.$route.name!=='login'" />
    <div class="content">
      <LayoutNav />
      <Nuxt class="holder" />
    </div>
    <LayoutFooter v-if="$nuxt.$route.name!=='login'" />
    <div v-if="modal.type" class="modal" @click.self="Close">
      <UserAvatarChangeModal
        v-if="modal.type === 'updateUserAvatar'"

        :avatar="'https://cdnsocial.katelinlis.xyz/public/clients/1/cc31b175288b869bd96c18fa2070f9cc.jpeg'"
      />
      <UserAvatarOpenAvatar
        v-if="modal.type === 'OpenUserAvatar'"

        :avatar="modal.data"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  head () {
    return {
      bodyAttrs: {
        'data-theme': 'light',
        style: this.modal.type ? ' overflow: hidden;' : ''
      },
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0'
        },
        {
          name: 'og:site_name',
          hid: 'og:site_name',
          content: 'Only one'
        },
        {
          name: 'og:title',
          hid: 'og:title',
          content: 'Only one'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      modal: state => state.modal
    })

  },
  beforeMount  () {
    // this.getMe()
  },
  methods: {
    Close () {
      this.$store.commit('SetModal', { type: '', data: {} })
    },
    async Update () {
      await this.getMe()
    },
    ...mapActions(['getMe'])
  }
}
</script>

<style lang="postcss" scoped>
.modal{
	position:absolute;
	z-index:1000;
	background-color: #80808085;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
.content {
	display: flex;
}
.holder {
	margin-top: 32px;
	min-width: 0;
	flex: auto;
}
</style>
