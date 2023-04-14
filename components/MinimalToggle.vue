<template lang="pug">
.collapsible-wrapper
  button.toggle-button(@click="toggle") {{ expanded ? '▼' : '►' }}

  .collapsible-content(ref="content" v-bind:style="{ maxHeight: expanded ? `${contentHeight}px` : '0' }")
    ul
      li Item 1
      li Item 2
      li Item 3
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      contentHeight: 0,
    };
  },
  mounted() {
    this.contentHeight = this.$refs.content.scrollHeight;
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
.collapsible-wrapper {
  overflow: hidden;
  border: 1px solid #ccc;
}
.collapsible-content {
  transition: max-height .5s ease;
  overflow: hidden;
}
</style>
