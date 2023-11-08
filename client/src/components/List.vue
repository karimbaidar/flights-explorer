<template>
  <div class="flex flex-col m-2 p-2">
    <div
      class="flex flex-col border border-gray-300 p-4 mb-4 rounded-md"
      v-for="(item, index) in items"
      :key="index"
    >
      <div class="flex flex-col lg:flex-row">
        <div
          class="flex flex-col lg:flex-1"
          v-for="(value, key) in item"
          :key="key"
        >
          <div class="text-center py-2">{{ key }}</div>
          <div class="text-center font-bold py-2">{{ value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
});
</script>
