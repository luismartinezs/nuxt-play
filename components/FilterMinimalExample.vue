<template>
  <div class="wrapper">
    <div class="collapsible-container card">
      <div class="toggle-btn">
        <span>Toggle</span>
        <button @click="toggleAll">{{ allExpanded ? '▼' : '►' }}</button>
        <span>{{ getParentHeight() }}</span>
      </div>
      <ul ref="parent" class="collapsible-content" :style="{ height: getParentHeight() + 'px' }">
        <li v-for="lvlOne in dataToList" :key="lvlOneKeys[lvlOne.name]">
          <div class="toggle-btn">
            <span>
              {{ lvlOne.name }}
            </span>
            <button @click="toggleExpansion(1, lvlOne)">{{ expandedLvlOne.includes(lvlOne.name) ? '▼' : '►' }}</button>
            <span>{{ getLvlOneHeight(lvlOne) }}</span>
          </div>
          <ul ref="lvlOne" class="collapsible-content" :style="{ height: getLvlOneHeight(lvlOne) + 'px' }">
            <li v-for="lvlTwo in lvlOne.lvlTwo" :key="lvlTwoKeys[lvlTwo.name]">
              <div class="toggle-btn">
                <span>{{ lvlTwo.name }}</span>
                <button @click="toggleExpansion(2, lvlTwo)">{{ expandedLvlTwo.includes(lvlTwo.name) ? '▼' : '►'
                }}</button>
                <span>{{ getLvlTwoHeight(lvlTwo) }}</span>
              </div>
              <ul ref="lvlTwo" class="collapsible-content" :style="{ height: getLvlTwoHeight(lvlTwo) + 'px' }">
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
        lvlThree: ['Green', 'Red', 'Yellow', 'Purple'],
      },
      {
        name: 'Grape',
        lvlThree: ['Green', 'Red'],
      },
      {
        name: 'Orange',
        lvlThree: ['Orange'],
      }
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
    ],
  },
];

export default {
  name: 'FilterMinimalExample',
  data() {
    return {
      currentData: [],
      dataToList: [],
      allExpanded: true,
      expandedLvlOne: [],
      expandedLvlTwo: [],
      parentHeight: 0,
      lvlOneHeight: null,
      lvlTwoHeight: null,
      lvlOneKeys: null,
      lvlTwoKeys: null
    }
  },
  watch: {
    currentData(newVal) {
      console.debug('currentData updated');
      this.allExpanded = true
      this.dataToList = JSON.parse(JSON.stringify(newVal))

      this.expandedLvlOne = this.dataToList.map(lvlOne => lvlOne.name)
      this.expandedLvlTwo = this.dataToList.map(lvlOne => lvlOne.lvlTwo.map(lvlTwo => lvlTwo.name)).flat(2)
      this.parentHeight = this.dataToList.reduce((acc, lvlOne) => (acc += HEIGHT), 0)
      this.updateLvlOneHeight()
      this.updateLvlTwoHeight()
      this.lvlOneKeys = this.dataToList.reduce((acc, lvlOne) => {
        acc[lvlOne.name] = Math.floor((Math.random() * 1e6))
        return acc
      }, {})
      this.lvlTwoKeys = this.dataToList.reduce((acc, lvlOne) => {
        lvlOne.lvlTwo.forEach(lvlTwo => {
          acc[lvlTwo.name] = Math.floor((Math.random() * 1e6))
        })
        return acc
      }, {})
    },
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
    updateLvlOneHeight() {
      this.lvlOneHeight = this.dataToList.reduce((acc, lvlOne) => {
        acc[lvlOne.name] = HEIGHT * lvlOne.lvlTwo.length
        return acc
      }, {})
    },
    updateLvlTwoHeight() {
      this.lvlTwoHeight = this.dataToList.reduce((acc, lvlOne) => {
        lvlOne.lvlTwo.forEach(lvlTwo => {
          acc[lvlTwo.name] = HEIGHT * lvlTwo.lvlThree.length
        })
        return acc
      }, {})
    },
    toggleAll() {
      this.allExpanded = !this.allExpanded
    },
    toggleExpansion(level, item) {
      const expandedList = level === 1 ? this.expandedLvlOne : this.expandedLvlTwo;
      if (expandedList.includes(item.name)) {
        expandedList.splice(expandedList.indexOf(item.name), 1);
      } else {
        expandedList.push(item.name);
      }
    },
    getParentHeight() {
      if (!this.allExpanded) {
        return 0
      }
      return this.parentHeight + this.dataToList.reduce((sum, lvlOne) => (sum += this.getLvlOneHeight(lvlOne)), 0)
    },
    getLvlOneHeight(lvlOne) {
      return this.expandedLvlOne.includes(lvlOne.name) ? (this.lvlOneHeight[lvlOne.name] + lvlOne.lvlTwo.reduce((sum, el) => (sum += this.getLvlTwoHeight(el)), 0)) : 0
    },
    getLvlTwoHeight(lvlTwo) {
      return this.expandedLvlTwo.includes(lvlTwo.name) ? this.lvlTwoHeight[lvlTwo.name] : 0
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0 0 0 1rem;
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