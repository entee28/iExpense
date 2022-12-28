export const getTotal = (entryList: Entry[]) => {
  let amount = 0
  entryList.forEach(entry => (amount += entry.amount))

  return amount
}

export const getDiff = (entryList: Entry[]) => {
  let amount = 0
  entryList.forEach(entry => {
    if (entry.type === 'expense') {
      amount -= entry.amount
    } else if (entry.type === 'income') {
      amount += entry.amount
    }
  })

  return amount
}
