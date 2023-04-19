<template>
  <div>
    <button @click="toggleList">Toggle List</button>
    <transition name="list-transition" mode="out-in">
      <div v-show="listExpanded" ref="listContainer" class="list-container">
        <li v-for="item in data" :key="item.id">
          {{ item.name }}
        </li>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SmoothTransition',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      listExpanded: false
    }
  },
  mounted() {
    this.updateListMaxHeight();
  },
  updated() {
    this.updateListMaxHeight();
  },
  methods: {
    updateListMaxHeight() {
      this.$nextTick(() => {
        const listContainer = this.$refs.listContainer
        listContainer.style.maxHeight = `${listContainer?.scrollHeight}px`;
      });
    },
    toggleList() {
      this.listExpanded = !this.listExpanded;
    }
  },
}
</script>

<style>
.list-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.list-transition-enter,
.list-transition-leave-to {
  max-height: 0;
}

.list-transition-enter-to,
.list-transition-leave {
  max-height: 500px;
  /* Set this value to accommodate the maximum height of the list */
}
</style>