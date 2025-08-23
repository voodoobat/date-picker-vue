<template>
  <div :class="$style.demo">
    <div :class="$style.locale">
      <label v-for="lang in languages" :key="lang">
        <input type="radio" v-model="locale" :value="lang" />
        {{ lang }}
      </label>
    </div>
    <DatePicker
      :class="$style.datepicker"
      value="1337-01-11"
      :locale="locale"
      @update:value="console.log"
    />
  </div>
</template>

<script setup lang="ts">
import { DatePicker } from '@/components/DatePicker'

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
