<template>
  <header class="header-container">
    <NuxtLink to="/">
      <img class="header-logo" src="/img/Logo.svg" alt="MSN - modern social network alpha">
    </NuxtLink>
    <button onclick="logout()" class="login-container">
      <span class="login-button">Выйти</span>
    </button>
  </header>
</template>

<style scoped>
  .header-container {
    position: relative;
    display: block;
    height: 89px;
    background: #dbdbdb;
  }

  .header-logo {
    position: relative;
    display: block;
    padding: 12px;
  }

  .login-button {
    color: #fff;
    padding: 5px 15px 5px 15px;
    border-radius: 5px;
    font-family: 'Montserrat-Light', Verdana, sans-serif;
    font-size: 14px;
    background-color: #c4c4c4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-text-decoration: dotted;
    text-decoration: dotted;
    white-space: nowrap;
    -webkit-transition: background-color 0.5s;
    transition: background-color 0.5s;
  }

  .login-container {
    cursor: pointer;
    position: absolute;
    display: block;
    top: 50%;
    right: 12px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
</style>
