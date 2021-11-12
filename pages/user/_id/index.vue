<template>
  <div class="content UserPage">
    <div class="userAvatarAndAbout">
      <div style="display: inline-block;">
        <span id="username">{{ user.username }}</span>
        <br>
        <UserAvatar :avatar="avatar" />
        <div v-if="user.me" id="EditUser">
          <button style="width:150px" onclick="if (!window.__cfRLUnblockHandlers) return false; document.location.href = 'https://katelinlis.xyz/settings'">
            Обновить информацию
          </button>
        </div>
        <div v-else id="friendRequestAndSendMessage">
          <button v-if="friendStatus.status===3" id="ButtonSendRequestFriend" style="width:150px">
            Добавить в друзья
          </button>
          <button v-if="friendStatus.status===2" id="ButtonSendRequestFriend" style="width:150px">
            Принять запрос в друзья
          </button>
          <button v-if="friendStatus.status===1" id="ButtonSendRequestFriend" style="width:150px">
            Удалить из друзей
          </button>
          <br>
          <button style="width:150px">
            Send Message
          </button>
        </div>
      </div><div id="aboutblock">
        <span>about</span><div style="min-height: 216px;">
          <div>
            <div>Имя</div><div style="margin-left: 20px;">
              Имя Фамилия
            </div>
          </div>
        </div>
      </div>
    </div><div class="friendsAndWall">
      <div class="friends">
        <div style="margin-left: 8px;">
          <span id="FriendsTitle">
            <a href="/user/1/friends" style="text-decoration: unset; color: #000;">Friends</a>
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
      <UserWall :posts="posts" />
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
      await this.Update()
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
    getAvatar (id, avatar) {
      if (avatar) { return `https://cdnsocial.katelinlis.xyz/public/clients/${id}/${avatar}` } else { return 'https://cdnsocial.katelinlis.xyz/public/UserProfileImage.svg' }
    },
    async Update () {
      const self = this
      return await Promise.all(
        self.getUser(this.$route.params.id),
        self.getPosts(this.$route.params.id)
      )
    },
    ...mapActions({ getUser: 'UserPage/getUser', getPosts: 'UserPage/getPosts' })
  }

})
</script>
<style scoped>
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
