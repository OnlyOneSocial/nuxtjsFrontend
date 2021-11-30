/* eslint-disable no-trailing-spaces */
<template>
  <div :title="title" @click="action">
    <i v-if="friendStatus.status===3" class="icon icon-add-friend" title="Отправить заявку в друзья" style="--size:150px" />
    <i v-else-if="friendStatus.status===1" class="icon icon-remove-friend" style="--size:150px" />
    <i v-else-if="friendStatus.status===0 && friendStatus.forme === true" class="icon icon-accept-friend" style="--size:16px" />
  </div>
</template>
<script>
export default {
  props: {
    userid: {
      type: String,
      default: '0'
    },
    friendStatus: {
      type: Object,
      default: () => ({
        status: 0
      })
    }
  },
  computed: {
    title () {
      if (this.friendStatus && this.friendStatus.status >= 0) {
        if (this.friendStatus.status === 3) { return 'Отправить заявку в друзья' }
        if (this.friendStatus.status === 1) { return 'Удалить из друзей' }
        if (this.friendStatus.status === 0 && this.friendStatus.forme === true) { return 'Принять заявку в друзья' }
      }
      return ''
    }
  },
  methods: {
    async action () {
      await console.log(123)
    },
    async RequestAccept () {
      const info = await this.$api.post(`user/request_accept/${this.userid}`)
      if (info.data.request.status) { this.$store.commit('UserPage/SetFriendStatus', { status: 1, forme: true }) }
      console.log(info)
    },
    async Request () {
      const info = await this.$api.post(`user/request/${this.userid}`)
      if (info.data.request.status) { this.$store.commit('UserPage/SetFriendStatus', { status: info.data.request.status, forme: false }) }
    },
    async Cancel () {
      const info = await this.$api.post(`user/request_cancel/${this.userid}`)
      console.log(info)
    }
  }
}
</script>
<style scoped>
.icon-accept-friend {
  width: 16px;
  height: 16px;
  background: #8C99B2;
  animation: 4s frames infinite linear;

  -webkit-mask-image: url('http://localhost:8111/img/user/ooi-add-contact.svg');
  mask-image: url('http://localhost:8111/img/user/ooi-add-contact.svg');
}
.icon {
   --size: 70px;
  display: inline-block;
  width: var(--size);
  height: var(--size);
  transition: .12s;

  -webkit-mask-size: cover;
  mask-size: cover;
}
</style>
