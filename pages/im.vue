<template>
  <div>
    <div v-if="$route.query.im" style="height:450px;text-align:center" class="messages-container">
      <div v-for="(msg,index) in messages" :key="index">
        <div style="display:block;">
          <div v-if="me && msg.userid==parseInt(me.id)" style="text-align:right" class="message-container">
            <NuxtLink :to="'/user/' + msg.userid">
              <div style="display: flex;align-items: flex-start;justify-content: flex-end;">
                <div class="message-user-avatar mini">
                  <img :src="getAvatar(msg.userid,me.avatar)">
                </div>
                <div style="padding-left: 5px;" class="message-username">
                  <div style="text-align:left">
                    {{ me.username }}
                  </div>
                  <div style="font-size:small">
                    {{ msg.time }}
                  </div>
                </div>
              </div>
            </NuxtLink>

            <div class="message-text">
              <span style="white-space: pre-wrap;">{{ msg.text }}</span>
            </div>
          </div>
          <div v-if="me && msg.userid!==parseInt(me.id)" style="text-align:left" class="message-container">
            <NuxtLink :to="'/user/' + msg.userid">
              <div style="display: flex;align-items: flex-start;">
                <div class="message-user-avatar mini">
                  <img :src="getAvatar(msg.userid,msg.avatar)">
                </div>
                <div style="padding-left: 5px;" class="message-username">
                  <div style="text-align:left">
                    {{ msg.username }}
                  </div>
                  <div style="font-size:small">
                    {{ msg.time }}
                  </div>
                </div>
              </div>
            </NuxtLink>

            <div class="message-text">
              <span style="white-space: pre-wrap;">{{ msg.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="false" style="position: absolute;bottom: 0;left:10%;width:80%;" class="message-input-container">
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

      <div style="position: absolute;bottom: 0;top:92%;left:20%;right:20%;width:80%;" class="message-input-container">
        <div class="EditorBox">
          <textarea
            id="Input"
            v-model="message"
            :style="{
              height: `${TextAreaheight}px`
            }"
            placeholder="Напишите что-нибудь...."
            rows="1"
            class="w"
            @keyup.enter="EnterKey"
            @input="Resize"
          />
          <div class="InputActions">
            <div class="InputActionsSend">
              <img src="/img/post/send.svg" class="tal" @click="EnterKey">
            </div>
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
                  <img class="tal" src="/img/im/smile.svg">
                </button>
              </popper>
            </no-ssr>
            <img class="InputActionsPhoto tal" src="/img/post/photo.svg">
          </div>
        </div>
      </div>
    </div>

    <div v-if="!$route.query.im" style="text-align:center;margin: 0 auto;background: rgb(255, 255, 255);padding: 10px 20px 20px 20px;width:50%">
      {{ $t('Im') }}
      <div v-for="(dialog,index) in dialogs" :key="index" style="text-align:left">
        <NuxtLink v-if="dialog.sendto>0" :to="`/im?im=${dialog.sendto}`">
          <div style="display: flex;align-items: flex-start;margin-top:10px">
            <div class="message-user-avatar mini">
              <img :src="getAvatar(dialog.sendto,dialog.avatar)">
            </div>
            <div style="padding-left: 5px;" class="message-username">
              <span>{{ dialog.username }}</span>
              <div>{{ FromNowTime(dialog.timestamp) }}</div>
            </div>
          </div>
          <div style="margin-top: -5px;">
            {{ 30 > dialog.text.length ? dialog.text : dialog.text.slice(0,30) }}
          </div>
        </NuxtLink>
        <br>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'
import moment from 'moment'

export default {
  components: {
    popper: Popper
  },
  data () {
    return {
      TextAreaheight: 26,
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
      me: state => state.me,
      socket: state => state.socket
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
    FromNowTime (timestamp) {
      if (!timestamp) { return 'offline' }
      return moment(timestamp * 1000).locale(this.$i18n.localeProperties.code).fromNow()
    },
    Resize (element) {
      this.TextAreaheight = element.target.scrollHeight
    },
    getAvatar (id, avatar) {
      if (avatar) { return `https://cdn.only-one.su/public/clients/${id}/${avatar}` } else { return 'https://cdn.only-one.su/public/UserProfileImage.svg' }
    },
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
              console.log(this.socket)
              this.socket.send(JSON.stringify({
                data: this.$route.query.im,
                type: 'OpenIm'
              }))
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
    .w{
      display: flex;
      justify-content: center;
    }
  .EditorBox{
    width: 80%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background:white;
    border-radius: 8px;
  }
  #Input:focus-visible {
    outline: none;
  }
  #Input{
    padding-top: 5px;
    padding-bottom: 5px;
    overflow: hidden;
    padding-left: 15px;
    width: 90%;
    resize: none;
    border-radius: 8px;
    background: transparent;
    max-height: 300px;
  }
  .InputActions{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin: 15px;
  }
  .InputActionsSend{
    display: flex;
    align-items: center;
  }
  .tal{
        height: 20px;
        width: 20px;
  }
  .InputActionsPhoto{
        margin-right: 10px;
  }

a {
  text-decoration: unset;
  color: unset;
}
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

.message-user-avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.message-user-avatar.mini > img  {
  width: 30px;
  height: 30px;
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
