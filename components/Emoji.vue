<template>
    <div id="app">
        <client-only>
            <VEmojiPicker @select="selectEmoji" />
        </client-only>
    </div>
</template>

<script>
import { VEmojiPicker } from 'v-emoji-picker'

export default {
    name: 'Demo',
    components: {
        VEmojiPicker
    },
    props: {
        select: {
            type: Function,
            default: () => {
            }
        }
    },
    data: () => ({}),
    methods: {
        selectEmoji (emoji) {
            console.log(emoji)
            this.select(emoji)
        }
    }
}
</script>
