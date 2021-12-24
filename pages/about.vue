<template>
  <div>
    <div style="text-align: center;  margin: 0 auto;    background: #FFFFFF;padding:20px 20px 20px 20px">
      <h1>О проекте</h1>

      <p style="text-align: left; width: 600px;">
        Свободная платформа для общения людей, а так же для проведения какой либо активности на этой платформе
        <br>
        Проект разрабатывается по принцепу открытого исходного кода, и наши пользователи могут внести свой вклад в платформу
        или предложить свою идею какую необходимо развить или добавить
        <br>
        <br>
        Платформа сейчас выглядит как социальная сеть, по причине того, что этот проект быстрее развивать в этой сфере <br>
        А так же в этой сфере нуждаются люди, а именно в общении и поиске новых знакомств и связей на новом уровне,
        <br>
        Наша главная цель предоставить стабильное и удобное место, где пользователи смогут быть в безопаности и чувствовать себя спокойно
        <br>
        А еще мы намного экологичнее, и меньше загрязняем наш окружающий мир чем другие проекты, спасем планету вместе!
      </p>
      <br>

      <a href="https://vk.com/onlyonesu">
        VK группа
      </a> <br>

      <a href="https://katelinlis.ru">
        Авторка проекта
      </a> <br>
      <a href="https://github.com/OnlyOneSocial">
        Репозитории проекта на Github
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  head () {
    return {
      title: 'Про проект Only One',
      description: 'Социальная сеть с открытым исходным кодом, основная цель проекта позволить пользователям проявлять активность в разработке ',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Про проект Only One' },
        { hid: 'og:image', name: 'og:image', content: 'http://only-one.su/img/OnlyOneSocial.png' }
      ]
    }
  }
})
</script>
<style scoped>
p {
  font-family: ManropRegular, sans-serif;
  padding-top: 2px;
}

@font-face {
  font-family: "ManropRegular";
  src: url("/manrope.woff2") format("woff2");
  font-style: normal;
  font-weight: normal;
}
</style>
