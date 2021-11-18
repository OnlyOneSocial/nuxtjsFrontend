<template>
  <div class="content UserPage">
    <div class="userAvatarAndAbout">
      <div style="display: inline-block;">
        <div class="userpage">
          <div class="AboutUser">
            <div>
              <UserAvatar :avatar="avatar" />
            </div>
            <div style="padding-left:16px">
              <div style="display:flex">
                <div>
                  <div>
                    <span id="username">{{ user.username }}</span>
                    <span style="color: #0BA4A4;">Online</span>
                  </div>
                  <div>
                    text
                  </div>
                </div>
                <img
                  src="/img/settings.svg"
                  title="settings"
                  data-v-8c57f232=""
                >
              </div>
              <div style="opacity: 0.5;border: 1px solid #D7E2F2;box-sizing: border-box;width: 100%;height: 0px;" />
            </div>
          </div>
          <div class="friends">
            <div style="margin-left: 8px;">
              <span id="FriendsTitle">
                <a href="/user/1/friends" style="text-decoration: unset; color: #000;">{{ $t('FriendsUser') }}</a>
              </span>
              <span id="count_friends"> {{ user.friends && user.friends.count }}</span>
              <div v-if="user.friends">
                <template v-for="(friend,index) in user.friends.list">
                  <span v-if="index<4" id="friend" :key="friend.id">
                    <NuxtLink :to="`/user/${friend.id}`">
                      <img height="30px" width="30px" style="border-radius: 100%;" alt="user avatar" :src="getAvatar(friend.id,friend.avatar)">
                      <div style="font-size: 14px; width: 36px; overflow: hidden; white-space: nowrap;">{{ friend.username.slice(0,10) }}</div>
                    </NuxtLink>
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>
        <template v-if="$store.state.me.id">
          <UserAction v-if="!user.me" :friend-status="friendStatus" :userid="user.id" />
        </template>
      </div>
    </div><div class="friendsAndWall">

      <UserWall :me="user.me" :update="UpdatePosts" :posts="posts" />
    </div>
    <div class="networkwall">

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  data () {
    return {
      fetchedId: 0,
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
      this.$store.commit('UserPage/SetPosts', [])
      // if (process.env.VUE_ENV === 'server') {  }

      Promise.all([
        await this.getUser(this.$route.params.id),
        await this.UpdatePosts()
      ])
    }
  },
  head () {
    const friendsDesc =
      this.user && this.user.friends && this.user.friends.count && this.user.friends.count > 0
        ? `дружит с ${this.user.friends.count} пользователями ${this.user.friends.list
            .slice(0, 6)
            .map((user, index) => {
              if (index < 6) { return user.username }
              return ''
            })}`
        : ''

    /* const postsDesc = posts
      ? `,написал(а) ${
          posts[0] ? `${posts[0].time + ': ' + posts[0].text}` : ''
        }`
      : '' */
    return {
      title: `${this.user.username} - Modern Social Network`,
      description: `Пользователь ${this.user.username} ${friendsDesc}`,
      meta: [
        { hid: 'og:title', name: 'og:title', content: `${this.user.username} - Modern Social Network` },
        { hid: 'og:image', name: 'og:image', content: this.avatar }
      ]
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      user: state => state.UserPage.user,
      friendStatus: state => state.UserPage.friendStatus,
      posts: state => state.UserPage.posts
    }),
    avatar () {
      return this.getAvatar(this.user.id, this.user.avatar)
    }
  },
  created () {
    // this.getUser(this.$route.params.id)
  },
  methods: {
    async UpdatePosts () {
      await this.getPosts(this.$route.params.id)
    },
    getAvatar (id, avatar) {
      if (avatar) { return `https://cdnsocial.katelinlis.xyz/public/clients/${id}/${avatar}` } else { return 'https://cdnsocial.katelinlis.xyz/public/UserProfileImage.svg' }
    },
    ...mapActions({ getUser: 'UserPage/getUser', getPosts: 'UserPage/getPosts' })
  }

})
</script>
<style scoped>
.userpage {
  display: flex;
}
.AboutUser{
  display: flex;
  background: #FFFFFF;
  border-radius: 8px;
  width: 800px;
  padding: 16px 16px 12px 13px;
}
#EditUser {
    margin-left: 50px;
}
#friendRequestAndSendMessage {
    margin-left: 50px;
}
.UserPage{
  display: flex;
  flex-direction: column;
}
#friend {
  width: 27px;
  display: inline-block;
  margin-right: 13px;
}

.userAvatarAndAbout {
  display: flex;
}

#username {
  font-size: 24px;
  line-height: 31px;
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
  justify-content: space-between;
}

.friends {
  background: #fff;
  border-radius: 8px;
  width: 258px;
  margin: 0px 0 0 9px;
  height: 450px;
}

#FriendsTitle {
  font-family: Roboto;
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
