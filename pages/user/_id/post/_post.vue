<template>
  <div><NewsPost :post="post" /></div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({

  async fetch () {
    // if (process.env.VUE_ENV === 'server') {  }

    Promise.all([
      await this.getPost({ AuthorID: this.$route.params.id, PostID: this.$route.params.post })
    ])
  },
  head () {
    /* const postsDesc = posts
      ? `,написал(а) ${
          posts[0] ? `${posts[0].time + ': ' + posts[0].text}` : ''
        }`
      : '' */
    return {
      title: `${this.post.text.slice(0, 40)}...`,
      description: this.post.text,
      meta: [
        { hid: 'og:title', name: 'og:title', content: `${this.post.text.slice(0, 40)}...` }

      ]
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      post: state => state.post
    })
  },
  created () {
    // this.getUser(this.$route.params.id)
  },
  methods: {

    ...mapActions({ getPost: 'getPost' })
  }

})
</script>
