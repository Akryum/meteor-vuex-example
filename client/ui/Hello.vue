<template>
<div class="hello">
  <h1>Hello {{name}}</h1>
  <input v-model="nameInput" placeholder="Enter your name" />
</div>
</template>

<script>
export default {
  vuex: root => ({
    getters: root.getters,
    actions: root.actions
  }),
  computed: {
    nameInput: {
      get() {
        return this.name
      },
      set(val) {
        this.setName(val)
      }
    }
  }
}
</script>

<style scoped lang="less">
.hello {
  margin-bottom: 32px;

  h1 {
    margin-bottom: 12px;
  }
}
</style>
