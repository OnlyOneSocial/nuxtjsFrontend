<template>
  <div>
    <div style="text-align: center;  margin: 0 auto;    background: #FFFFFF;padding:20px 20px 20px 20px">
      Внимание <br>
      вы переходите на сайт <br>
      который может быть опасен
      <br>
      {{ $route.query.url }}
      <br>
      Вы точно хотите перейти ?
      <br>
      <button @click="redirect">
        Перейти
      </button>
    </div>
  </div>
</template>
<script>

export default {
  created () {

    // const params = (new URL(this.$route.fullPath)).searchParams
    // console.log(params.get('data'))
  },
  methods: {
    redirect () {
      location.href = this.$route.query.url
    }
  }
}
</script>
