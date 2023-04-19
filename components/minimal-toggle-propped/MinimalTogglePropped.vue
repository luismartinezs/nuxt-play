<template lang="pug">
.collapsible-wrapper
  button.toggle-button(@click="toggle") {{ expanded ? '▼' : '►' }}
  .collapsible-content(ref="content" v-bind:style="{ maxHeight: expanded ? `${contentHeight}px` : '0' }")
    slot
    //- ul
      li(v-for="item in data", :key="item.id") {{ item.name }}
</template>

<script>
export default {
  name: 'MinimalTogglePropped',

  props: {
    data: {
      type: Array,
      default: () => null,
    },
  },

  data() {
    return {
      expanded: true,
      contentHeight: 0,
    };
  },
  watch: {
    expanded() {
      this.contentHeight = this.$refs.content.scrollHeight;
    },
    data(newVal) {
      if (newVal) {
        this.contentHeight = this.$refs.content.scrollHeight;
      }
    },
    contentHeight(newVal) {
      console.debug(this.$el.dataset.key);
      console.debug('new contentHeight', newVal);
      this.$emit('onHeightChange', newVal)
    },
  },
  mounted() {
    this.contentHeight = this.$refs.content.scrollHeight;
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    },
  }
};
</script>

<style scoped>
li {
  list-style: none;
}

.collapsible-wrapper {
  border-radius: 10px;
  box-shadow: 0 0 24px 0 rgba(41, 44, 51, .2);
  position: relative;
  max-height: 5000px;
  transition: all .5s ease;
  overflow: hidden;
  padding: 4px;

}

.toggle-button {
  border-radius: 5px;
  border: none;
  width: 100%;
  text-align: left;
  padding: 6px 10px;
}

.collapsible-content {
  transition: max-height .5s ease;
  overflow: hidden;
}</style>
