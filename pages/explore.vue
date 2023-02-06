<template>
  <div style="display:block">
    Поиск пользователей
    <br>
    <label for="Username">Имя пользователя</label>
    <input id="Username" v-model="username">
    <br>

    <br>

    <div v-for="(user,index) in users" :key="index">
      <nuxt-link :to="`/user/${user.id}`">
        {{ user.username }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
let timeoutRequestSearch

export default Vue.extend({
  data () {
    return {
      username: '',
      users: []
    }
  },
  head () {
    return {
      title: 'Поиск пользователей в социальной сети Only One',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'На данной странице вы можете найти новых друзей'
        },
        { hid: 'og:title', name: 'og:title', content: 'Поиск пользователей в социальной сети Only One' },
        { hid: 'og:image', name: 'og:image', content: 'http://only-one.su/img/OpenGraphLogo.png' }
      ]
    }
  },
  watch: {
    username (newUsername) {
      if (timeoutRequestSearch) { clearTimeout(timeoutRequestSearch) }

      timeoutRequestSearch = setTimeout(() => {
        this.$api.$get(`/user/search?username=${this.username}`).then((data) => {
          this.users = data
        })
      }, 500)
    }
  }
})
</script>
