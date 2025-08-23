<template>
  <div :class="$style.demo">
    <h2>lang:</h2>
    <div :class="$style.locale">
      <label v-for="lang in languages" :key="lang">
        <input type="radio" v-model="locale" :value="lang" />
        {{ lang }}
      </label>
    </div>
    <h2>input:</h2>
    <DatePickerInput :locale="locale" />
    <h2>calendar:</h2>
    <span>(see console)</span>
    <DatePicker
      :class="$style.datepicker"
      :locale="locale"
      @update:value="console.log"
    />
  </div>
</template>

<script setup lang="ts">
import { DatePicker, DatePickerInput } from '@/components/DatePicker'

const languages = ['en-US', 'ru-RU', 'zh-CN']
const locale = ref(languages[0])
</script>

<style module>
.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.datepicker {
  display: inline-block;
}
</style>

<route lang="json5">
{
  name: 'Home',
}
</route>
