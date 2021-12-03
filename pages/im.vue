<template>
  <div>
    <div v-if="$route.query.im" style="height:450px;text-align:center" class="messages-container">
      <div v-for="(msg,index) in messages" :key="index">
        <div style="display:block;">
          <div v-if="me && msg.userid==parseInt(me.id)" style="text-align:right" class="message-container">
            <div class="message-user-avatar">
              <a :href="'/user/' + me.id">
                <img :src="`https://cdnsocial.katelinlis.xyz/public/clients/${msg.userid}/${msg.avatar}`">
              </a>
            </div>
            <div class="message-username">
              <a :href="'/user/' + me.id">
                <span>{{ msg.username }}</span>
              </a>
            </div>
            <div class="message-text">
              <span>{{ msg.text }}</span>
            </div>
          </div>
          <div v-if="me && msg.userid!==parseInt(me.id)" style="text-align:left" class="message-container">
            <div class="message-user-avatar">
              <a :href="'/user/' + msg.userid">
                <img :src="`https://cdnsocial.katelinlis.xyz/public/clients/${msg.userid}/${msg.avatar}`">
              </a>
            </div>
            <div class="message-username">
              <a :href="'/user/' + msg.userid">
                <span>{{ msg.username }}</span>
              </a>
            </div>
            <div class="message-text">
              <span>{{ msg.text }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="position: absolute;bottom: 0;left:10%;width:80%;" class="message-input-container">
        <input v-model="message" style="height:40px;border: 2px solid gray;width:75%" type="text">
        <input style="height:40px;border: 2px solid gray;" type="button" value="Send" @click="send">
      </div>
    </div>
    <div v-if="!$route.query.im" style="text-align:center;margin: 0 auto">
      <div v-for="(dialog,index) in dialogs" :key="index" style="text-align:center">
        <NuxtLink v-if="dialog.sendto>0" :to="`/im?im=${dialog.sendto}`">
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
    ImID () {
      return this.$route.query.im
    },
    ...mapState({
      me: state => state.me
    })
  },
  watch: {
    ImID (last) {
      this.getIm()
    }
  },

  created () {
    this.$api.get('/message/im').then((data) => {
      this.dialogs = data.data
    })
    this.getIm()
  },
  methods: {
    async getIm () {
      if (this.ImID > 0) {
        await this.$api.get(`/message/get/${this.$route.query.im}`).then((data) => {
          this.messages = data.data
        })
      }
    },
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
  overflow-wrap: break-word;
  margin-bottom: 50px;
  width: 100%;
}
.message-container {
  background: #FFFFFF;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
}
.message-user-avatar > a > img {
  width: 24px;
  height: 24px;
  border-radius: 100%;
}
.message-username > a {
  color: #606580;
  font-size: 14px;
  text-decoration: none;
}
@media screen and (min-width: 730px) {
  .message-input-container {
    width: 95% !important;
  }
}
</style>
