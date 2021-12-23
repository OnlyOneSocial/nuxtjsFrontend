<template>
  <div style="">
    <div style="width:600px;margin: 0 auto;">
      <NewsPost style="width:600px" :post="post" />
      <br>
      <News v-if="answers" :posts="answers" />
      <br>
      <template v-if="checkAnswer">
        Ответ
      </template>
      <NewsNewPost v-if="checkAnswer" :update="getThisPost" :answer="post.random_id" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({

  async fetch () {
    // if (process.env.VUE_ENV === 'server') {  }

    Promise.all([
      await this.getThisPost()
    ])
  },
  head () {
    /* const postsDesc = posts
      ? `,написал(а) ${
          posts[0] ? `${posts[0].time + ': ' + posts[0].text}` : ''
        }`
      : '' */
    let date = ''
    if (this.post && this.post.Timestamp) {
      const d = new Date(this.post.Timestamp * 1000)
      date = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`
    }

    let textPost = ''
    if (this.post.text && this.post.text.length >= 43) {
      textPost = this.post.text.slice(0, 43)
    } else if (this.post.text) {
      textPost = this.post.text
    } else {
      textPost = 'not found'
    }
    return {

      title: `${textPost} | ${this.post.author_username} от ${date}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.text
        },
        { hid: 'og:title', name: 'og:title', content: `${textPost}` }

      ]
    }
  },

  fetchOnServer: true,
  computed: {
    checkAnswer () {
      return typeof this.$route.query.answer !== 'undefined'
    },
    ...mapState({
      post: state => state.post.Post,
      answers: state => state.post.Answers
    })
  },
  created () {
    // this.getUser(this.$route.params.id)
  },
  methods: {
    async getThisPost () {
      return await this.getPost({ PostID: this.$route.params.post })
    },
    ...mapActions({ getPost: 'getPost' })
  }

})
</script>
