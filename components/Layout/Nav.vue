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
      <li v-if="$i18n.localeProperties.code=='ru'" class="nav-list__item">
        <span @click="$i18n.setLocale('en')">
          Change to English
        </span>
      </li>
      <li v-else-if="$i18n.localeProperties.code=='en'" class="nav-list__item">
        <span @click="$i18n.setLocale('ru')">
          Сменить на Русский
        </span>
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
  .nav-list__item > a > img {
    margin-right:6px
  }
  .nav-container{
    background: #FFFFFF;
    border-radius: 8px;
    width: 258px;
    padding: 27px 18px 38.5px 31px;
  }

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
