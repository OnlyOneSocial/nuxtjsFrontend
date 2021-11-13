<template>
  <div id="friendRequestAndSendMessage">
    <button v-if="friendStatus.status===3" id="ButtonSendRequestFriend" style="width:150px" @click="Request">
      Добавить в друзья
    </button>
    <button v-if="friendStatus.status===1" id="ButtonSendRequestFriend" style="width:150px" @click="Cancel">
      Удалить из друзей
    </button>
    <button v-if="friendStatus.status===0 && friendStatus.forme === false" id="ButtonSendRequestFriend" style="width:150px" @click="Cancel">
      Отклонить заявку
    </button>
    <button v-if="friendStatus.status===0 && friendStatus.forme === true" id="ButtonSendRequestFriend" style="width:150px" @click="Cancel">
      Принять запрос в друзья
    </button>
    <br>
    <button style="width:150px">
      Send Message
    </button>
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
  methods: {
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
