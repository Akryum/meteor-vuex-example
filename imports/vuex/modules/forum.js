import {StoreSubModule} from 'meteor/akryum:vuex';

const subModule = new StoreSubModule('forum');

subModule.addState({
  sortDate: -1,
  selectedThreadId: null
});

subModule.addGetters({
  sortDate: state => state.sortDate,
  selectedThreadId: sate => sate.selectedThreadId
});

subModule.addMutations({
  FORUM_SORT_DATE(state, order) {
    state.sortDate = order;
  },
  FORUM_SELECTED_THREAD_ID(state, id) {
    state.selectedThreadId = id;
  }
});

subModule.addActions({
  toggleSortDate({store, state}) {
    // state is immutable
    store.dispatch('FORUM_SORT_DATE', -1*state.sortDate);
  },
  selectThread({store}, id) {
    // state is immutable
    store.dispatch('FORUM_SELECTED_THREAD_ID', id);
  },
  createThread(_, name) {
    return this.callMethod('threads.create', name, (err, result) => {
      if(err) {
        console.error(err);
      } else {
        // Call another action on the submodule
        this.actions.selectThread(result);
      }
    });
  },
  removeThread ({state}) {
    return this.callMethod('threads.remove', state.selectedThreadId);
  },
  createPost ({state}, msg) {
    return this.callMethod('posts.create', state.selectedThreadId, msg)
  },
  removePost(_, id) {
    return this.callMethod('posts.remove', id)
  }
});

// Meteor integration

// Import a meteor collection
import {Threads, Posts} from '/imports/api/collections';

// Add trackers to the store module
subModule.addTrackers({
  // Name of the tracker
  threads() {
    // Context variables
    let sub;

    // You can execute arbitrary code here

    return {
      // Initialize the meteor data
      init(data) {
        data.threads = []
      },
      // When the tracker is being used
      activate() {
        // Subscribe to the publication
        sub = Meteor.subscribe('threads');
      },
      // When the tracker is no longer used
      deactivate() {
        // Stop the subscription
        sub.stop();
      },
      // Watch store changes
      // State is relative to the module
      watch(state) {
        // state is immutable
        return {
          sortDate: state.sortDate
        }
      },
      // Update the meteor data
      // Data is relative to the module
      update(data, {sortDate}) {
        // Meteor data query
        let threads = Threads.find({}, {
          sort: {date: sortDate}
        }).fetch();

        // Update the module meteor data
        data.threads = Object.freeze(threads);
      },
      // Getters
      // These are computed properties and are cached by vue
      getters: {
        // Getters should follow the get<Name> naming convention
        getThreads(data) {
          return data.threads;
        }
      },
      // If true, the tracker will be activated right away
      // Else, you need to add it on a vue component or call tracker.addClient()
      isActivated: false
    }
  },
  selectedThread() {
    let sub;
    return {
      init(data) {
        data.selectedThread = null;
        data.posts = [];
      },
      watch(state) {
        // Dynamic subscription
        if(sub) {
          sub.stop();
        }
        if(state.selectedThreadId) {
          sub = Meteor.subscribe('posts', state.selectedThreadId);
          console.log('subscribed posts to thread ', state.selectedThreadId);
        }

        return {
          id: state.selectedThreadId
        }
      },
      update(data, {id}) {
        data.selectedThread = Object.freeze(Threads.findOne({
          _id: id
        }));
        data.posts = Object.freeze(Posts.find({
          thread_id: id
        }, {
          sort: {created: -1}
        }).fetch());
        console.log('posts', data.posts);
      },
      getters: {
        getSelectedThread: data => data.selectedThread,
        getPosts: data => data.posts
      }
    }
  }
});

export default subModule;
