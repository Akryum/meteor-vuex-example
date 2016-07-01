import {StoreModule} from 'meteor/akryum:vuex';

const root = new StoreModule();

// Add some initial state
root.addState({
  name: 'world'
});

// Using centralized getters is good practice
// They are also cached by vue just like computed props
root.addGetters({
  name: state => state.name
});

// Only mutations can change the store state
root.addMutations({
  NAME(state, text) {
    state.name = text;
  }
});

// Using centralized actions is good practice
root.addActions({
  setName({store}, text) {
    // state is immutable
    store.dispatch('NAME', text);
  }
});

// Submodule
import forum from './modules/forum';
root.addModule(forum);

// Export the vuex native store
export const store = root.exportStore();
