<template>
  <div :class="$style.datepicker">
    <div :class="$style.month">
      <button :class="[$style.button]" type="button" @click="prevMonth" />
      {{ formattedMonth }} {{ year }}
      <button :class="[$style.button]" type="button" @click="nextMonth" />
    </div>
    <div :class="$style.weekdays">
      <span
        v-for="weekday in weekdays"
        :key="weekday"
        :class="$style.weekday"
        >{{ weekday }}</span
      >
    </div>
    <div :class="$style.days">
      <button
        v-for="day in days"
        :key="day.date.getDate()"
        @click="active = day.date"
        :data-weekday="day.weekday"
        type="button"
        :class="[
          $style.day,
          formatDate(active) === formatDate(day.date) && $style.active,
        ]"
      >
        <time :datetime="formatDate(day.date)">{{ day.date.getDate() }}</time>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DatePickerEmits, DatePickerProps } from '.'
import { useDatePicker, formatDate } from '.'

const props = defineProps<DatePickerProps>()
const emit = defineEmits<DatePickerEmits>()

const { active, days, formattedMonth, nextMonth, prevMonth, weekdays, year } =
  useDatePicker(props)

watch(active, () => emit('update:value', formatDate(active.value)))
</script>

<style module>
.datepicker {
  --datepicker-color-muted: gray;
  --datepicker-color-active: blue;
  --datepicker-color-font: black;
  --datepicker-color-bg: white;

  --datepicker-transition: all 0.2s ease;

  --datepicker-grid-gap: 0.25rem;
  --datepicker-bg: var(--datepicker-color-bg);
  --day-font-size: 0.75em;
  --day-w: 1.75rem;
  --day-h: 1.75rem;
  --day-border: 1px solid transparent;
  --day-bg: inherit;
  --day-active-bg: inherit;
  --day-active-color: inherit;
  --day-active-border: 1px solid var(--datepicker-color-active);
  --day-hover-bg: inherit;
  --day-hover-color: inherit;
  --day-hover-border: 1px solid var(--datepicker-color-muted);
  --month-font-size: 0.75em;
  --month-h: 1.75rem;
  --month-button-w: 1.5rem;
  --month-button-h: 1.5rem;
  --weekday-font-size: 0.75em;

  background-color: var(--datepicker-bg);
  color: var(--datepicker-color-font);
}

.month {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--datepicker-grid-gap);
  font-size: var(--month-font-size);
  height: var(--month-h);

  & > .button {
    --color: var(--datepicker-color-font);

    padding: 0;
    width: var(--month-button-w);
    height: var(--month-button-h);
    border: none;
    background: none;
    appearance: none;
    text-align: center;
    cursor: pointer;
    transition: var(--datepicker-transition);

    &:focus,
    &:hover {
      outline: none;
      --color: var(--datepicker-color-muted);
    }

    &::before {
      content: '';
      display: inline-block;
      width: calc(var(--month-button-w) / 2);
      height: calc(var(--month-button-h) / 2);
      background: var(--color);
    }

    &:first-child {
      &::before {
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
      }
    }

    &:last-child {
      &::before {
        clip-path: polygon(0 0, 0% 100%, 100% 50%);
      }
    }
  }
}

.days,
.weekdays {
  display: grid;
  gap: var(--datepicker-grid-gap);
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
}

.day,
.weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--day-w);
  height: var(--day-h);
}

.day {
  font-size: var(--day-font-size);
  border: var(--day-border);
  transition: var(--datepicker-transition);
  background: var(--day-bg);
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:focus,
  &:hover {
    background-color: var(--day-hover-bg);
    color: var(--day-hover-color);
    border: var(--day-hover-border);
  }

  &.active {
    background-color: var(--day-active-bg);
    color: var(--day-active-color);
    border: var(--day-active-border);
  }

  &[data-weekday='0'] {
    grid-column: 1;
  }

  &[data-weekday='1'] {
    grid-column: 2;
  }

  &[data-weekday='2'] {
    grid-column: 3;
  }

  &[data-weekday='3'] {
    grid-column: 4;
  }

  &[data-weekday='4'] {
    grid-column: 5;
  }

  &[data-weekday='5'] {
    grid-column: 6;
  }

  &[data-weekday='6'] {
    grid-column: 7;
  }
}

.weekday {
  font-size: var(--weekday-font-size);
}
</style>
