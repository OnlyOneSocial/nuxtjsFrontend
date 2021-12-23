<template>
  <div>
    <div v-if="$route.query.im" style="height:450px;text-align:center" class="messages-container">
      <div v-for="(msg,index) in messages" :key="index">
        <div style="display:block;">
          <div v-if="me && msg.userid==parseInt(me.id)" style="text-align:right" class="message-container">
            <div class="message-user-avatar">
              <a :href="'/user/' + me.id">
                <img :src="`https://cdnsocial.katelinlis.xyz/public/clients/${msg.userid}/${me.avatar}`">
              </a>
            </div>
            <div class="message-username">
              <a :href="'/user/' + me.id">
                <span>{{ me.username }}({{ msg.time }})</span>
              </a>
            </div>
            <div class="message-text">
              <span style="white-space: pre-wrap;">{{ msg.text }}</span>
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
                <span>{{ msg.username }}({{ msg.time }})</span>
              </a>
            </div>
            <div class="message-text">
              <span style="white-space: pre-wrap;">{{ msg.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="position: absolute;bottom: 0;left:10%;width:80%;" class="message-input-container">
        <input v-model="message" style="height:40px;border: 2px solid gray;width:75%" type="text" @keyup.enter="EnterKey">
        <div style="position: absolute;display: inline-block;" class="SmilePopup">
          <no-ssr>
            <popper

              trigger="clickToToggle"
              :options="{
                placement: 'top',
                modifiers: { offset: { offset: '0,10px' } }
              }"
            >
              <div class="popper">
                <Emoji :select="selectEmoji2" />
              </div>

              <button slot="reference" style="background-color:unset">
                <img style="width:24px" src="/img/im/smile.svg">
              </button>
            </popper>
          </no-ssr>
        </div>
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
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  components: {
    popper: Popper
  },
  data () {
    return {
      messages: [],
      dialogs: [],
      message: '',
      loading: false
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
  mounted () {
    this.$nextTick(() => {
      this.loading = true
    })
  },
  created () {
    this.$api.get('/message/im').then((data) => {
      this.dialogs = data.data
    })
    this.getIm()
  },
  methods: {
    EnterKey (e) {
      if (e.shiftKey) { return }
      this.send()
    },
    async getIm () {
      if (this.ImID > 0) {
        await this.$api.get(`/message/get/${this.$route.query.im}`).then((data) => {
          this.messages = data.data
          if (this.loading) {
            this.$nextTick(() => {
              document.getElementsByClassName('messages-container')[0].scrollTop = document.getElementsByClassName('messages-container')[0].scrollHeight
            })
          }
        })
      }
    },
    selectEmoji2 (emoji) {
      this.message = this.message + emoji.data
    },
    send () {
      // this.message = ''
      this.$api.post('/message/send', {
        text: this.message,
        to: parseInt(this.$route.query.im)
      }).then((data) => {
        this.message = ''
        data.data.time = 'сейчас'
        this.messages.push(data.data)
        this.$nextTick(() => {
          document.getElementsByClassName('messages-container')[0].scrollTop = document.getElementsByClassName('messages-container')[0].scrollHeight
        })
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
.SmilePopup{
  right: 15%;
}

@media only screen and (max-width: 768px) {
  .SmilePopup{
    right: 20%;
  }
}

@media screen and (min-width: 730px) {
  .message-input-container {
    width: 95% !important;
  }
}
</style>
