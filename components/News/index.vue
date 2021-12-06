<template>
    <div id="posts">
        <template v-for="(post,index) in posts">
            <NewsPost :key="index" :post="post" />
        </template>
    </div>
</template>
<script>
export default {
    props: {
        posts: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        }

    }
}
</script>
