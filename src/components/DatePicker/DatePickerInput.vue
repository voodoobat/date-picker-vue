<template>
  <div :class="$style['datepicker-input']">
    <input type="text" v-model="date" @focus="open = true" :disabled="open" />
    <div ref="dropdownRef" :class="[$style.dropdown, open && $style.open]">
      <DatePicker v-bind="props" @update:value="date = $event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DatePickerEmits, DatePickerProps } from '.'
import { DatePicker, useDatePickerInput } from '.'

const props = defineProps<DatePickerProps>()
const emit = defineEmits<DatePickerEmits>()

const { date, dropdownRef, open } = useDatePickerInput(props)

watch(date, () => emit('update:value', date.value))
</script>

<style module>
.datepicker-input {
  --dropdown-bg: white;
  --dropdown-z-index: 10;
  --dropdown-padding: 1rem;
  --dropdown-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  --dropdown-transition: all 0.2s ease;
  --dropdown-hidden-transform: translateY(1rem);

  position: relative;
}

.dropdown {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  z-index: var(--dropdown-z-index);
  padding: var(--dropdown-padding);
  box-shadow: var(--dropdown-shadow);
  opacity: 0;
  transform: var(--dropdown-hidden-transform);
  pointer-events: none;
  background-color: var(--dropdown-bg);
  transition: var(--dropdown-transition);

  &.open {
    opacity: 1;
    transform: none;
    pointer-events: all;
  }
}
</style>
