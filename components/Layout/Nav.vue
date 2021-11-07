<template>
  <nav class="nav-container">
    <ul class="nav-list">
      <template v-if="me.id">
        <li class="nav-list__item">
          <NuxtLink :to="`/user/${me.id}`">
            Моя страница
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink :to="`/user/${me.id}/friends`">
            Контакты
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink to="/news">
            Лента
          </NuxtLink>
        </li>
      </template>
      <li class="nav-list__item">
        <NuxtLink to="/users">
          Список пользователей
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      me: state => state.me
    })
  }
}
</script>

<style scoped>
  .nav-list__item {
    list-style-type: none;
  }

  .nav-list__item a {
    color: black;
    text-decoration: none;
  }

  @media screen and (orientation: portrait) {
    .page-container__layout nav {
      display: none;
    }
  }
</style>
