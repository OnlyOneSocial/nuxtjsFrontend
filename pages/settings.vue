<template>
  <div class="settings-container">
    <div class="settings-menu-container">
      <div class="settings-menu-item">
        <img src="/img/login/login-form-input-icon-login.svg" @click="()=>Select(0)">
        <span @click="()=>Select(0)">Общая<br>информация</span>
      </div>
      <div class="settings-menu-item">
        <img src="/img/login/login-form-input-icon-password.svg" @click="()=>Select(1)">
        <span @click="()=>Select(1)">Безопасность</span>
      </div>
      <div class="settings-menu-item">
        <img src="/img/login/login-form-input-show.svg" @click="()=>Select(2)">
        <span @click="()=>Select(2)">Приватность</span>
      </div>
      <div class="settings-menu-item">
        <img src="/img/menu/news.svg" @click="()=>Select(3)">
        <span @click="()=>Select(3)">Удалить<br>аккаунт</span>
      </div>
    </div>
    <div class="settings-edit-container">
      <div class="settings-edit-password" v-if="element===1">
        <h3>Смена пароля</h3><br>
        <span>Прошлый пароль</span><br>
        <input type="password" placeholder="Введите прошлый пароль">
        <br><br>
        <span>Новый пароль</span><br>
        <input type="password" placeholder="Введите новый пароль"><br>
        <span>Повторите пароль</span><br>
        <input type="password" placeholder="Введите пароль повторно">
        <br><br>
        <button>Сохранить</button>
      </div>

      <div class="settings-edit-user" v-else-if="element===0">
        <span>Дата рождения</span><br>
        <input type="date"><br>
        <span>Ваш пол</span><br>
        <select>
          <option>Женский</option>
          <option>Мужской</option>
          <option>Другой</option>
        </select>
        <br><br>
        <button>Сохранить</button>
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
<style scoped>
.settings-menu-container {
  width: 218px;
  background: #FFFFFF;
  border-radius: 8px;
  margin-left: 8px;
  padding-top: 27px;
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 38.5px;
}
.settings-menu-item {
  margin-bottom: 1vw;
}
.settings-menu-item > span {
  cursor: pointer;
}
.settings-menu-item > img {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.settings-edit-container {
  width: 100%;
  background: #FFFFFF;
  border-radius: 8px;
  margin-left: 8px;
  padding-top: 27px;
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 38.5px;
}
.settings-edit-password > input {
  height: 32px;
  background: #f5f8fd;
  color: #8c99b2;
  border-radius: 6px;
  padding-left: 10px;
  outline: none;
}
.settings-edit-user > input {
  height: 32px;
  background: #f5f8fd;
  color: #8c99b2;
  border-radius: 6px;
  padding-left: 10px;
  outline: none;
}
.settings-edit-user > select {
  height: 32px;
  background: #f5f8fd;
  color: #8c99b2;
  border-radius: 6px;
  padding-left: 10px;
  outline: none;
}
.settings-edit-user > button {
  height: 32px;
  background: #f5f8fd;
  color: #8c99b2;
  border-radius: 6px;
  padding-left: 10px;
  outline: none;
  cursor: pointer;
}
.settings-edit-user > button:hover {
  color: #000000;
}
.settings-edit-password > button {
  height: 32px;
  background: #f5f8fd;
  color: #8c99b2;
  border-radius: 6px;
  padding-left: 10px;
  outline: none;
  cursor: pointer;
}
.settings-edit-password > button:hover {
  color: #000000;
}
</style>
