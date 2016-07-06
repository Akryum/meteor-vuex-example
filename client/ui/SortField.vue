<template>
<div class="sort-field">
  <span class="field" @click="handleFieldClick">{{fieldDisplay}}</span>
  <span class="direction" @click="handleDirectionClick">{{directionDisplay}}</span>
</div>
</template>

<script>
export default {
  props: ['field', 'direction'],
  computed: {
    fieldDisplay() {
      let firstLetter = this.field.substr(0, 1).toLocaleUpperCase();
      return firstLetter + this.field.substr(1);
    },
    directionDisplay() {
      if(this.direction === -1) {
        return '▲';
      } else {
        return '▼';
      }
    }
  },
  methods: {
    handleFieldClick() {
      this.$emit('field');
    },
    handleDirectionClick() {
      this.$emit('direction');
    }
  }
}
</script>

<style scoped>
.sort-field {
  color: #999;
  cursor: default;
  user-select: none;
  padding: 12px;
}
</style>
