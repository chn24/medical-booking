import { atom } from 'recoil'

export const bookingState = atom({
  closeBtn: false,
  open: false,
  key: 'bookingState',
  default: {
    customer: {
      title: null,
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      phoneNumber: '',
    },
    booking: {
      doctorName: {
        value: null,
        isChoosen: false,
        error: false,
      },
      date: {
        value: null,
        day: '',
        month: '',
        year: '',
        isChoosen: false,
        error: null,
      },
      time: {
        value: null,
        isChoosen: false,
        error: false,
      },
      doctorTimes: ['Morning', 'Afternoon'],
      morning: [],
      afternoon: [],
      full: [],
    },
  },
})
