<template>
  <div id="AvatarBox" @mouseover="changeButton = true" @mouseleave="changeButton = false">
    <img id="avatarPhoto" alt="user avatar" :src="avatar" @click="$store.commit('SetModal', { type: 'OpenUserAvatar', data: avatar })">
    <div v-if="changeButton" id="changeAvatarButton">
      <span id="ChangeAvatarButton" @click="$store.commit('SetModal', { type: 'updateUserAvatar', data: {} })">change avatar</span>
      <input
        id="avatarUpload"
        style="display: none;"
        onchange="if (!window.__cfRLUnblockHandlers) return false; Upload()"
        type="file"
        accept=".jpg, .jpeg, .png"
        size="5000000"
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
    }

  },
  data () {
    return {
      changeButton: false
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
    top: 251px;
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
