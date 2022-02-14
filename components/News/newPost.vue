<template>
  <div>
    <div class="w">
      <div class="EditorBox">
        <textarea id="wallInput" v-model="wallInput" placeholder="Напишите что-нибудь...." rows="1" class="w" @keyup.enter="EnterKey" />
        <div class="wallInputActions">
          <div class="wallInputActionsSend"><img src="/img/post/send.svg" class="tal" @click="EnterKey"></div>
          <img class="wallInputActionsPhoto" src="/img/post/photo.svg">
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
    resize: none;
    border-radius: 15px;
    background: transparent;
  }
  .wallInputActions{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin: 15px;
  }
  .wallInputActionsSend{
    display: flex;
    align-items: center;
  }
  .tal{
        height: 15px;
        width: 15px;
  }
  .wallInputActionsPhoto{
        height: 15px;
        margin-right: 10px;
  }
</style>
