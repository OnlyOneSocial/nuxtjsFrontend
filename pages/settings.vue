<template>
  <div>
    <ul>
      <li @click="()=>Select(0)">
        Общая информация
      </li>
      <br>
      <li @click="()=>Select(1)">
        Безопасность
      </li>
    </ul>
    <div style="padding-left:50px">
      <div v-if="element===1">
        <h3>Смена пароля</h3>

        Введите прошлый пароль
        <input>
        <br>
        Введите новый пароль
        <input>
        <br>
        Введите подтвердите пароль
        <input>
      </div>

      <div v-else-if="element===0">
        Ваш Возраст <input>
        <br>
        Ваш пол <input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      element: 0
    }
  },
  methods: {
    Select (num) {
      this.element = num
    }
  }
}
</script>
