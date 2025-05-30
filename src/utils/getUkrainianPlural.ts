export const getUkrainianPlural = (number: number, word: string[]) => {
  const mod10 = number % 10
  const mod100 = number % 100

  if (mod10 === 1 && mod100 !== 11) {
    return `${number} ${word[0]}`
  } else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
    return `${number} ${word[1]}`
  } else {
    return `${number} ${word[2]}`
  }
}
