<template>
    <div>
        <div style="text-align: center;">
            <h3>Users<span id="countusers">({{ users.total }})</span></h3>
            <div id="users">
        <span v-for="(user,index) in users.users" :key="index">
          <NuxtLink :to="`/user/${user.id}`">
            <img
                :src="`${user.avatar
                ? `https://cdnsocial.katelinlis.xyz/public/clients/${user.id}/100-${user.avatar}`
                : `https://cdnsocial.katelinlis.xyz/public/UserProfileImage.svg`}`"
                alt=""
                height="40px"
                width="40px"
            >
            <span
                style="overflow: hidden; text-overflow: ellipsis;"
            >
              {{ user.username }}
            </span>
          </NuxtLink>
        </span>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
    data () {
        return {
            fetchedId: 0,
            numbers: [1, 2, 3, 4]
        }
    },
    async fetch () {
        await this.getUsers()
    },
    head () {
        // TODO: Wtf?
        /* const postsDesc = posts
          ? `,написал(а) ${
              posts[0] ? `${posts[0].time + ': ' + posts[0].text}` : ''
            }`
          : '' */

        return {
            title: 'Users - Only One',
            description: 'Пользователи',
            meta: [
                {
                    property: 'og:title',
                    content: 'Пользователи - Only One'
                }
            ]
        }
    },
    fetchOnServer: true,
    computed: {
        ...mapState({
            users: state => state.users
        })
    },

    methods: {
        ...mapActions(['getUsers'])
    }

})
</script>
<style scoped>
#users > span {
    width: 110px;
    display: inline-block;
    margin-bottom: 20px;
}

#users span a img {
    object-fit: cover;
    border-radius: 100%;
}

#users > span > a > span {
    width: 75px;
    display: inline-block;
}
</style>
