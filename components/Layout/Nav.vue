<template>
  <nav class="nav-container">
    <ul class="nav-list">
      <template v-if="me.id">
        <li class="nav-list__item">
          <NuxtLink :to="`/user/${me.id}`">
            {{ $t('MyPage') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink :to="`/user/${me.id}/friends`">
            {{ $t('Contacts') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink to="/news">
            {{ $t('Feed') }}
          </NuxtLink>
        </li>
      </template>
      <li class="nav-list__item">
        <NuxtLink to="/users">
          {{ $t('UsersCatalog') }}
        </NuxtLink>
      </li>
      <li class="nav-list__item">
        <NuxtLink to="/about">
          {{ $t('AboutProject') }}
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
