<template>
  <div>
    <div style="text-align: center;  margin: 0 auto;    background: #FFFFFF;padding:20px 20px 20px 20px">
      <h1>О проекте</h1>

      <p style="text-align: left; width: 600px;">
        Свободная платформа для общения.
        <br>
        Исходный код проекта открыт, и пользователи могут внести свой вклад через прямое участие в разработке или делясь своим опытом использования и предложениями.
        <br>
        <br>
        Платформа представляет собой социальную сеть, поскольку именно в такой форме нуждаются пользователи, желающие общаться и искать новые знакомства.
        <br>
        Наша главная цель — предоставить стабильную и удобную платформу, где пользователи смогут чувствовать себя спокойно, выполняя свои задачи.
        <br>
        <br>
        А еще мы намного меньше загрязняем окружающую среду, чем другие проекты. Спасем планету вместе!
      </p>
      <br>

      <a href="https://vk.com/onlyonesu">
        Группа в VK
      </a> <br>

      <a href="https://katelinlis.ru">
        Автор проекта
      </a> <br>
      admin@only-one.su почта для обратной связи
      <br/>
      <a href="https://github.com/OnlyOneSocial">
        Организация на Github
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  head () {
    return {
      title: 'О проекте Only One',
      description: 'Социальная сеть с открытым исходным кодом, основная особенность которой — предоставление пользователям возможности учавствовать в разработке ',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'О проекте Only One' },
        { hid: 'og:image', name: 'og:image', content: 'http://only-one.su/img/OnlyOneSocial.webp' }
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
