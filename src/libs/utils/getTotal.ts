export const getTotal = (entryList: Entry[]) => {
  let amount = 0
  entryList.forEach(entry => (amount += entry.amount))

  return amount
}
