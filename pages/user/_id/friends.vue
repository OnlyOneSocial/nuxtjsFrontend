<template>
  <div class="content">
    друзья
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data () {
    return {
      numbers: [1, 2, 3, 4]
    }
  },
  computed: {
    avatar () {
      const userid = this.user.id
      const userAvatar = this.user.avatar
      return this.getAvatar(userid, userAvatar)
    },
    user () {
      return this.$store.state.user
    }
  },
  created () {
    // this.getUser(this.$route.params.id)
  },
  methods: {
    getAvatar (id, avatar) {
      if (avatar) { return `https://cdnsocial.katelinlis.xyz/public/clients/${id}/${avatar}` } else { return 'https://cdnsocial.katelinlis.xyz/public/UserProfileImage.svg' }
    },
    ...mapActions(['getUser'])
  }

})
</script>
<style scoped>
#friend {
  width: 27px;
  display: inline-block;
  margin-right: 13px;
}

#avatarPhoto {
  width: 240px;
  height: 240px;
  border-radius: 100%;
  object-fit: cover;
}

#AvatarBox {
  width: 240px;
  height: 240px;
}

.userAvatarAndAbout {
  display: flex;
}

#username {
  font-size: 24px;
  line-height: 31px;
  padding-left: 71px;
  padding-top: 12px;
}

#aboutblock {
  display: inline-block;
  width: 300px;
  position: relative;
  left: 54vh;
}

#aboutblock > div {
  width: 300px;
  background-color: white;
}

.friendsAndWall {
  display: flex;
}

.friends {
  background: #fff;
  border-radius: 21px;
  width: 200px;
  margin-top: 37px;
  margin-left: 11px;
  height: 94px;
}

#FriendsTitle {
  font-size: 24px;
  line-height: 31px;
  color: #000;
}

@media screen and (orientation: portrait) {
  #aboutblock {
    left: unset !important;
    top: unset;
  }

  .userAvatarAndAbout {
    display: block;
  }
}
</style>
