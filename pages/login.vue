<template>
  <div class="content">
    <Auth />
  </div>
</template>

<script >
import Vue from 'vue'

export default Vue.extend({

  head () {
    return {
      title: 'Авторизация в Only One | Свободная социальная сеть',
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
