<template lang="pug">
div
  FilterMinimalExample
  //- SmoothTransition(:data="arr")
  //- MinimalToggle
  //- MinimalTogglePropped(:data="arr" data-key="l1")
  //-   ul
  //-     li(v-for="item in arr", :key="item.id")
  //-       MinimalTogglePropped(:data="arr" data-key="l2")
  //-         span {{ item.name }}
  //- CollapsibleFilters(:countries="countries")
  //- CollapsibleFiltersContainer(:countries="countries")
</template>

<script>
import countries from "@/data/countries";

const data = [
        {
          id: 1,
          name: 'Item 1'
        },
        {
          id: 2,
          name: 'Item 2'
        },
        {
          id: 3,
          name: 'Item 3'
        },
        {
          id: 4,
          name: 'Item 4'
        },
        {
          id: 5,
          name: 'Item 5'
        }
      ]

export default {
  name: 'IndexPage',
  data () {
    return {
      countries,
      arr: null
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

      const mockFetchData = (mockData) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockData);
          }, 500);
        });
      }

    this.countries = await fetchCountries();
    this.arr = await mockFetchData(data);
  }
}
</script>
