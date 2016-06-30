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
      <form @submit.prevent="createPost">
        <input v-model="newPostMessage" placeholder="Type new message" required/>
      </form>

      <!-- Posts -->
      <post v-for="post in posts" :data="post"></post>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newPostMessage: '' // Vue data
    }
  },
  // Vuex-specific options
  vuex({forum}) {
    return {
      trackers: {
        selectedThread: forum.trackers.getSelectedThread,
        posts: forum.trackers.getPosts
      }
    }
  },
  methods: {
    createPost () {
      // Meteor method call
      Meteor.call('posts.create', this.selectedThread._id, this.newPostMessage, (err, post_id) => {
        if(err) {
          alert('An error occured while creating post.');
          console.error(err);
        } else {
          this.newPostMessage = '';
        }
      })
    },
    removeThread () {
      // Meteor method call
      Meteor.call('threads.remove', this.selectedThread._id);
    }
  }
}
</script>
