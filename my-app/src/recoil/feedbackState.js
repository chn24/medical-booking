import { atom } from 'recoil'

export const feedbackState = atom({
  key: 'feedbackState',
  default: {
    canFeedback: false,
    information: {},
  },
})
