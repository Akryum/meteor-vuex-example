<template>
  <div class="app">
    <h1>Forum ({{count}})</h1>
    <form @submit.prevent="handleCreateThread">
      <input v-model="newThreadName" placeholder="Type new thread name" required/>
    </form>

    <sort-field :field="sortField" :direction="sortDirection" @field="cycleSortField" @direction="toggleSortDirection"></sort-field>

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
      selectedThreadId: forum.thread.getters.selectedThreadId,
      ...forum.getters
    },
    actions: {
      selectThread: forum.thread.actions.selectThread,
      createThread: forum.thread.actions.createThread,
      ...forum.actions
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
