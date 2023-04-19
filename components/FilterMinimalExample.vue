<template>
  <div class="wrapper">
    <div class="collapsible-container card">
      <div class="toggle-btn">
        <span>Toggle</span>
        <button @click="toggleAll">{{ allExpanded ? '▼' : '►' }}</button>
      </div>
      <ul ref="parent" class="collapsible-content" :style="{ height: parentHeight }">
        <li v-for="lvlOne in dataToList" :key="lvlOne.name">
          <div class="toggle-btn">
            <span>
              {{ lvlOne.name }}
            </span>
            <button @click="toggleLvlOne(lvlOne)">{{ lvlOne.expanded ? '▼' : '►' }}</button>
          </div>
          <ul ref="lvlOne" class="collapsible-content" :style="{ height: lvlOne.expanded ? lvlOne.contentHeight : 0 }">
            <li v-for="lvlTwo in lvlOne.lvlTwo" :key="lvlTwo.name">
              <div class="toggle-btn">
                <span>{{ lvlTwo.name }}</span>
                <button @click="toggleLvlTwo(lvlTwo)">{{ lvlTwo.expanded ? '▼' : '►' }}</button>
              </div>
              <ul ref="lvlTwo" class="collapsible-content" :style="{ height: lvlTwo.expanded ? lvlTwo.contentHeight : 0 }">
                <li v-for="lvlThree in lvlTwo.lvlThree" :key="lvlThree">
                  <div class="toggle-btn">
                    {{ lvlThree }}
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
const HEIGHT = 30
const data = [
  {
    name: 'Fruit',
    lvlTwo: [
      {
        name: 'Banana',
        lvlThree: ['Yellow', 'Orange', 'Red'],
      },
      {
        name: 'Apple',
        lvlThree: ['Green', 'Red', 'Yellow'],
      },
      {
        name: 'Grape',
        lvlThree: ['Green', 'Red', 'Black'],
      },
    ],
  },
  {
    name: 'Vegetable',
    lvlTwo: [
      {
        name: 'Carrot',
        lvlThree: ['Orange', 'Purple', 'Yellow'],
      },
      {
        name: 'Pepper',
        lvlThree: ['Green', 'Red', 'Yellow'],
      },
      {
        name: 'Tomato',
        lvlThree: ['Red', 'Yellow', 'Orange'],
      },
    ],
  },
  {
    name: 'Nut',
    lvlTwo: [
      {
        name: 'Almond',
        lvlThree: ['Brown', 'Light Brown'],
      },
      {
        name: 'Walnut',
        lvlThree: ['Brown'],
      },
      {
        name: 'Peanut',
        lvlThree: ['Brown', 'Light Brown'],
      },
    ],
  },
];

export default {
  name: 'FilterMinimalExample',
  data () {
    return {
      currentData: [],
      dataToList: [],
      allExpanded: true,
      parentHeight: 0
    }
  },
  watch: {
    currentData (newVal) {
      this.allExpanded = true
      this.dataToList = JSON.parse(JSON.stringify(newVal))
      this.dataToList.forEach((_lvlOne) => {
        _lvlOne.expanded = true
        _lvlOne.contentHeight = HEIGHT * _lvlOne.lvlTwo.length
        _lvlOne.lvlTwo.forEach(_lvlTwo => {
          _lvlTwo.expanded = true
          _lvlTwo.contentHeight = HEIGHT * _lvlTwo.lvlThree.length
        })
      })

      this.$nextTick(() => {
        this.parentHeight = this.getParentHeight()
      })
    },
    allExpanded () {
      this.parentHeight = this.getParentHeight()
    }
  },
  async mounted() {
    const fetchData = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 500);
      });

      this.currentData = await fetchData();
  },
  methods: {
    toggleAll() {
      this.allExpanded = !this.allExpanded
    },
    toggleLvlOne (lvlOne) {
      lvlOne.expanded = !lvlOne.expanded
    },
    toggleLvlTwo (lvlTwo) {
      lvlTwo.expanded = !lvlTwo.expanded
    },
    getParentHeight () {
      if (!this.allExpanded) {
        return 0
      }
      return this.$refs.parent?.scrollHeight + 'px'
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0 0 1rem 1rem
}
li {
  list-style: none;
}
.wrapper {
  margin: 1rem;
  font-family: sans-serif;
}
.card {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
}
.collapsible-container {
  max-height: 5000px;
  transition: all .5s ease;
  overflow: hidden;
}
.collapsible-content {
  transition: all .5s ease;
  overflow: hidden;
}

.toggle-btn {
  height: 30px;
}
</style>