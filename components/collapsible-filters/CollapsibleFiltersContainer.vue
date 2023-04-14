<template lang="pug">
CollapsibleSection
  ul
    li(v-for="country in currentCountries", :key="country.id")
      CollapsibleSection
        template(v-slot:header)
          span {{ country.name }}
        ul
          li(v-for="destination in country.destinations", :key="destination.id")
            CollapsibleSection
              template(v-slot:header)
                span {{ destination.name }}
              ul
                li(v-for="zone in destination.zones", :key="zone.id") {{ zone.name }}
</template>

<script>
export default {
  name: 'CollapsibleFiltersContainer',
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentCountries: []
    };
  },

  created() {
    this.currentCountries = JSON.parse(JSON.stringify(this.countries));
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>