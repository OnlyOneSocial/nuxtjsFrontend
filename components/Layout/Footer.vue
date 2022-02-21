<template>
  <footer>
    <div v-if="$nuxt.$route.name!=='login' && $nuxt.$route.name!=='register'" class="footer-mobile">
      <NuxtLink to="/news">
        <img style="width: 30px;" src="/img/footer/newspaper.svg">
      </NuxtLink>
      <NuxtLink
        v-if="$store.state.me.id"
        :to="`/user/${$store.state.me.id}`"
      >
        <img
          class="ICON"
          src="/img/footer/user.svg"
        >
      </NuxtLink>
      <NuxtLink v-if="!me.id" to="/users">
        <img class="ICON" src="/img/footer/users.svg">
      </NuxtLink>
      <NuxtLink v-if="me.id" to="/im">
        <img src="/img/menu/news.svg" class="ICON">
      </NuxtLink>
    </div>
    <div class="defaultFooter">
      <div>
        <NuxtLink to="/users">
          <img src="/img/menu/people.svg" style="margin-left:6px"> {{ $t('UsersCatalog') }}
        </NuxtLink>
        <NuxtLink to="/about">
          <img src="/img/menu/about.svg" style="margin-left:6px"> {{ $t('AboutProject') }}
        </NuxtLink>
      </div>

      <div>
        <span v-if="$i18n.localeProperties.code!=='en'" style="cursor: pointer;" @click="$i18n.setLocale('en')">
          English
        </span>

        <span v-if="$i18n.localeProperties.code!=='ru'" style="cursor: pointer;" @click="$i18n.setLocale('ru')">
          Русский
        </span>

        <span v-if="$i18n.localeProperties.code!=='uk'" style="cursor: pointer;" @click="$i18n.setLocale('uk')">
          Українська
        </span>
        <span v-if="$i18n.localeProperties.code!=='be'" style="cursor: pointer;" @click="$i18n.setLocale('be')">
          беларускі
        </span>
      </div>
    </div>
  </footer>
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
<style>
a {
  color: unset;
  text-decoration: unset;
}
  .footer-mobile {
    display: none;
  }

  .defaultFooter {
    display:flex;
    justify-content: space-between;
  }

  @media screen and (orientation: portrait) {
    .defaultFooter {
      display: none;
    }
    .footer-mobile {
      display: block;
      font-size: x-large;
      position: fixed;
      background-color: rgb(232, 235, 255);
      height: 40px;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 300;
      text-align: center;
    }
  }
  .ICON{
    width:30px;
    margin-left:40px;
  }
</style>
