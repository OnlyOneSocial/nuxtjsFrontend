<template>
    <div style="">
        <div style="width:600px;margin: 0 auto;">
            <NewsPost :post="post" style="width:600px"/>
            <br>
            <News :posts="answers"/>
            <br>
            <template v-if="checkAnswer">
                Ответ
            </template>
            <NewsNewPost v-if="checkAnswer" :answer="post.random_id"/>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

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
        return {
            title: `${this.post.text.slice(0, 40)}...`,
            description: this.post.text,
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: `${this.post.text.slice(0, 40)}...`
                }

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
