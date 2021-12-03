<template>
  <div>
    <div v-if="$route.query.im" style="height:450px;text-align:center" class="messages-container">
      <div v-for="(msg,index) in messages" :key="index">
        <div style="display:block;">
          <div v-if="me && msg.userid==parseInt(me.id)" style="text-align:left" class="message-container">
            <div class="message-user-avatar">
              <img :src="`https://cdnsocial.katelinlis.xyz/public/clients/${msg.userid}/${msg.avatar}`">
            </div>
            <div class="message-username">
              <span>{{ msg.username }}</span>
            </div>
            <div class="message-text">
              <span>{{ msg.text }}</span>
            </div>
          </div>
          <div v-if="me && msg.userid!==parseInt(me.id)" style="text-align:right" class="message-container">
            <div class="message-user-avatar">
              <img :src="`https://cdnsocial.katelinlis.xyz/public/clients/${msg.userid}/${msg.avatar}`">
            </div>
            <div class="message-username">
              <span>{{ msg.username }}</span>
            </div>
            <div class="message-text">
              <span>{{ msg.text }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="position: absolute;bottom: 0;width:100%">
        <input v-model="message" style="height:40px;border: 2px solid gray;width:75%" type="text">
        <input style="height:40px;border: 2px solid gray;" type="button" value="Send" @click="send">
      </div>
    </div>
    <div v-if="!$route.query.im" style="text-align:center;margin: 0 auto">
      <div v-for="(dialog,index) in dialogs" :key="index" style="text-align:center">
        <NuxtLink :to="`/im?im=${dialog.sendto}`">
          <br>
          {{ dialog.username }} ({{ dialog.time }})
          <br>
          {{ dialog.text }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      messages: [],
      dialogs: [],
      message: ''
    }
  },
  computed: {
    ...mapState({
      me: state => state.me
    })
  },
  created () {
    this.$api.get(`/message/get/${this.$route.query.im}`).then((data) => {
      this.messages = data.data
    })
    this.$api.get('/message/im').then((data) => {
      this.dialogs = data.data
    })
  },
  methods: {
    send () {
      // this.message = ''
      this.$api.post('/message/send', {
        text: this.message,
        to: parseInt(this.$route.query.im)
      }).then((data) => {
        console.log(data.data)
        this.message = ''
        this.messages.push(data.data)
      })
    }
  }
}
</script>
<style scoped>
.messages-container {
  overflow: auto;
}
.message-container {
  background: #FFFFFF;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
}
.message-user-avatar > img {
  height: 24px;
}
.message-username {
  color: #606580;
  font-size: 14px;
}
</style>
