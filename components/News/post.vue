<template>
  <article v-if="post" style="background-color:#e1eae7; height:100px;position:relative;    margin-bottom: 10px;">
    <h3 style="font-size:15px;margin: 0;">
      <NuxtLink :to="`/user/${post.author}`">
        {{ post.author_username }}
      </NuxtLink>
      <div style="font-size:14px;color:gray">
        <NuxtLink :to="`/user/${post.author}/post/${post.random_id}`">
          {{ post.time }}
        </NuxtLink>
      </div>
    </h3><p style="margin: 0;">
      {{ post.text }}
    </p><div style="position:absolute;bottom:0;display: flex;flex-direction: row;width: 100%;">
      <div style="width: 50%;">
        {{ post.Likes }} {{ $t('LikePost') }}
      </div>
      <div style="width: 50%;text-align: right;" @click="$router.push(`/user/${post.author}/post/${post.random_id}/?answer`)">
        {{ $t('AnswerPost') }}
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => { return {} }
    }

  }
}
</script>
<style scoped>
a {
    color: unset;
    text-decoration: none;
}
</style>
