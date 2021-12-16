<template>
  <div id="wall">
    <br>
    <div>
      <NewsNewPost v-if="me" :update="update" />
    </div>
    <br>
    <News :update="update" :posts="posts" />
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
    text-area:left
  }
  #wallInput{
    height:50px;
    max-height:90px;
    min-height:50px;
    resize:vertical
  }
</style>
