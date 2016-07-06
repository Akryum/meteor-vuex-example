import { StoreSubModule } from 'meteor/akryum:vuex';

const subModule = new StoreSubModule('thread');

subModule.addState({
  selectedThreadId: null
});

subModule.addGetters({
  selectedThreadId: sate => sate.selectedThreadId
});

subModule.addMutations({
  FORUM_SELECTED_THREAD_ID(state, id) {
    state.selectedThreadId = id;
  }
});

subModule.addActions({
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

// Import meteor collections
import {Threads, Posts} from '/imports/api/collections';

subModule.addTrackers({
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
})

export default subModule;
