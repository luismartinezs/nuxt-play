<template lang="pug">
.collapsible-wrapper
  button.toggle-button(@click="toggleAll") {{ allExpanded ? '▼' : '►' }}

  transition-group(name="collapsible" tag="ul")
    li.country(v-for="country in countries", :key="country.id")
      .country-header
        button.toggle-country(@click="toggleCountry(country)") {{ country.expanded ? '▼' : '►' }}
        span {{ country.name }}

      transition(name="collapsible" v-if="country.expanded")
        ul.destination-list
          li.destination(v-for="destination in country.destinations", :key="destination.id")
            .destination-header
              button.toggle-destination(@click="toggleDestination(destination)") {{ destination.expanded ? '▼' : '►' }}
              span {{ destination.name }}

            transition(name="collapsible" v-if="destination.expanded")
              ul.zone-list
                li.zone(v-for="zone in destination.zones", :key="zone.id") {{ zone.name }}
</template>

<script>
export default {
  data() {
    return {
      allExpanded: false,
      countries: [
  {
    id: 1,
    name: 'Country A',
    expanded: false,
    destinations: [
      {
        id: 1,
        name: 'Destination A1',
        expanded: false,
        zones: [
          { id: 1, name: 'Zone A1-1' },
          { id: 2, name: 'Zone A1-2' },
        ],
      },
      {
        id: 2,
        name: 'Destination A2',
        expanded: false,
        zones: [
          { id: 3, name: 'Zone A2-1' },
          { id: 4, name: 'Zone A2-2' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Country B',
    expanded: false,
    destinations: [
      {
        id: 3,
        name: 'Destination B1',
        expanded: false,
        zones: [
          { id: 5, name: 'Zone B1-1' },
          { id: 6, name: 'Zone B1-2' },
        ],
      },
      {
        id: 4,
        name: 'Destination B2',
        expanded: false,
        zones: [
          { id: 7, name: 'Zone B2-1' },
          { id: 8, name: 'Zone B2-2' },
        ],
      },
    ],
  },
],

    };
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
.collapsible-enter-active,
.collapsible-leave-active {
  transition: all 0.5s ease;
}

.collapsible-enter,
.collapsible-leave-to {
  height: 0;
  opacity: 0;
}
</style>
