<template>
  <div id="AvatarBox" @mouseover="changeButton = true" @mouseleave="changeButton = false">
    <img id="avatarPhoto" alt="user avatar" :src="avatar" @click="$store.commit('SetModal', { type: 'OpenUserAvatar', data: avatar })">
    <div v-if="changeButton" id="changeAvatarButton">
      <span id="ChangeAvatarButton" @click="clickforUpload">change avatar</span>
      <input
        id="avatarUpload"
        style="display: none;"
        type="file"
        accept=".jpg, .jpeg, .png"
        size="5000000"
        @change="Upload"
      >
    </div>
  </div>
</template>
<script>

export default {

  props: {
    avatar: {
      type: String,
      default: ''
    },
    update: {
      type: Function,
      default: () => { console.log('set update function') }
    }

  },
  data () {
    return {
      changeButton: false
    }
  },
  methods: {
    clickforUpload () {
      document.getElementById('avatarUpload').click()
    },
    Upload (input) {
      const photo = document.getElementById('avatarUpload').files[0]
      const formData = new FormData()

      formData.append('photo', photo)

      this.$api({ method: 'post', url: 'https://social.katelinlis.ru/api/user/upload_avatar', data: formData, headers: { 'Content-Type': 'multipart/form-data' } }).then(() => {
        this.update()
      })
    }
  }
}
</script>
<style scoped>
#ChangeAvatarButton {
    position: relative;
    color: wheat;
    text-align: center;
    display: inherit;
}
#changeAvatarButton {
    background: #80808069;
    width: 160px;
    height: 20px;
    position: absolute;
    top: 161px;
    z-index: 10;

}
#avatarPhoto {
  width: 160px;
  height: 160px;
  border-radius: 11px;
  object-fit: cover;
}

#AvatarBox {
  width: 160px;
  height: 160px;
}
</style>
