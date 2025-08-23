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
    <DatePickerInput :locale="locale" @update:value="console.log" />
    <h3>with date:</h3>
    <DatePickerInput
      value="1337-01-01"
      :locale="locale"
      @update:value="console.log"
    />
    <h2>calendar:</h2>
    <DatePicker :locale="locale" @update:value="console.log" />
    <h3>with date:</h3>
    <DatePicker
      :locale="locale"
      value="1337-01-01"
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
  padding-bottom: 3rem;
}

.locale {
  display: flex;
  gap: 0.75rem;
}
</style>

<route lang="json5">
{
  name: 'Home',
}
</route>
