<template>
  <div>
    <div class="w">
      <textarea id="wallInput" v-model="wallInput" class="w" @keyup.enter="WallSend" />
      <div class="w tar">
        <span>
          <span>photo</span>
        </span>
        <span class="w tar">
          <button class="tal" @click="WallSend">
            {{ $t('Send') }}
          </button>
        </span>
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
  .w {
    width:100%
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
