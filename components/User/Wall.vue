<template>
  <div id="wall">
    <span>Стена</span><div>
      <div v-if="me">
        <div style="width:100%;">
          <textarea id="wallInput" v-model="wallInput" @keyup.enter="WallSend" />
          <div style="width:100%;text-align:right">
            <span>
              <span>photo</span>
            </span>
            <span style="width:100%; text-align:right">
              <button style="text-area:left" @click="WallSend">
                send
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <News :posts="posts" />
  </div>
</template>
<script>
export default {
  props: {
    me: {
      type: Boolean
    },
    update: {
      type: Function,
      default: () => { console.log('set update function') }
    },
    posts: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }

  },
  data () {
    return {
      wallInput: ''
    }
  },
  methods: {
    WallSend () {
      this.$api.post('wall/send', { text: this.wallInput }).then((data) => {
        this.wallInput = ''
        this.update()
      })
    }
  }
}
</script>
<style scoped>
  #wallInput{
    width:100%;
    height:50px;
    max-height:90px;
    min-height:50px;
    resize:vertical
  }
</style>
