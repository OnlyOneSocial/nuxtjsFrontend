<template>
  <div>
    <div style="text-align:center;width: 100%;">
      <h1>друзья ({{ friends.count }}) {{ user.username }}</h1>
      <br>
      <div v-if="user && friends" style="margin-left:0px">
        <template v-for="(friend,index) in friends.list">
          <div :key="index" style="width:100%;">
            <div id="friend">
              <NuxtLink :to="`/user/${friend.user.id}`">
                <div style="display:flex;justify-content: start;padding-bottom:5px">
                  <img height="41px" width="41px" style="border-radius: 100%;" alt="user avatar" :src="getAvatar(friend.user.id,friend.user.avatar)">
                  <div style="padding-left:10px">
                    <span style="font-size: 18px; width: 41px; overflow: hidden; white-space: nowrap;">
                      {{ friend.user.username }}
                    </span>
                    <div style="font-size: small;">
                      {{ 120 > Math.floor(new Date().getTime()/1000 - friend.user.online) ? "Онлайн":OfflinefromOnline(friend.user.online) }}
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  data () {
    return {
      numbers: [1, 2, 3, 4]
    }
  },
  async fetch () {
    if (this.$store.state.UserPage.user.id !== this.$route.params.id) {
      const cleanUser = Object.assign({}, this.$store.state.user)
      cleanUser.username = ''
      cleanUser.avatar = ''
      cleanUser.id = ''
      this.$store.commit('UserPage/SetUser', cleanUser)

      await this.getUser(this.$route.params.id).catch((err) => {
        if (err.message === '404') { this.$nuxt.error({ statusCode: 404, message: '' }) }
      })
    }
  },
  head () {
    const friendsDesc =
      this.user && this.friends && this.friends.count && this.friends.count > 0
        ? `${this.friends.list
            .slice(0, 6)
            .map((user, index) => {
              if (index < 6) { return user.username }
              return ''
            })}`
        : ''

    return {
      title: `Список друзей ${this.user.username} - Only One`,
      description: `список друзей пользователя ${this.user.username} дружит с  ${friendsDesc}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Список друзей пользователя ${this.user.username} дружит с  ${friendsDesc}`
        },
        { hid: 'og:title', name: 'og:title', content: `Список друзей ${this.user.username} - Only One` },
        { hid: 'og:image', name: 'og:image', content: this.avatar }
      ]
    }
  },
  computed: {
    ...mapState({
      user: state => state.UserPage.user,
      friends: state => state.UserPage.friends,
      friendStatus: state => state.UserPage.friendStatus,
      posts: state => state.UserPage.posts
    })
  },
  methods: {
    OfflinefromOnline (online) {
      if (!online) { return 'offline' }
      return moment(online * 1000).locale(this.$i18n.localeProperties.code).fromNow()
    },
    getAvatar (id, avatar) {
      if (avatar) { return `https://cdn.only-one.su/public/clients/${id}/${avatar}` } else { return 'https://cdn.only-one.su/public/UserProfileImage.svg' }
    },
    ...mapActions({ getUser: 'UserPage/getUser' })
  }

})
</script>
<style scoped>
a {
  text-decoration: unset;
  color: unset;
}
#friend {
  width: 27px;
  display: inline-block;
  margin-right: 13px;
}

#avatarPhoto {
  width: 240px;
  height: 240px;
  border-radius: 100%;
  object-fit: cover;
}

#AvatarBox {
  width: 240px;
  height: 240px;
}

.userAvatarAndAbout {
  display: flex;
}

#username {
  font-size: 24px;
  line-height: 31px;
  padding-left: 71px;
  padding-top: 12px;
}

#aboutblock {
  display: inline-block;
  width: 300px;
  position: relative;
  left: 54vh;
}

#aboutblock > div {
  width: 300px;
  background-color: white;
}

.friendsAndWall {
  display: flex;
}

.friends {
  background: #fff;
  border-radius: 21px;
  width: 200px;
  margin-top: 37px;
  margin-left: 11px;
  height: 94px;
}

#FriendsTitle {
  font-size: 24px;
  line-height: 31px;
  color: #000;
}

@media screen and (orientation: portrait) {
  #aboutblock {
    left: unset !important;
    top: unset;
  }

  .userAvatarAndAbout {
    display: block;
  }
}
</style>
