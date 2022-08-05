import { atom } from 'recoil'

export const dataState = atom({
  key: 'dataState',
  default: {
    information: {},
    roll: '',
    schedule: {
      value: [],
      full: [],
      morning: [],
      afternoon: [],
    },
    booking: [],
  },
})
