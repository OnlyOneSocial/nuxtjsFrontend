<template>
  <div>
    <div style="margin: 0 auto">
      <h2 style="text-align:center">
        News
      </h2>
      <News :posts="news" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState({
      news: state => state.news
    })
  },
  created () {
    this.Update()
  },
  methods: {
    async Update () {
      await this.getNews()
    },
    ...mapActions(['getNews'])
  }
})
</script>

<style scoped>
  h2 {
    margin: 0 auto;
    width: 100%;
  }
</style>
