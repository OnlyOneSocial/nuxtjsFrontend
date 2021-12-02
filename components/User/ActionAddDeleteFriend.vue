/* eslint-disable no-trailing-spaces */
<template>
  <div :title="title" @click="action">
    <i v-if="friendStatus.status===3" class="icon icon-add-friend" title="Отправить заявку в друзья" style="--size:16px" />
    <i v-else-if="friendStatus.status===1" class="icon icon-remove-friend" style="--size:16px" />
    <i v-else-if="friendStatus.status===0 && friendStatus.forme === true" class="icon icon-accept-friend" style="--size:16px" />
    <i v-else-if="friendStatus.status===0 && friendStatus.forme === false" class="icon icon-cancel-friend" style="--size:16px" />
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
        if (this.friendStatus.status === 0 && this.friendStatus.forme === false) { return 'Отменить заявку в друзья' }
      }
      return ''
    }
  },
  methods: {
    async action () {
      if (this.friendStatus.status === 3) { await this.Request() }
      if (this.friendStatus.status === 1) { await this.Cancel }
      if (this.friendStatus.status === 0 && this.friendStatus.forme === true) { this.RequestAccept() }
    },
    async RequestAccept () {
      const info = await this.$api.post(`user/request_accept/${this.userid}`)
      if (info.data.request.status) { this.$store.commit('UserPage/SetFriendStatus', { status: 1, forme: true }) }
    },
    async Request () {
      const info = await this.$api.post(`user/request/${this.userid}`)
      if (info.data.request.status) { this.$store.commit('UserPage/SetFriendStatus', { status: info.data.request.status, forme: false }) }
    },
    async Cancel () {
      await this.$api.post(`user/request_cancel/${this.userid}`)
    }
  }
}
</script>
<style scoped>
.icon-cancel-friend {
  width: 16px;
  height: 16px;
  background: #8C99B2;
  animation: 4s frames infinite linear;

  -webkit-mask-image: url('/img/user/UserCancel.svg');
  mask-image: url('/img/user/UserCancel.svg');
}
.icon-remove-friend {
  width: 16px;
  height: 16px;
  background: #8C99B2;
  animation: 4s frames infinite linear;

  -webkit-mask-image: url('/img/user/UserDelete.svg');
  mask-image: url('/img/user/UserDelete.svg');
}
.icon-add-friend {
    width: 16px;
  height: 16px;
  background: #8C99B2;
  animation: 4s frames infinite linear;

  -webkit-mask-image: url('/img/user/UserAddUser.svg');
  mask-image: url('/img/user/UserAddUser.svg');
}
.icon-accept-friend {
  width: 16px;
  height: 16px;
  background: #8C99B2;
  animation: 4s frames infinite linear;

  -webkit-mask-image: url('/img/user/ooi-add-contact.svg');
  mask-image: url('/img/user/ooi-add-contact.svg');
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
