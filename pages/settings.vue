<template>
  <div class="settings-container">
    <div class="settings-edit-container">
      <div v-if="element===1" class="settings-edit-password">
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
      <div v-if="element===2" class="settings-edit-password">
        <h3>Контакты, ссылки и привязки</h3><br>
        <span>Личный сайт</span><br>
        <input type="password" placeholder="ваш личный сайт">
        <br><br>
        <span>Email для связи</span><br>
        <input type="password" placeholder="введите Email">
        <br><br>
        <h4>Привязка социальных сетей</h4>
        <br>
        Привязка VK
        <br>
        Привязка Facebook
        <br>
        Привязка Discord
        <br>
        Привязка Telegram
        <br>
        Привязка Shikimori
        <br>
        <button>Сохранить</button>
      </div>

      <div v-else-if="element===0" class="settings-edit-user">
        <h3>Общая информация</h3><br>
        <span>Дата рождения</span><br>
        <input v-model="mainSettings.birthday" type="date"><br>
        <br>
        <span>Ваш пол</span><br>
        <select v-model="mainSettings.genderOption">
          <option>Женский</option>
          <option>Мужской</option>
          <option>Другой</option>
        </select>
        <input v-if="mainSettings.genderOption==='Другой'" v-model="mainSettings.gender">
        <br><br>
        <span>Местоположение</span><br>
        <input v-model="mainSettings.Country" placeholder="Страна"><input v-model="mainSettings.City" style="margin-left:10px" placeholder="Населенный пункт">
        <br><br>
        <span>Краткое описание</span><br>
        <textarea v-model="mainSettings.bio" placeholder="Расскажите о себе" style="width:350px;height:100px;background-color:#f5f8fd" />
        <br>
        <button @click="ChangeMainSettings">
          Сохранить
        </button>
      </div>
    </div>
    <div class="settings-menu-container">
      <div class="settings-menu-item" @click="()=>Select(0)">
        <img src="/img/login/login-form-input-icon-login.svg">
        <span>Общая<br>информация</span>
      </div>
      <div class="settings-menu-item" @click="()=>Select(1)">
        <img src="/img/login/login-form-input-icon-password.svg">
        <span @click="()=>Select(1)">Безопасность</span>
      </div>
      <div class="settings-menu-item" @click="()=>Select(2)">
        <img src="/img/login/login-form-input-show.svg">
        <span>Контакты, привязки и ссылки</span>
      </div>
      <div class="settings-menu-item" @click="()=>Select(3)">
        <img src="/img/login/login-form-input-show.svg">
        <span>Заблокированные и контроль запретов</span>
      </div>
      <div class="settings-menu-item" @click="()=>Select(4)">
        <img src="/img/login/login-form-input-show.svg">
        <span>Приватность</span>
      </div>
      <div class="settings-menu-item">
        <img src="/img/menu/news.svg">
        <span>Удалить<br>аккаунт</span>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      mainSettings: {
        birthday: '',
        genderOption: 'Другой',
        gender: 'Женский',
        Country: '',
        City: '',
        bio: ''
      },
      element: 0
    }
  },
  async fetch () {
    await this.UpdateUser().then(() => {
      // alert(this.user.id)
      this.mainSettings.Country = this.user.country
      this.mainSettings.City = this.user.city
      this.mainSettings.gender = this.user.gender
      this.mainSettings.bio = this.user.bio

      if (!this.GenderISBinare(this.user.gender)) { this.mainSettings.genderOption = 'Другой' }

      this.mainSettings.birthday = new Date(this.user.birthday_date * 1000).toISOString().slice(0, 10)
    })
  },
  computed: {
    ...mapState({
      user: state => state.UserPage.user,
      me: state => state.me
    })
  },
  methods: {
    Select (num) {
      this.element = num
    },
    GenderISBinare (gender) {
      if (gender === 'Женский' || gender === 'Мужской') { return true } else { return false }
    },
    ChangeMainSettings () {
      if (this.GenderISBinare(this.mainSettings.genderOption)) { this.mainSettings.gender = this.mainSettings.genderOption }

      this.$api.put('/user/settings', {
        birthday: new Date(this.mainSettings.birthday).getTime() / 1000,
        gender: this.mainSettings.gender,
        country: this.mainSettings.Country,
        city: this.mainSettings.City,
        bio: this.mainSettings.bio
      }).then(() => {
        this.$toast.success('Обновленно')
      })
    },
    async UpdateUser () {
      if (this.me.id) {
        await this.getUser(this.me.id).catch((err) => {
          if (err.message === '404') { this.$nuxt.error({ statusCode: 404, message: '' }) }
        })
      }
    },

    ...mapActions({ getUser: 'UserPage/getUser', getPosts: 'UserPage/getPosts' })
  }
}
</script>
<style scoped>
.settings-menu-container {
  width: 250px;
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
  text-align: center;
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
