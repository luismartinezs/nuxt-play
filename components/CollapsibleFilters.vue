<template lang="pug">
.collapsible-wrapper
  button.toggle-button(@click="toggleAll") {{ allExpanded ? '▼' : '►' }}

  .collapsible-content(v-bind:style="{ maxHeight: allExpanded ? `${allContentHeight}px` : '0' }", ref="allContent")
    ul.country-list
      li.country(v-for="country in currentCountries", :key="country.id")
        .country-header
          button.toggle-country(@click="toggleCountry(country)") {{ country.expanded ? '▼' : '►' }}
          span {{ country.name }}

        .collapsible-content(v-bind:style="{ maxHeight: country.expanded ? `${country.contentHeight}px` : '0' }", ref="countryContent")
          ul.destination-list
            li.destination(v-for="destination in country.destinations", :key="destination.id")
              .destination-header
                button.toggle-destination(@click="toggleDestination(destination)") {{ destination.expanded ? '▼' : '►' }}
                span {{ destination.name }}

              .collapsible-content(v-bind:style="{ maxHeight: destination.expanded ? `${destination.contentHeight}px` : '0' }", ref="destinationContent")
                ul.zone-list
                  li.zone(v-for="zone in destination.zones", :key="zone.id") {{ zone.name }}
</template>

<script>
export default {
  name: 'CollapsibleFilters',
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      allExpanded: true,
      allContentHeight: 0,
      currentCountries: []
    };
  },
  created() {
    this.currentCountries = JSON.parse(JSON.stringify(this.countries));
  },
  mounted() {
    this.allContentHeight = this.$refs.allContent.scrollHeight;

    this.currentCountries.forEach((country) => {
      country.expanded = true;
      country.contentHeight = this.calculateContentHeight(this.$refs.countryContent, this.currentCountries.indexOf(country));
      country.destinations.forEach((destination, dIndex) => {
        destination.expanded = true;
        destination.contentHeight = this.calculateContentHeight(this.$refs.destinationContent, country.destinations.indexOf(destination));
        destination.parentDestinations = country.destinations;
      });
    });
  },
  methods: {
    calculateContentHeight(ref, index) {
      return ref[index] ? ref[index].scrollHeight : 0;
    },
    toggleAll() {
      this.allExpanded = !this.allExpanded;
    },
    toggleCountry(country) {
      country.expanded = !country.expanded;
      country.contentHeight = this.calculateContentHeight(this.$refs.countryContent, this.currentCountries.indexOf(country));
    },
    toggleDestination(destination) {
      destination.expanded = !destination.expanded;
      destination.contentHeight = this.calculateContentHeight(this.$refs.destinationContent, destination.parentDestinations.indexOf(destination));
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