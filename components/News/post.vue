<template>
  <article v-if="post" style="background-color:#e1eae7; height:100px;position:relative;    margin-bottom: 10px;">
    <h3 style="font-size:15px;margin: 0;">
      <NuxtLink :to="`/user/${post.author}`">
        {{ post.author_username }}
      </NuxtLink>
      <div style="display: inline-block;padding-left: 65%;">
        <NuxtLink :to="`/post/${post.answerto}`">
          <span v-if="post.answerto!='00000000-0000-0000-0000-000000000000'" style="font-weight: normal; ">
            в ответ на пост
          </span>
        </NuxtLink>
      </div>
    </h3>
    <h3>
      <div style="font-size:14px;color:gray">
        <NuxtLink :to="`/post/${post.random_id}`">
          {{ post.time }}
        </NuxtLink>
      </div>
    </h3>
    <p style="margin: 0;">
      {{ post.text }}
    </p><div style="position:absolute;bottom:0;display: flex;flex-direction: row;width: 100%;">
      <div style="width: 50%;">
        {{ post.Likes }} {{ $t('LikePost') }}
      </div>
      <div style="width: 50%;text-align: right;" @click="$router.push(`/post/${post.random_id}/?answer`)">
        {{ $t('AnswerPost') }}({{ post.answercount }})
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
