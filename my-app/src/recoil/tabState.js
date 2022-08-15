import { atom } from 'recoil'

export const tabState = atom({
  key: 'tabState',
  default: [
    {
      name: 'Home',
      to: '',
    },
  ],
})
