import type { DatePickerProps } from './types'

export type * from './types'
export { default as DatePicker } from './DatePicker.vue'
export { default as DatePickerInput } from './DatePickerInput.vue'

export function useDatePicker(props: DatePickerProps) {
  const locale = ref<Intl.LocalesArgument>(props.locale || 'en-US')
  const active = ref(props.value ? parseDate(props.value) : new Date())
  const month = ref(active.value.getMonth())
  const formattedMonth = computed(() => formatMonth(month.value, locale.value))
  const year = ref(active.value.getFullYear())
  const weekdays = computed(() => createWeekdays(locale.value))
  const days = computed(() => createDays(month.value, year.value))

  watch(
    () => props.locale,
    () => {
      locale.value = props.locale
    },
  )

  function nextMonth() {
    if (month.value === 11) {
      month.value = 0
      year.value++
    } else {
      month.value++
    }
  }

  function prevMonth() {
    if (month.value === 0) {
      month.value = 11
      year.value--
    } else {
      month.value--
    }
  }

  return {
    active,
    days,
    locale,
    formattedMonth,
    weekdays,
    year,
    nextMonth,
    prevMonth,
  }
}

export function useDatePickerInput(props: DatePickerProps) {
  const dropdownRef = ref<HTMLDivElement>()
  const open = ref(false)
  const date = ref(props.value)

  watch(date, () => (open.value = false))

  function handleClose(ev: Event) {
    if (!dropdownRef.value?.contains(ev.target as Node)) {
      open.value = false
    }
  }

  function handleEscape(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      open.value = false
    }
  }

  watch(open, (isOpen) => {
    const inputs = document.querySelectorAll('input, textarea, button')

    if (isOpen) {
      inputs.forEach((input) => input.addEventListener('focus', handleClose))
      document.addEventListener('keyup', handleEscape)
      document.addEventListener('mousedown', handleClose)
    } else {
      inputs.forEach((input) => input.removeEventListener('focus', handleClose))
      document.removeEventListener('keyup', handleEscape)
      document.removeEventListener('mousedown', handleClose)
    }
  })

  return {
    date,
    dropdownRef,
    open,
  }
}

export function formatDate(date: Date) {
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

  return `${date.getFullYear()}-${month}-${day}`
}

function formatMonth(month: number, locale: Intl.LocalesArgument) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  return formatter.format(new Date(2023, month, 1))
}

function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date format')
  }

  return new Date(year, month - 1, day)
}

function createDays(month: number, year: number) {
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

function createWeekdays(locale: Intl.LocalesArgument) {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  })

  return [...Array(7).keys()].map((key) => {
    return formatter.format(new Date(2023, 0, 1 + key))
  })
}
