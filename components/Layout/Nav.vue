<template>
  <nav class="nav-container">
    <ul class="nav-list">
      <li class="nav-list__item">
        <a href="/news">Лента</a>
      </li>
      <li class="nav-list__item">
        <a href="/users">Список пользователей</a>
      </li>
    </ul>
  </nav>
</template>

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
