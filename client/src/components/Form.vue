<template>
  <form @submit.prevent="submit" class="md:flex md:flex-col">
    <slot name="form-inputs" class="md:flex md:flex-row md:space-x-2"></slot>
    <slot name="submit-button" class="md:mt-4"></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    submit() {
      this.$emit("submit");
    },
  },
});
</script>
