<template>
  <div class="content UserPage">
    <div class="userAvatarAndAbout">
      <div class="AboutUser">
        <div>
          <UserAvatar :update="UpdateUser" :me="user.me" :avatar="avatar" />
          <div v-if="$store.state.me.id && !user.me" style="padding-top:10px">
            <div class="iconBox" title="Отправить сообщение" @click="$router.push(`/im?im=${user.id}`)">
              <img width="16px" height="16px" src="/img/user/message.svg">
            </div>

            <UserActionAddDeleteFriend v-if="$store.state.me.id && user.id && !user.me" :friend-status="friendStatus" :userid="user.id" class="iconBox Offset12" />

            <div class="iconBox Offset12" title="Перевести коины">
              <img src="/img/user/wallet.svg">
            </div>
            <div class="iconBox Offset12" title="Заблокировать">
              <img src="/img/user/forbidden.svg">
            </div>
          </div>
        </div>
        <div style="width: 100%;margin-left:16px">
          <div style="">
            <div>
              <div style="display:flex; flex-direction: row;justify-content: space-between;width:100%">
                <div style="display:inline-block;">
                  <span id="username">{{ user.username }}</span>
                  <span style="color: #0BA4A4;">{{ 120 > Math.floor(new Date().getTime()/1000 - user.online) ? "Онлайн":OfflinefromOnline(user.online) }}</span>
                </div>
                <img
                  v-if="user.me"
                  src="/img/settings.svg"
                  title="settings"
                  style="display:inline-block;"
                  @click="$router.push(`/settings`)"
                >
              </div>
              <div>
                <input id="status" style="color:#8C99B2;border:none;" placeholder="Опишите ваше состояние в 80 символов" :value="user.status" @change="ChangeStatus">
              </div>
            </div>
          </div>
          <div style="opacity: 0.5;border: 1px solid #D7E2F2;box-sizing: border-box;width: 100%;height: 0px;" />
          <div>
            Дата рождения:
            {{ new Date(user.birthday_date * 1000).toLocaleDateString() }} ({{ Math.floor((new Date()-new Date(user.birthday_date * 1000))/1000/60/60/24/365) }})
            <br>
            Пол: {{ user.gender }}
            <br>
            <NuxtLink v-if="false" :to="`/user/${user.id}/contacts`">
              Контакты и страницы
              <br>
            </NuxtLink>
            Местоположение: {{ user.country }}, {{ user.city }}
            <br>
            Краткое описание: <span>{{ user.bio }}</span>
          </div>
        </div>
      </div>
      <div class="FriendsBlock" style="position:relative">
        <div style="position:absolute">
          <div class="friends">
            <div style="padding-top: 23px; padding-left: 28px;">
              <span id="FriendsTitle">
                <NuxtLink :to="`/user/${user.id}/friends`" style="text-decoration: unset; color: #000;">{{ $t('FriendsUser') }}</NuxtLink>
              </span>
            </div>
            <br>
            <div class="InputSearch">
              <img style="padding: 8px 13px;position:absolute;" src="/img/search.svg">
              <input placeholder="Поиск">
            </div>

            <div style="padding: 19px 28px 16px 28px;">
              <span :class="{'textBold':NetworkSelectNum===1}" @click="NetworkSelect(1)">Друзья</span>
              <span :class="{'textBold':NetworkSelectNum===2}" @click="NetworkSelect(2)">Подписки</span>
              <span v-if="user.me" :class="{'textBold':NetworkSelectNum===3}" @click="NetworkSelect(3)">Запросы ({{ requests.count }})</span>
            </div>

            <div
              data-v-398b3732="
                "
              style="opacity: 0.5; border: 1px solid rgb(215, 226, 242); box-sizing: border-box; width: 84%; height: 0px;margin: 0px 15% 8px 8%;"
            />

            <div v-if="user && friends && NetworkSelectNum===1" style="margin-left:6px">
              <template v-for="(friend,index) in friends.list">
                <div :key="friend.user.id" style="width:80%;margin: 0 auto">
                  <div v-if="index<4" id="friend">
                    <NuxtLink :to="`/user/${friend.user.id}`">
                      <img height="41px" width="41px" style="border-radius: 100%;" alt="user avatar" :src="getAvatar(friend.user.id,friend.user.avatar)">
                      <span style="font-size: 18px; width: 41px; overflow: hidden; white-space: nowrap;">
                        {{ friend.user.username }}
                      </span>
                      <div>{{ 120 > Math.floor(new Date().getTime()/1000 - friend.user.online) ? "Онлайн":OfflinefromOnline(friend.user.online) }}</div>
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </div>

            <div v-if="user && requests && NetworkSelectNum===3" style="margin-left:6px">
              <template v-for="(friend,index) in requests.list">
                <div :key="friend.user.id" style="width:80%;margin: 0 auto">
                  <div v-if="index" id="friend">
                    <NuxtLink :to="`/user/${friend.user.id}`">
                      <img height="41px" width="41px" style="border-radius: 100%;" alt="user avatar" :src="getAvatar(friend.user.id,friend.user.avatar)">
                      <span style="font-size: 18px; width: 41px; overflow: hidden; white-space: nowrap;">
                        {{ friend.user.username }}
                      </span>
                      <div>{{ 120 > Math.floor(new Date().getTime()/1000 - friend.user.online) ? "Онлайн":OfflinefromOnline(friend.user.online) }}</div>
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div><div class="friendsAndWall">
      <UserWall class="Wall" :me="user.me" :update="UpdatePosts" :posts="posts.list" />
    </div>
    <div class="networkwall" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  name: 'UserPage',
  data () {
    return {
      fetchedId: 0,
      NetworkSelectNum: 1,
      loading: false,
      numbers: [1, 2, 3, 4],
      requests: {
        list: []
      }
    }
  },
  async fetch () {
    if (this.$store.state.UserPage.user.id !== this.$route.params.id) {
      const cleanUser = Object.assign({}, this.$store.state.user)
      cleanUser.username = ''
      cleanUser.avatar = ''
      cleanUser.id = ''
      this.$store.commit('UserPage/SetUser', cleanUser)
      this.$store.commit('UserPage/SetPosts', {
        content: [],
        offset: 0
      })
      // if (process.env.VUE_ENV === 'server') {  }

      Promise.all([
        await this.UpdateUser(),
        await this.UpdatePosts()
      ])
      if (this.user.me) { await this.GetRequests() }
    }
  },
  head () {
    const friendsDesc =
      this.user && this.friends && this.friends.count && this.friends.count > 0
        ? `дружит с ${this.friends.count} пользователями ${this.friends.list
            .slice(0, 6)
            .map((friend, index) => {
              if (index < 6) { return friend.user.username }
              return ''
            })}`
        : ''

    /* const postsDesc = posts
      ? `,написал(а) ${
          posts[0] ? `${posts[0].time + ': ' + posts[0].text}` : ''
        }`
      : '' */
    return {
      title: `${this.user.username} - Only one`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Пользователь ${this.user.username} ${friendsDesc}`
        },
        { hid: 'og:title', name: 'og:title', content: `${this.user.username} - Only one` },
        { hid: 'og:image', name: 'og:image', content: this.avatar }
      ]
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      user: state => state.UserPage.user,
      friends: state => state.UserPage.friends,
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
  beforeMount () {
    window.addEventListener('scroll', this.Scroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.Scroll)
  },
  methods: {
    async Scroll () {
      // this.$nextTick(() => {
      const clientHeight = document.getElementsByClassName('page-container_main')[0].clientHeight
      const percent = clientHeight - window.scrollY

      if (percent < 1800 && !this.loading && !this.posts.end) {
        this.loading = true
        await this.getPosts({ userid: this.$route.params.id, offset: this.posts.list.length, limit: 30 })
        this.loading = false
      }
    // })
    },
    NetworkSelect (num) {
      this.NetworkSelectNum = num
    },
    OfflinefromOnline (online) {
      if (!online) { return 'offline' }
      return moment(online * 1000).locale(this.$i18n.localeProperties.code).fromNow()
    },
    async ChangeStatus (data) {
      await this.$api.put('/user/status', { status: data.target.value })
    },
    async GetRequests () {
      await this.$api.get('/friends/request').then((data) => {
        this.requests = data.data
      })
    },
    async UpdatePosts () {
      await this.getPosts({ userid: this.$route.params.id, offset: this.posts.list.length, limit: 30 })
    },
    async UpdateUser () {
      await this.getUser(this.$route.params.id).catch((err) => {
        if (err.message === '404') { this.$nuxt.error({ statusCode: 404, message: '' }) }
      })
    },
    getAvatar (id, avatar) {
      if (avatar) { return `https://cdn.only-one.su/public/clients/${id}/${avatar}` } else { return 'https://cdn.only-one.su/public/UserProfileImage.svg' }
    },
    ...mapActions({ getUser: 'UserPage/getUser', getPosts: 'UserPage/getPosts' })
  }

})
</script>
<style scoped>
.textBold {
      font-weight: bold;
}
.InputSearch{
  width:80%;
  height:32px;
  border-radius: 35px;
  background: #F5F8FD;
  margin: 0 auto;
}

.InputSearch > input {
  background:#F5F8FD;
  border: none;
  border-radius: 35px;
  height:32px;
  position:relative;
  margin: 0 2% 0 2%;
  padding: 3% 8%;
  width:96%;
}

.userpage2 {
  display: flex;
}
.AboutUser{
  display: flex;
  background: #FFFFFF;
  border-radius: 8px;
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
  @media only screen and (max-width: 768px) {
    .AboutUser {
      width: 100%;
    }
    .friendsAndWall{
      width: 100%;
    }
    .Wall{
      width: 100%;
    }
    .FriendsBlock{
      display: none;
    }
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
#status:focus-visible {
  outline: 0;
}
a {
  text-decoration: unset;
  color: unset;
}
</style>
<style>
.iconBox{
    padding: 8px 8px 8px 8px;
    background-color: #F5F8FD;
    border-radius: 6px;
    box-sizing: content-box;
    width: 16px;
    height: 16px;
    display: inline-block;
}
.Offset12{
  margin-left:6px ;
}
</style>
