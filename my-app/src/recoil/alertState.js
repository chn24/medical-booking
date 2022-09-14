import { atom } from 'recoil'

export const alertState = atom({
  closeBtn: false,
  open: false,
  key: 'alertState',
  default: {
    type: 'info',
    information: {},
  },
})
