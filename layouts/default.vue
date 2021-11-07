
<template>
  <section class="page-container">
    <LayoutHeader />
    <section class="page-container__layout">
      <LayoutNav /><Nuxt class="page-container__content" />
    </section>
    <LayoutFooter />
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  head () {
    return {
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0'
        },
        {
          name: 'og:site_name',
          hid: 'og:site_name',
          content: 'Only one'
        }
      ]
    }
  },
  created () {
    this.getMe()
  },
  methods: {
    async Update () {
      await this.getMe()
    },
    ...mapActions(['getMe'])
  }
}
</script>

<style scoped>
  .page-container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 80vw;
    min-height: 100%;
    background-color: #f8f5f5;
  }

  .page-container__layout {
    position: relative;
    display: flex;
    flex-grow: 1;
    align-self: stretch;
  }

  .page-container__layout * {
    display: flex;
    flex-grow: 1;
    align-items: stretch;
    padding: 8px;
    overflow: auto;
  }

  .page-container__layout nav {
    flex-grow: 0;
    flex-shrink: 0;
    width: 200px;
  }

  .page-container__content {
    background-color: #c4c4c4;
  }

  @media screen and (orientation: portrait) {
    .page-container {
      width: 100%;
    }
    .navsMenuDesktop {
      display: none;
    }

    .container {
      width: 100vw;
      left: 0;
    }

    .content {
      position: absolute;
      margin: 0 auto;
    }
  }
  .content {
    position: absolute;
    background: #c4c4c4;
    height: max-content;
    min-height: 700px;
    z-index: 1;
    left: 15%;
    width: 80%;
  }
  @media only screen and (max-width: 768px) {
    .content {
      left: unset;
      width: 100%;
    }
  }

</style>

<style>
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  html, body, #__nuxt, #__layout {
    width: 100%;
    height: 100%;
  }
</style>
