import { describe, expect, test } from 'vitest'
import {
  createDays,
  createWeekdays,
  formatDate,
  formatMonth,
  parseDate,
} from './utils'

describe('DatePicker utils', () => {
  test('should format date', () => {
    const date = new Date(2025, 0, 1)
    expect(formatDate(date)).toBe('2025-01-01')
  })

  test('should parse date', () => {
    const date = '2023-01-01'
    expect(parseDate(date)).toEqual(new Date(2023, 0, 1))
  })

  test('should format month', () => {
    expect(formatMonth(0, 'en-US')).toBe('Jan')
    expect(formatMonth(0, 'ru-RU')).toBe('янв.')
  })

  test('should throw error when parsing invalid date', () => {
    const invalidDayDate = '2023-01-32'
    const invalidMonthDate = '2023-13-01'

    expect(() => parseDate(invalidDayDate)).toThrow()
    expect(() => parseDate(invalidMonthDate)).toThrow()
  })

  test('should create days', () => {
    const days = createDays(0, 2023)

    expect(days.length).toBe(31)
    expect(days[0].weekday).toBeTypeOf('number')
    expect(days[0].date).toBeInstanceOf(Date)
  })

  test('should create weekdays', () => {
    const weekdays = createWeekdays('en-US')

    expect(weekdays.length).toBe(7)
    expect(weekdays[0]).toBeTypeOf('string')
    expect(weekdays[0]).toBe('Sun')
  })
})
