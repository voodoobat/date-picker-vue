import type { DatePickerProps } from './types'

export function useDatePickerInput(props: DatePickerProps) {
  const dropdownRef = ref<HTMLDivElement>()
  const open = ref(false)
  const show = ref(false)
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
      show.value = true

      inputs.forEach((input) => input.addEventListener('focus', handleClose))
      document.addEventListener('keyup', handleEscape)
      document.addEventListener('mousedown', handleClose)
    } else {
      setTimeout(() => (show.value = false), 200) // wait for animation

      inputs.forEach((input) => input.removeEventListener('focus', handleClose))
      document.removeEventListener('keyup', handleEscape)
      document.removeEventListener('mousedown', handleClose)
    }
  })

  return {
    date,
    dropdownRef,
    open,
    show,
  }
}
