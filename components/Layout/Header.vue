<template>
    <header class="header-container">
        <NuxtLink to="/">
            <img alt="MSN - modern social network alpha" class="header-logo" src="/img/Logo.svg">
        </NuxtLink>
        <template v-if="me.id">
            <button class="login-container" @click="logout">
                <span class="login-button">{{ $t('Logout') }}</span>
            </button>
        </template>
        <template v-else>
            <NuxtLink class="login-container" to="/login">
                <span class="login-button">{{ $t('Login') }}</span>
            </NuxtLink>
        </template>
    </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            me: state => state.me
        })
    },
    methods: {
        logout () {
            this.$cookies.remove('token')
            localStorage.removeItem('token')
            this.$store.commit('SetMe', { id: 0 })

            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
a {
    color: black;
    text-decoration: none;
}

.header-container {
    position: relative;
    display: block;
    height: 55px;
    background: #FFFFFF;
    border-radius: 0 0 8px 8px;
    margin-bottom: 8px;
}

.header-logo {
    position: relative;
    display: block;
    padding: 5px 0 14px 29px;
}

.login-button {
    color: #fff;
    padding: 5px 15px 5px 15px;
    border-radius: 5px;
    font-family: 'Montserrat-Light', Verdana, sans-serif;
    font-size: 14px;
    background-color: #c4c4c4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-text-decoration: dotted;
    text-decoration: dotted;
    white-space: nowrap;
    -webkit-transition: background-color 0.5s;
    transition: background-color 0.5s;
}

.login-container {
    cursor: pointer;
    position: absolute;
    display: block;
    top: 50%;
    right: 12px;
    -webkit-transform: translateY(-65%);
    transform: translateY(-65%);
}
</style>
