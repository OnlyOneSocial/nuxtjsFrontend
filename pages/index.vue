<template>
  <div class="content" style="justify-content: space-between;align-items: center;">
    <div class="mainContent">
      <div style="text-align:center">
        <h2 class="Header">
          {{ $t('Welcome') }}
        </h2> <span style="font-size:large"><h3>{{ $t('InFreeDomSocialNetwork') }}</h3> <h1>Only one</h1></span> <br>
        <h2 class="weareonlyone">
          {{ $t('WeAreOnlyOneWeAreOnlyOneTogether') }}!
        </h2>
      </div>
    </div>

    <Auth class="auth" index />
  </div>
</template>

<script >
import Vue from 'vue'

export default Vue.extend({

  head () {
    return {
      title: 'Свободная социальная сеть | Only one',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Добро пожаловать в свободную социальную сеть Only one, тебя тут ждет новый огромный мир, а так же ты сможешь создавать свои миры, нас уже больше 500 человек'
        },
        { hid: 'og:title', name: 'og:title', content: 'Авторизация в Only One | Свободная социальная сеть' },
        { hid: 'og:image', name: 'og:image', content: 'http://only-one.su/img/OpenGraphLogo.png' }
      ]
    }
  }
})
</script>
<style scoped>
.auth {
  width: 500px;
}
.mainContent {
  width: 50vw;
}
  @media screen and (orientation: portrait) {
    .mainContent {
      display: none;
    }
    .auth{
      width: 90%;
    }
  }
h2.Header {
  display: block;
  font-size: x-large;
  font-weight: bold;
}
h2,h1,h3{
  display: inline-block;
  font-weight: normal;
  font-size: unset;
}
h1 {
  font-size: large;
  font-weight: 600;
}
.weareonlyone {
  font-size: medium;
  font-weight: 400;
}

</style>
