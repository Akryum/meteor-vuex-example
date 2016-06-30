<template>
  <div class="app">
    <h1>Forum ({{count}})</h1>
    <form @submit.prevent="createThread">
      <input v-model="newThreadName" placeholder="Type new thread name" required/>
    </form>

    <thread-item v-for="thread in threads" :data="thread" :selected="thread._id === selectedThreadId" @select="selectThread(thread._id)"></thread-item>

    <hr />

    <selected-thread></selected-thread>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // Vue data
      newThreadName: ''
    }
  },
  computed: {
    count () {
      return this.threads.length;
    }
  },
  // Vuex options
  vuex({forum}) {
    return {
      trackers: {
        threads: forum.trackers.getThreads
      },
      getters: forum.getters,
      actions: forum.actions
    }
  },
  methods: {
    createThread () {
      // Meteor method call
      Meteor.call('threads.create', this.newThreadName, (err, thread_id) => {
        if(err) {
          alert('An error occured while creating thread.');
          console.error(err);
        } else {
          this.newThreadName = '';
          this.selectThread(thread_id);
        }
      })
    }
  },
}
</script>
