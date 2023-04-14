<template lang="pug">
.collapsible-wrapper
  button.toggle-button(@click="toggleAll") {{ allExpanded ? '▼' : '►' }}

  .collapsible-content(v-bind:style="{ maxHeight: allExpanded ? `${allContentHeight}px` : '0' }", ref="allContent")
    ul.country-list
      li.country(v-for="country in countries", :key="country.id")
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
    };
  },
  mounted() {
    this.allContentHeight = this.$refs.allContent.scrollHeight;

    this.countries.forEach((country) => {
      country.expanded = true;
      country.contentHeight = this.calculateContentHeight(this.$refs.countryContent, this.countries.indexOf(country));
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
      // this.countries.forEach((country) => {
      //   country.expanded = this.allExpanded;
      //   country.contentHeight = this.calculateContentHeight(this.$refs.countryContent, this.countries.indexOf(country));
      //   country.destinations.forEach((destination) => {
      //     destination.expanded = this.allExpanded;
      //     destination.contentHeight = this.calculateContentHeight(this.$refs.destinationContent, country.destinations.indexOf(destination));
      //   });
      // });
    },
    toggleCountry(country) {
      country.expanded = !country.expanded;
      country.contentHeight = this.calculateContentHeight(this.$refs.countryContent, this.countries.indexOf(country));
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
}

.collapsible-content {
  overflow: hidden;
  transition: max-height 0.5s ease;
}
</style>