<template>
  <article v-if="post" style="background-color:#FFFFFF; min-height:150px;position:relative;    margin-bottom: 10px;padding-top:16px;padding-left:13px;padding-right:21px">
    <div style="display:flex;justify-content: space-between;">
      <div style="display:flex">
        <img
          data-v-398b3732=""
          height="32px"
          width="32px"
          alt="user avatar"
          src="https://cdnsocial.katelinlis.xyz/public/UserProfileImage.svg"
          style="border-radius: 100%;"
        >
        <div>
          <h3 style="font-size:15px;margin: 0;">
            <NuxtLink :to="`/user/${post.author}`">
              {{ post.author_username }}
            </NuxtLink>
          </h3>
          <h3>
            <div style="font-size:14px;color:gray">
              <NuxtLink :to="`/post/${post.random_id}`">
                {{ post.time }}
              </NuxtLink>
            </div>
          </h3>
        </div>
      </div>
      <div>
        <div style="display: inline-block;padding-left: 0px">
          <NuxtLink :to="`/post/${post.answerto}`">
            <span v-if="post.answerto!='00000000-0000-0000-0000-000000000000'" style="font-weight: normal; ">
              в ответ на пост
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <p style="margin: 0;">
      {{ post.text }}
    </p><div style="position:absolute;bottom:0;display: flex;flex-direction: row;width: 100%;justify-content: space-between;">
      <div style="">
        {{ post.Likes }} {{ $t('LikePost') }}
      </div>
      <div style="padding-right:21px" @click="$router.push(`/post/${post.random_id}/?answer`)">
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
