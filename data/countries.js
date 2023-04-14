export default [
  {
    id: 1,
    name: 'Country A',
    expanded: true,
    destinations: [
      {
        id: 1,
        name: 'Destination A1',
        expanded: true,
        zones: [
          { id: 1, name: 'Zone A1-1' },
          { id: 2, name: 'Zone A1-2' },
        ],
      },
      {
        id: 2,
        name: 'Destination A2',
        expanded: true,
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
    expanded: true,
    destinations: [
      {
        id: 3,
        name: 'Destination B1',
        expanded: true,
        zones: [
          { id: 5, name: 'Zone B1-1' },
          { id: 6, name: 'Zone B1-2' },
        ],
      },
      {
        id: 4,
        name: 'Destination B2',
        expanded: true,
        zones: [
          { id: 7, name: 'Zone B2-1' },
          { id: 8, name: 'Zone B2-2' },
        ],
      },
    ],
  },
]