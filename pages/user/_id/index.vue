<template>
  <div class="content UserPage">
    <div class="userAvatarAndAbout">
      <div class="AboutUser">
        <div>
          <UserAvatar :avatar="avatar" />
          <div style="padding-top:10px">
            <div class="iconBox">
              <img width="16px" height="16px" src="/img/user/message.svg">
            </div>
            <div class="iconBox Offset12">
              <img src="/img/user/user_add.svg">
            </div>
            <div class="iconBox Offset12">
              <img src="/img/user/wallet.svg">
            </div>
            <div class="iconBox Offset12">
              <img src="/img/user/forbidden.svg">
            </div>
          </div>
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
      <div style="position:relative">
        <div style="position:absolute">
          <div class="friends">
            <div style="padding-top: 23px; padding-left: 28px;">
              <span id="FriendsTitle">
                <a href="/user/1/friends" style="text-decoration: unset; color: #000;">{{ $t('FriendsUser') }}</a>
              </span>
              <span id="count_friends"> {{ user.friends && user.friends.count }}</span>
            </div>
            <div v-if="user.friends" style="margin-left:6px">
              <template v-for="(friend,index) in user.friends.list">
                <div :key="friend.id" style="width:80%;margin: 0 auto">
                  <div v-if="index<4" id="friend">
                    <NuxtLink :to="`/user/${friend.id}`">
                      <img height="41px" width="41px" style="border-radius: 100%;" alt="user avatar" :src="getAvatar(friend.id,friend.avatar)">
                      <span style="font-size: 18px; width: 41px; overflow: hidden; white-space: nowrap;">
                        {{ friend.username.slice(0,10) }}
                      </span>
                      <div>Online</div>
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <template v-if="$store.state.me.id">
        <UserAction v-if="!user.me" :friend-status="friendStatus" :userid="user.id" />
      </template>
    </div><div class="friendsAndWall">
      <UserWall class="Wall" :me="user.me" :update="UpdatePosts" :posts="posts" />
    </div>
    <div class="networkwall" />
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
.iconBox{
    padding: 8px 8px 8px 8px;
    background-color: #F5F8FD;
    border-radius: 6px;
    box-sizing: content-box;
    /* width: 16px; */
    height: 16px;
    display: inline-block;
}
.Offset12{
  margin-left:6px ;
}
.userpage2 {
  display: flex;
}
.AboutUser{
  display: flex;
  background: #FFFFFF;
  border-radius: 8px;
  height: 237px;
  width: 49.6vw;
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
  margin: 0 auto;
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
  width: 49.6vw;
  justify-content: space-between;
}
.Wall {
  width: 49.6vw;
}

.friends {
  background: #fff;
  border-radius: 8px;
  width: 17vw;
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
a {
  text-decoration: unset;
  color: unset;
}
</style>
