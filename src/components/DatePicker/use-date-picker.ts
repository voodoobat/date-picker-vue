import type { DatePickerProps } from './types'
import { createDays, createWeekdays, parseDate } from './utils'

export function useDatePicker(props: DatePickerProps) {
  const locale = computed<Intl.LocalesArgument>(() => props.locale || 'en-US')
  const active = ref(props.value ? parseDate(props.value) : new Date())
  const month = ref(active.value.getMonth())
  const year = ref(active.value.getFullYear())
  const weekdays = computed(() => createWeekdays(locale.value))
  const days = computed(() => createDays(month.value, year.value))

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
    month,
    weekdays,
    year,
    nextMonth,
    prevMonth,
  }
}
