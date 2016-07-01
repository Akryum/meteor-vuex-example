<template>
  <div class="app">
    <h1>Forum ({{count}})</h1>
    <form @submit.prevent="handleCreateThread">
      <input v-model="newThreadName" placeholder="Type new thread name" required/>
    </form>

    <thread-item v-for="thread in threads" :data="thread" :selected="thread._id === selectedThreadId" @select="selectThread(thread._id)"></thread-item>

    <hr />

    <selected-thread></selected-thread>
  </div>
</template>

<script>
export default {
  data: () => ({
    // Vue data
    newThreadName: ''
  }),
  computed: {
    count () {
      return this.threads.length;
    }
  },
  // Vuex options
  vuex: ({forum}) => ({
    trackers: {
      threads: forum.trackers.getThreads
    },
    getters: {
      selectedThreadId: forum.getters.selectedThreadId
    },
    actions: {
      selectThread: forum.actions.selectThread,
      createThread: forum.actions.createThread
    }
  }),
  methods: {
    handleCreateThread () {
      this.createThread(this.newThreadName).then(() => {
        this.newThreadName = '';
      }).catch((e) => {
        alert('An error occured while creating thread.');
      });
    }
  },
}
</script>
