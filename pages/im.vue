<template>
  <div>
    <div style="height:450px;width:90%;overflow:hidden;text-align:center">
      <div v-for="(msg,index) in messages" :key="index">
        <div style="display:block;">
          <div v-if="me && msg.userid==parseInt(me.id)" style="text-align:left">
            {{ msg.username }}
            <br>
            {{ msg.text }}
          </div>
          <div v-if="me && msg.userid!==parseInt(me.id)" style="text-align:right">
            {{ msg.username }}
            <br>
            {{ msg.text }}
          </div>
        </div>
      </div>
      <div style="position: absolute;bottom: 0;width:100%">
        <input v-model="message" style="height:40px;border: 2px solid gray;width:75%" type="text">
        <input style="height:40px;border: 2px solid gray;" type="button" value="Send" @click="send">
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
