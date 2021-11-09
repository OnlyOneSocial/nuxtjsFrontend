<template>
  <div id="wall">
    <span>wall</span><div>
      <div>
        <textarea id="wallInput" name="" style="width:83%; max-width:83%; max-height:50px" /><button onclick="if (!window.__cfRLUnblockHandlers) return false; WallSend()">
          send
        </button>
      </div>
      <News :posts="posts"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    posts: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }

  }
}
</script>
