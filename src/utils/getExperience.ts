import dayjs from 'dayjs'

export const getExperience = (date: string) => {
  const today = dayjs().year()
  return today - dayjs(date).year() + 1
}
