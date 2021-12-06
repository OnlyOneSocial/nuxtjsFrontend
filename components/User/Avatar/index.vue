<template>
    <div id="AvatarBox" @mouseleave="changeButton = false" @mouseover="me ? changeButton = true : ''">
        <img
            id="avatarPhoto"
            :src="avatar"
            alt="user avatar"
            @click="$store.commit('SetModal', { type: 'OpenUserAvatar', data: avatar })"
        >
        <div v-if="changeButton" id="СhangeAvatarButtonDiv">
            <span id="ChangeAvatarButton" @click="clickforUpload">change avatar</span>
            <input
                id="avatarUpload"
                accept=".jpg, .jpeg, .png"
                size="5000000"
                style="display: none;"
                type="file"
                @change="Upload"
            >
        </div>
    </div>
</template>
<script>

export default {

    props: {
        me: {
            type: Boolean,
            default: false
        },
        avatar: {
            type: String,
            default: ''
        },
        update: {
            type: Function,
            default: () => {
                console.log('set update function')
            }
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

            this.$api({
                method: 'post',
                url: 'user/upload_avatar',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(() => {
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

#СhangeAvatarButtonDiv {
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
