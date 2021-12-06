<template>
    <div class="page-container_main">
        <section class="page-container">
            <LayoutHeader v-if="$nuxt.$route.name!=='login'" />
            <section class="page-container__layout">
                <LayoutNav />
                <Nuxt class="page-container__content" />
            </section>
            <LayoutFooter v-if="$nuxt.$route.name!=='login'" />
        </section>
        <section v-if="modal.type" class="modal" @click.self="Close">
            <UserAvatarChangeModal
                v-if="modal.type === 'updateUserAvatar'"

                :avatar="'https://cdnsocial.katelinlis.xyz/public/clients/1/cc31b175288b869bd96c18fa2070f9cc.jpeg'"
            />
            <UserAvatarOpenAvatar
                v-if="modal.type === 'OpenUserAvatar'"

                :avatar="modal.data"
            />
        </section>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import devel from '~/plugins/devel'

export default {
    head () {
        return {
            bodyAttrs: {
                style: this.modal.type ? ' overflow: hidden;' : ''
            },
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1.0'
                },
                {
                    name: 'og:site_name',
                    hid: 'og:site_name',
                    content: 'Only one'
                },
                {
                    name: 'og:title',
                    hid: 'og:title',
                    content: 'Only one'
                }
            ]
        }
    },
    computed: {
        ...mapState({
            modal: state => state.modal

        })

    },
    beforeMount () {
        // this.getMe()
    },
    methods: {
        Close () {
            if (devel) {
                console.log(event)
            }
            this.$store.commit('SetModal', {
                type: '',
                data: {}
            })
        },
        async Update () {
            await this.getMe()
        },
        ...mapActions(['getMe'])
    }
}
</script>

<style scoped>
.modal {
    position: absolute;
    z-index: 1000;
    background-color: #80808085;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.page-container_main {
    position: relative;
    width: 100%;
    min-height: 100%;

}

.page-container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 80vw;
    min-height: 100%;

}

.page-container__layout {
    position: relative;
    display: flex;
    flex-grow: 1;
    align-self: stretch;
}

.page-container__layout * {
    display: flex;
    flex-grow: 1;
    align-items: stretch;
    overflow: auto;
}

.page-container__layout nav {
    flex-grow: 0;
    flex-shrink: 0;
    width: 13vw;
}

@media screen and (orientation: portrait) {
    .page-container {
        width: 100%;
    }

    .navsMenuDesktop {
        display: none;
    }

    .container {
        width: 100vw;
        left: 0;
    }

    .content {
        position: absolute;
        margin: 0 auto;
    }
}

.content {
    position: relative;
    margin-left: 1%;
    height: max-content;
    min-height: 700px;
    z-index: 1;
    width: 80%;
}

@media only screen and (max-width: 768px) {
    .content {
        left: unset;
        width: 100%;
    }
}

</style>

<style>
body {
    background: #F5F8FD;
}

* {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}

button {
    border-radius: 4px;
    margin: 4px 0;
    padding: 4px;
}

html, body, #__nuxt, #__layout {
    width: 100%;
    height: 100%;
}
</style>
