<template>
  <div style="">
    <div style="width:600px;margin: 0 auto;">
      <NewsPost style="width:600px" :post="post" />
      <br>
      <News :posts="answers" />
      <br>
      <template v-if="checkAnswer">
        Ответ
      </template>
      <NewsNewPost v-if="checkAnswer" :answer="post.random_id" />
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
      await this.getPost({ PostID: this.$route.params.post })
    ])
  },
  head () {
    /* const postsDesc = posts
      ? `,написал(а) ${
          posts[0] ? `${posts[0].time + ': ' + posts[0].text}` : ''
        }`
      : '' */
    const d = new Date(this.post.Timestamp * 1000)
    const date = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`
    return {

      title: `${this.post.text.slice(0, 43)} | ${this.post.author_username} от ${date}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.text
        },
        { hid: 'og:title', name: 'og:title', content: `${this.post.text.slice(0, 50)}` }

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

    ...mapActions({ getPost: 'getPost' })
  }

})
</script>
