<template>
  <nav class="nav-container">
    <ul class="nav-list">
      <template v-if="me.id">
        <li class="nav-list__item">
          <NuxtLink :to="`/user/${me.id}`">
            <img src="/img/menu/my_page.svg" :class="{active:$nuxt.$route.name=='user-id' }">{{ $t('MyPage') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink :to="`/user/${me.id}/friends`">
            <img src="/img/menu/contacts.svg" :class="{active:$nuxt.$route.name=='user-id-friends' }">{{ $t('Contacts') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink to="/news">
            <img src="/img/menu/news.svg" :class="{active:$nuxt.$route.name=='news' }">{{ $t('Feed') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink to="/im">
            <img src="/img/menu/im.svg" :class="{active:$nuxt.$route.name=='im' }">{{ $t('Im') }}
          </NuxtLink>
        </li>
        <li class="nav-list__item">
          <NuxtLink to="/explore">
            <img src="/img/menu/explore.svg" :class="{active:$nuxt.$route.name=='explore' }">{{ $t('Explore') }}
          </NuxtLink>
        </li>
      </template>

      <li class="nav-list__item">
        <NuxtLink to="/about">
          <img src="/img/menu/about.svg" :class="{active:$nuxt.$route.name=='about' }">{{ $t('AboutProject') }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapState } from 'vuex'

export default {
  updated () {
    console.log(this.$nuxt.$route.name)
  },
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
    margin-right:6px;
    height:18px;
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
  .active {
    filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)
  }
</style>
