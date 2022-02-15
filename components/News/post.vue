<template>
  <article v-if="post" style="">
    <div class="ArticleHeader">
      <div style="display:flex">
        <img
          data-v-398b3732=""
          class="article-avatar"
          height="32px"
          width="32px"
          alt="user avatar"
          :src="getAvatar(post.author,post.author_avatar)"
          style="border-radius: 100%;"
        >

        <div>
          <h3 style="font-size:15px;margin: 0;">
            <NuxtLink :to="`/user/${post.author}`">
              {{ post.author_username }}
            </NuxtLink>
          </h3>
          <h3>
            <div style="font-size:14px;color:gray">
              <NuxtLink :to="`/post/${post.random_id}`">
                {{ FromNowTime(post.Timestamp) }}
              </NuxtLink>
            </div>
          </h3>
        </div>
      </div>
      <div>
        <div style="display: inline-block;padding-left: 0px">
          <NuxtLink :to="`/post/${post.answerto}`">
            <span v-if="post.answerto!='00000000-0000-0000-0000-000000000000'" style="font-weight: normal; ">
              в ответ на пост
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <p v-linkified:options="{ rel: 'nofollow noopener' }" style="margin: 0;white-space: pre-wrap;" v-text="post.text" />
    <div
      :style="(post.text==`Тестирование отображения видеороликов, а так же оптимизация блока поста ` ? 'padding-bottom:0px;':'')+'position: relative;'"
    >
      <lite-youtube
        v-if="post.text==`Тестирование отображения видеороликов, а так же оптимизация блока поста `"
        style=""
        videoid="1eLuB5CoryM"
        playlabel="BABYMETAL // SYNCOPATION「シンコペーション」"
        params="controls=1&start=0&end=0&modestbranding=2&rel=0&enablejsapi=1"
      />
      <div
        class="ArticleActions"
      >
        <div>
          <NewsLike :random-id="post.random_id" :likes="post.likes" :me="me" like />
          <NewsLike :random-id="post.random_id" :likes="post.likes" :me="me" />
        </div>
        <div @click="$router.push(`/post/${post.random_id}/?answer`)">
          {{ $t('AnswerPost') }}({{ post.answercount }})
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import { mapState } from 'vuex'

import moment from 'moment'
export default {
  props: {
    post: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => { return {} }
    }

  },
  data () {
    return {
      liked: 0,
      locallike: 0
    }
  },
  computed: {
    ...mapState({
      me: state => state.me
    })
  },
  created () {
    if (this.me.id && this.post && this.post.likes && this.post.likes.includes(parseInt(this.me.id))) {
      this.liked = 1
    }
  },
  methods: {
    getAvatar (id, avatar) {
      if (avatar) { return `https://cdn.only-one.su/public/clients/${id}/${avatar}` } else { return 'https://cdn.only-one.su/public/UserProfileImage.svg' }
    },
    FromNowTime (online) {
      if (!online) { return 'offline' }
      return moment(online * 1000).locale(this.$i18n.localeProperties.code).fromNow()
    },
    Like (id) {
      this.$api.post('wall/like/' + id).then((data) => {
        if (this.liked) { this.locallike--; this.liked = 0 } else { this.locallike++; this.liked = 1 }
      })
    }
  }
}
</script>
<style scoped>
.article-avatar{
  margin: 0 10px 10px 0;
}
a {
    color: unset;
    text-decoration: none;
}
article {
  background-color:#FFFFFF;
  position:relative;
  margin-bottom: 10px;
  padding: 16px 21px 45px 13px;
  border-radius: 8px;
}
article p{
  overflow-wrap: break-word;
}
.ArticleHeader {
  display:flex;
  justify-content: space-between;
}

.ArticleActions{
  position:absolute;
  bottom: -30px;
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content: space-between;
}
.ArticleActions > div {
  display:inline-block;

}
.red {
  color: red;
  filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
}
</style>
