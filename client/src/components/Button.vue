<template>
  <button
    @click="handleClick"
    :class="buttonClass + ' py-2 px-4 md:py-3 md:px-6'"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    disabled: Boolean,
  },
  computed: {
    buttonClass() {
      return `btn-${this.type || "default"}`;
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>
