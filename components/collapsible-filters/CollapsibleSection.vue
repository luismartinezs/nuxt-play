<template lang="pug">
.collapsible-wrapper
  button.toggle-button(@click="toggleContent") {{ expanded ? '▼' : '►' }}
  slot(name="header")

  .collapsible-content(v-bind:style="{ maxHeight: expanded ? `${contentHeight}px` : '0' }", ref="content")
    slot
</template>

<script>
export default {
  name: 'CollapsibleFilters',

  data() {
    return {
      expanded: true,
      contentHeight: 0
    }
  },

  async mounted() {
    await this.$nextTick();
    console.debug('scrollHeight', this.$refs.content.scrollHeight);
    console.debug('clientHeight', this.$refs.content.clientHeight);
    console.debug('offsetHeight', this.$refs.content.offsetHeight);
    this.contentHeight = this.$refs.content.scrollHeight;
  },

  methods : {
    toggleContent() {
      this.expanded = !this.expanded;
    }
  }
}
</script>

<style scoped>
.collapsible-wrapper {
  overflow: hidden;
  box-shadow: 0 0 12px 0 rgba(41, 44, 51, 0.2);
  padding: 5px;
  border: 1px solid #e0e0e0;
  margin: 10px;
  border-radius: 8px;
}

.collapsible-content {
  overflow: hidden;
  transition: max-height 0.5s ease;
}
</style>