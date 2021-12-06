<template>
    <div style="display: block;">
        <NuxtLink to="/users">
            Users
        </NuxtLink>
        <br>
        <NuxtLink to="/about">
            about project
        </NuxtLink>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    head () {
        return {
            title: 'Only One - Свободная социальная сеть',
            description: 'Социальная сеть с открытым исходным кодом ',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: 'Only One - Свободная социальная сеть'
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    content: 'https://only-one.su/img/OnlyOneSocial.png'
                }
            ]
        }
    }
})
</script>
