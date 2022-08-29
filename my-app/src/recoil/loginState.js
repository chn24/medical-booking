import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'login', // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
})

export const loginState = atom({
  key: 'loginS',
  default: {
    login: false,
    id: null,
    roll: null,
  },
  effects_UNSTABLE: [persistAtom],
})
