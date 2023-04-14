<template lang="pug">
.collapsible-wrapper
  button.toggle-button(@click="toggleAll") {{ allExpanded ? '▼' : '►' }}

  ul.country-list
    li.country(v-for="(country, cIndex) in countries", :key="country.id")
      .country-header
        button.toggle-country(@click="toggleCountry(country)") {{ country.expanded ? '▼' : '►' }}
        span {{ country.name }}

      .collapsible-content(v-bind:style="{ maxHeight: country.expanded ? `${country.contentHeight}px` : '0' }", ref="countryContent")
        ul.destination-list
          li.destination(v-for="(destination, dIndex) in country.destinations", :key="destination.id")
            .destination-header
              button.toggle-destination(@click="toggleDestination(destination)") {{ destination.expanded ? '▼' : '►' }}
              span {{ destination.name }}

            .collapsible-content(v-bind:style="{ maxHeight: destination.expanded ? `${destination.contentHeight}px` : '0' }", ref="destinationContent")
              ul.zone-list
                li.zone(v-for="zone in destination.zones", :key="zone.id") {{ zone.name }}
</template>

<script>
import countries from "@/data/countries";

export default {
  data() {
    return {
    allExpanded: true,
    countries
    };
  },
  mounted() {
    this.countries.forEach((country, cIndex) => {
      this.$set(country, "contentHeight", 0);
      this.$nextTick(() => {
        country.contentHeight = this.$refs.countryContent[cIndex].scrollHeight;
      });

      country.destinations.forEach((destination, dIndex) => {
        this.$set(destination, "contentHeight", 0);
        this.$nextTick(() => {
          destination.contentHeight = this.$refs.destinationContent[dIndex].scrollHeight;
        });
      });
    });
  },
  methods: {
    toggleAll() {
      this.allExpanded = !this.allExpanded;
      this.countries.forEach((country) => {
        country.expanded = this.allExpanded;
        country.destinations.forEach((destination) => {
          destination.expanded = this.allExpanded;
        });
      });
    },
    toggleCountry(country) {
      country.expanded = !country.expanded;
    },
    toggleDestination(destination) {
      destination.expanded = !destination.expanded;
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