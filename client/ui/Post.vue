<template>
<div class="post">
  <div class="message">{{data.message}}<a @click="removePost" class="action">x</a></div>
</div>
</template>

<script>
export default {
  props: [ 'data' ],
  methods: {
    removePost() {
      Meteor.call('posts.remove', this.data._id)
    }
  }
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
