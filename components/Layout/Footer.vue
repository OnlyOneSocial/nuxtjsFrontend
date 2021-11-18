<template>
  <footer class="footer-mobile">
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
    <NuxtLink to="/users">
      <img class="ICON" src="/img/footer/users.svg">
    </NuxtLink>
  </footer>
</template>

<style>
  .footer-mobile {
    display: none;
  }

  @media screen and (orientation: portrait) {
    .footer-mobile {
      display: block;
      font-size: x-large;
      position: fixed;
      background-color: wheat;
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
