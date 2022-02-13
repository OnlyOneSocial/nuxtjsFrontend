<template>
  <div>
    <div class="w">
      <div class="EditorBox">
        <textarea id="wallInput" v-model="wallInput" placeholder="Напишите что-нибудь...." class="w" @keyup.enter="EnterKey" />
        <div>
          <div><img style="margin-right:20px;height:20px" src="/img/post/send.svg" class="tal" @click="EnterKey"></div>
          <img style="height:13px" src="/img/post/photo.svg">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    update: {
      type: Function,
      default: () => { console.log('set update function') }
    },
    answer: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      wallInput: ''
    }
  },
  methods: {
    EnterKey (e) {
      if (e.shiftKey) { return }
      this.WallSend()
    },
    WallSend () {
      if (this.wallInput !== '') {
        this.$api.post('wall/send', { text: this.wallInput, answer: this.answer }).then((data) => {
          this.wallInput = ''
          this.update()
        })
      }
    }
  }
}
</script>

<style scoped>
#wallInput::placeholder {

  padding-top: 15px;
  padding-left: 8px;
}

  .EditorBox{
    display:flex;
    justify-content: space-between;
    align-items: center;
    background:white;
    border-radius: 15px;
  }
  #wallInput:focus-visible {
    outline: none;
  }
  #wallInput{
    padding-top: 5px;
    padding-bottom: 5px;
    overflow: hidden;
    padding-left: 15px;
    width: 90%;
    height:50px;
    max-height:90px;
    min-height:50px;
    resize:none;
    border-radius: 15px;
    background: transparent;
  }
</style>
