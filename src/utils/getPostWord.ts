export const getPostWord = (count: number) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'постів'
  }

  if (lastDigit === 1) {
    return 'пост'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'пости'
  }

  return 'постів'
}
