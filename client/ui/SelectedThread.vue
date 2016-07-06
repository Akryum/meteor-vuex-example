<template>
  <div class="thread">
    <template v-if="selectedThread">
      <!-- Thread title -->
      <h2>{{selectedThread.name}}</h2>

      <!-- Actions -->
      <div class="actions">
        <a @click="removeThread">Delete thread</a>
      </div>

      <!-- New post form -->
      <form @submit.prevent="handleCreatePost">
        <input v-model="newPostMessage" placeholder="Type new message" required/>
      </form>

      <!-- Posts -->
      <post v-for="post in posts" :data="post"></post>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    newPostMessage: '' // Vue data
  }),
  // Vuex-specific options
  vuex: ({forum}) => ({
    trackers: {
      selectedThread: forum.thread.trackers.getSelectedThread,
      posts: forum.thread.trackers.getPosts
    },
    actions: {
      createPost: forum.thread.actions.createPost,
      removeThread: forum.thread.actions.removeThread
    }
  }),
  methods: {
    handleCreatePost () {
      this.createPost(this.newPostMessage).then(() => {
        this.newPostMessage = '';
      }).catch((e) => {
        alert('An error occured while creating post.');
      });
    }
  }
}
</script>
