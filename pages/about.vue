<template>
  <div>
    <div style="text-align: center; width: 600px; margin: 0 auto;">
      <h1>О проекте</h1>
      <p style="text-align: left; width: 600px;">
        Социальная сеть с открытым исходным кодом, <br>
        Используются различные технологии для обеспечения максимального быстродействия
        <br>
        базы данных Redis,Postgresql и языки Golang, NodeJS
        <br>
        Суть проекта иметь свою собственную соц сеть с открытым исходным кодом,
        <br> чтобы можно было протестировать свои навыки и умения в разработке высоконагруженных проектов
        <br>
        И для того чтобы можно было иметь свой собственный ресурс
      </p>
      <br>

      <a href="https://vk.com/onlyonesu">
        VK группа
      </a> <br>

      <a href="https://katelinlis.xyz">
        Авторка проекта
      </a> <br>
      <a href="https://github.com/katelinlis/msnfrontend">
        Репозиторий фронтенда на Github
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
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
