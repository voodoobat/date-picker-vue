export function formatDate(date: Date) {
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

  return `${date.getFullYear()}-${month}-${day}`
}

export function formatMonth(month: number, locale: Intl.LocalesArgument) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  return formatter.format(new Date(2023, month, 1))
}

export function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date format')
  }

  return new Date(year, month - 1, day)
}

export function createDays(month: number, year: number) {
  const day = new Date(year, month, 1)
  const days = []

  while (day.getMonth() === month) {
    days.push({
      date: new Date(day),
      weekday: day.getDay(),
    })

    day.setDate(day.getDate() + 1)
  }

  return days
}

export function createWeekdays(locale: Intl.LocalesArgument) {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  })

  return [...Array(7).keys()].map((key) => {
    return formatter.format(new Date(2023, 0, 1 + key))
  })
}
