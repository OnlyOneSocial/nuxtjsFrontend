<template>
  <div style="display:block">
    Поиск пользователей
    <form @submit="submit">
      <br>
      <label for="Username">Имя пользователя</label>
      <input id="Username" v-model="filter.username">
      <br>
      <label for="agestart">Возраст от</label>
      <input id="agestart" v-model="filter.agestart" type="number">
      <br>
      <label for="agestart">Возраст до</label>
      <input id="agestart" v-model="filter.ageend" type="number">
      <br>

      <input type="submit" value="search">
    </form>
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
      filter: {
        username: '',
        agestart: 0,
        ageend: 0
      },
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
  methods: {
    submit (e) {
      e.preventDefault()
      this.Search()
    },
    Search () {
      if (timeoutRequestSearch) { clearTimeout(timeoutRequestSearch) }

      timeoutRequestSearch = setTimeout(() => {
        this.$api.$get(`/user/search?username=${this.filter.username}&agestart=${this.filter.agestart}&ageend=${this.filter.ageend}`).then((data) => {
          this.users = data
        })
      }, 500)
    }
  }
})
</script>
