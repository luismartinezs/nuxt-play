<template lang="pug">
div
  //- MinimalToggle
  CollapsibleFilters(:countries="countries")
</template>

<script>
import countries from "@/data/countries";

export default {
  name: 'IndexPage',
  data () {
    return {
      countries,
    }
  },
  async mounted () {
    // mock fetch request that returns countries
    const fetchCountries = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(countries);
        }, 500);
      });

    this.countries = await fetchCountries();
  }
}
</script>
