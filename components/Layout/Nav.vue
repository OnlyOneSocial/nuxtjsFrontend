<template>
  <nav class="nav-container">
    <ul class="nav-list">
      <template v-if="me.id">
        <li class="nav-list__item">
          <NuxtLink :to="`/user/${me.id}`">
            <img src="/img/menu/my_page.svg" style="margin-right:6px;filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)">{{ $t('MyPage') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink :to="`/user/${me.id}/friends`">
            <img src="/img/menu/contacts.svg" style="margin-right:6px">{{ $t('Contacts') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink to="/news">
            <img src="/img/menu/news.svg" style="margin-right:6px">{{ $t('Feed') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink to="/im">
            <img src="/img/menu/news.svg" style="margin-right:6px">Диалоги
          </NuxtLink>
        </li>
      </template>
      <li class="nav-list__item">
        <NuxtLink to="/users">
          <img src="/img/menu/people.svg" style="margin-right:6px">{{ $t('UsersCatalog') }}
        </NuxtLink>
      </li>
      <li class="nav-list__item">
        <NuxtLink to="/about">
          <img src="/img/menu/about.svg" style="margin-right:6px">{{ $t('AboutProject') }}
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
   .nav-list__item > a {
    color: black;
    text-decoration: none;
        font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: 0.01em;

  }
  .nav-list__item > a > img {
    margin-right:6px
  }

  .nav-container{
    background: #FFFFFF;
    border-radius: 8px;
    padding: 27px 18px 38.5px 31px;
  }

  .nav-list__item {
    list-style-type: none;
    margin-bottom: 1vw;
  }

  @media screen and (orientation: portrait) {
    .page-container__layout nav {
      display: none;
    }
  }
</style>
