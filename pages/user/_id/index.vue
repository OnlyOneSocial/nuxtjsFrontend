<template>
  <div class="content UserPage">
    <div class="userAvatarAndAbout">
      <div style="display: inline-block;">
        <span id="username">{{ user.username }}</span><br><div id="AvatarBox">
          <img id="avatarPhoto" alt="user avatar" :src="avatar">
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
          <span id="count_friends"> {{ user.friends.count }}</span>
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

<script lang="ts">
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
    if (this.$store.state.user.id !== this.$route.params.id) {
      const cleanUser = Object.assign({}, this.$store.state.user)
      cleanUser.username = ''
      cleanUser.avatar = ''
      cleanUser.id = ''
      this.$store.commit('SetUser', cleanUser)
      this.$store.commit('SetPosts', [])
      // if (process.env.VUE_ENV === 'server') {  }
      await this.Update()
    }
  },
  head () {
    const friendsDesc =
      this.user && this.user.friends.count > 0
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
      description: `Пользователь ${this.user.username} ${friendsDesc}`
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      user: state => state.user,
      posts: state => state.posts
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
      await this.getUser(this.$route.params.id)
      await this.getPosts(this.$route.params.id)
    },
    ...mapActions(['getUser', 'getPosts'])
  }

})
</script>
<style scoped>
.UserPage{
  display: flex;
  flex-direction: column;
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
