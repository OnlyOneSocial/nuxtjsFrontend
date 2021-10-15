<template>
  <div id="wall">
    <span>wall</span><div>
      <div>
        <textarea id="wallInput" name="" style="width:83%; max-width:83%; max-height:50px" /><button onclick="if (!window.__cfRLUnblockHandlers) return false; WallSend()">
          send
        </button>
      </div><div id="posts">
        <template v-for="post in posts">
          <article v-if="post" :key="post.Timestamp" style="background-color:#e1eae7; height:100px;position:relative;    margin-bottom: 10px;">
            <h3 style="font-size:15px;margin: 0;">
              <a href="/user/1">{{ post.author_name }}</a><div style="font-size:14px;color:gray">
                {{ post.time }}
              </div>
            </h3><p style="margin: 0;">
              {{ post.text }}
            </p><div style="position:absolute;bottom:0;display: flex;flex-direction: row;width: 100%;">
              <div style="width: 50%;">
                {{ post.Likes }} лайков
              </div><div style="width: 50%;text-align: right;">
                ответить
              </div>
            </div>
          </article>
        </template>
      </div>
    </div>
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
