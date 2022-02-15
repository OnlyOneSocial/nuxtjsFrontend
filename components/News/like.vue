<template>
  <span :class="{red:liked===1}" @click="Like(randomId)">
    <template v-if="like"> {{ !likes ? 0+locallike : likes.length+locallike }} </template> <template v-else>0</template> <img v-if="like" style="height:14px" src="/icons/like.svg"> <img v-else style="height:14px" src="/icons/dislike.svg">
  </span>
</template>
<script>

export default {
  props: {
    like: {
      type: Boolean,
      default: () => false
    },
    randomId: {
      type: String,
      default: ''
    },
    likes: {
      type: Array,
      default: () => []
    },
    me: {
      type: Object,
      default: () => {
        return { id: 0 }
      }
    }

  },
  data () {
    return {
      liked: 0,
      locallike: 0
    }
  },
  created () {
    if (this.me && this.me.id && this.like && this.likes.includes(parseInt(this.me.id))) {
      this.liked = 1
    }
  },
  methods: {
    Like (id) {
      if (this.me && this.me.id && this.like) {
        this.$api.post('wall/like/' + id).then((data) => {
          if (this.liked) { this.locallike--; this.liked = 0 } else { this.locallike++; this.liked = 1 }
        })
      }
    }
  }
}
</script>
