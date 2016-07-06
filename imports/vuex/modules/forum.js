import {StoreSubModule} from 'meteor/akryum:vuex';

const subModule = new StoreSubModule('forum');

const sortFields = ['date', 'name'];

subModule.addState({
  sortDirection: -1,
  sortField: sortFields[0]
});

subModule.addGetters({
  sortDirection: state => state.sortDirection,
  sortField: state => state.sortField
});

subModule.addMutations({
  FORUM_SORT_DIRECTION(state, direction) {
    state.sortDirection = direction;
  },
  FORUM_SORT_FIELD(state, field) {
    state.sortField = field;
  }
});

subModule.addActions({
  toggleSortDirection({store, state}) {
    // state is immutable
    store.dispatch('FORUM_SORT_DIRECTION', -1*state.sortDirection);
  },
  cycleSortField({store, state}) {
    // state is immutable
    let index = sortFields.indexOf(state.sortField) + 1;
    if(index === sortFields.length) {
      index = 0;
    }
    store.dispatch('FORUM_SORT_FIELD', sortFields[index]);
  }
});

// Meteor integration

// Import a meteor collection
import {Threads} from '/imports/api/collections';

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
          sortDirection: state.sortDirection,
          sortField: state.sortField
        }
      },
      // Update the meteor data
      // Data is relative to the module
      update(data, {sortDirection, sortField}) {
        // Meteor data query
        let threads = Threads.find({}, {
          sort: {
            [sortField]: sortDirection
          }
        }).fetch();

        // Update the module meteor data
        data.threads = Object.freeze(threads);
      },
      // Getters
      // These are computed properties and are cached by vue
      getters: {
        // Getters should follow the get<Name> naming convention
        getThreads: data => data.threads
      },
      // If true, the tracker will be activated right away
      // Else, you need to add it on a vue component or call tracker.addClient()
      isActivated: false
    }
  }
});


// Nested Submodule
import thread from './thread';
subModule.addModule(thread);

export default subModule;
