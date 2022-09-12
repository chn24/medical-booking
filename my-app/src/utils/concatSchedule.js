export function concatSchedule(full, morning, afternoon) {
  let fullArr = [...full]
  let morningArr = [...morning]
  let afternoonArr = [...afternoon]
  let valueArr = []
  for (let key in fullArr) {
    let data = {
      date: fullArr[key],
      time: 'Full',
      id: valueArr.length + 1,
    }
    valueArr.splice(valueArr.length, 0, data)
  }

  for (let key in morningArr) {
    let data = {
      date: morningArr[key],
      time: 'Morning',
      id: valueArr.length + 1,
    }
    valueArr.splice(valueArr.length, 0, data)
  }

  for (let key in afternoonArr) {
    let data = {
      date: afternoonArr[key],
      time: 'Afternoon',
      id: valueArr.length + 1,
    }
    valueArr.splice(valueArr.length, 0, data)
  }
  return valueArr
}

// folder name --> utils
