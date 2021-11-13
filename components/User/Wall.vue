<template>
  <div id="wall">
    <span>wall</span><div>
      <div>
        <textarea id="wallInput" v-model="wallInput" name="" style="width:83%; max-width:83%; max-height:50px" />
        <button @click="WallSend">
          send
        </button>
      </div>
      <News :posts="posts" />
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
