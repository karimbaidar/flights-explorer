<template>
  <div class="flex items-center border border-black rounded-full">
    <button
      class="p-2 md:px-4 lg:px-4 focus:outline-none active:translate-y-1 transition-transform duration-200 ease-in-out"
      @click="toggleSortOrder"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 320 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
        />
      </svg>
      <i class="fas fa-sort"></i>
    </button>
    <div class="relative">
      <button
        @click="isOpen = !isOpen"
        class="md:px-2 lg:px-2 bg-white rounded-full w-[150px] text-center"
      >
        {{ selectedSortOptionText }}
      </button>
      <div
        v-if="isOpen"
        class="absolute mt-2 w-[250px] bg-white rounded shadow-lg transform transition-transform duration-200 ease-in-out"
      >
        <div class="p-2 text-center font-bold">Sorting</div>
        <hr class="border-gray-200" />
        <div
          v-for="option in sortOptions"
          :key="option.value"
          class="flex items-center space-x-[10px] p-2 cursor-pointer hover:bg-gray-100"
          @click="selectOption(option.value, option.text)"
        >
          <input
            type="radio"
            :checked="selectedSortOption === option.value"
            class="form-radio text-blue-500"
          />
          <span>{{ option.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    sortOptions: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedSortOption = ref(props.sortOptions[0].value);
    const selectedSortOptionText = ref(props.sortOptions[0].text);
    const isAscending = ref(true);
    const isOpen = ref(false);

    const emitSortChange = () => {
      emit("sort-change", {
        sortOption: selectedSortOption.value,
        isAscending: isAscending.value,
      });
    };

    const toggleSortOrder = () => {
      isAscending.value = !isAscending.value;
      emitSortChange();
    };

    const selectOption = (value, text) => {
      selectedSortOption.value = value;
      selectedSortOptionText.value = text;
      isOpen.value = false;
      emitSortChange();
    };

    return {
      selectedSortOption,
      selectedSortOptionText,
      emitSortChange,
      toggleSortOrder,
      isOpen,
      selectOption,
    };
  },
});
</script>
