<template>
  <div>
    <div class="w">
      <div style="position:absolute;z-index: 100;right: 2%;top: 26%;">
        <img src="/img/post/send.svg" class="tal" @click="WallSend">
      </div>
      <textarea id="wallInput" v-model="wallInput" placeholder="Напишите что-нибудь...." class="w" @keyup.enter="WallSend" />
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
    WallSend () {
      this.$api.post('wall/send', { text: this.wallInput, answer: this.answer }).then((data) => {
        this.wallInput = ''
        this.update()
      })
    }
  }
}
</script>

<style scoped>
#wallInput::placeholder {

  padding-top: 15px;
  padding-left: 8px;
}
  .w {
    width:100%;
    position: relative;
  }
  .tar{
    text-align:right
  }
  .tal{
    text-align:left
  }
  #wallInput{
    height:50px;
    max-height:90px;
    min-height:50px;
    resize:vertical
  }
</style>
