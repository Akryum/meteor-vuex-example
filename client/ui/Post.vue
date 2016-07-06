<template>
<div class="post">
  <div class="message">{{data.message}}<a @click="removePost(data._id)" class="action">x</a></div>
</div>
</template>

<script>
export default {
  props: [ 'data' ],
  vuex: ({forum}) => ({
    actions: {
      removePost: forum.thread.actions.removePost
    }
  })
}
</script>

<!-- Project path test -->
<style scoped lang="less">
// Import
@import "~imports/ui/mixins.less";

a {
  text-decoration: underline;
}

.post {
  margin: 6px 0;

  .message {
    // Mixin
    .padding(12px);
    .border-radius(3px);
  }
}
</style>
