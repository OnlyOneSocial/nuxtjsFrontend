<template>
  <div>
    <div style="margin: 0 auto">
      <h2 style="text-align:center">
        News
      </h2>
      <News :posts="news.list" @scroll="Scroll" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      news: state => state.news
    })
  },
  created () {
    this.Update()
  },
  beforeMount () {
    window.addEventListener('scroll', this.Scroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.Scroll)
  },
  methods: {
    async Scroll () {
      // this.$nextTick(() => {
      const clientHeight = document.getElementsByClassName('page-container_main')[0].clientHeight
      const percent = clientHeight - window.innerHeight

      if (percent < 100 && !this.loading && !this.news.end) {
        this.loading = true
        await this.getNews({ offset: this.news.list.length, limit: 30 })
        this.loading = false
      }
    // })
    },
    async Update () {
      await this.getNews({ offset: 0, limit: 30 })
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
