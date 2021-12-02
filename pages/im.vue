<template>
  <div>
    <div style="height:450px;width:100%">
      <div v-for="(msg,index) in messages" :key="index">
        <div style="display:block;">
          <div v-if="$store.me && msg.userid===$store.me.id" style="text-align:left">
            author {{ msg.text }}
          </div>
          <div v-if="msg.me!==1" style="text-align:right">
            user {{ msg.text }}
          </div>
        </div>
      </div>
      <div style="position: absolute;bottom: 0;width:100%">
        <input v-model="message" style="height:40px;border: 2px solid gray;width:88%" type="text">
        <input style="height:40px;border: 2px solid gray;" type="button" value="Send" @click="send">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      messages: [],
      message: ''
    }
  },
  created () {
    this.$api.get(`/api/message/get/${this.$route.query.im}`).then((data) => {
      this.messages = data.data
    })
  },
  methods: {
    send () {
      // this.message = ''
      this.$api.post('/api/message/send', {
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
