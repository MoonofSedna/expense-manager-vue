<script setup lang="ts">
import { categories } from "../helpers";
defineProps<{
  filter: string;
}>();
defineEmits(["update:filter"]);
</script>

<template>
  <div class="shadow filters">
    <form>
      <label for="filter"
        >Filter Expenses</label
      >
      <select
        id="filter"
        :value="filter"
        @input="
          $emit(
            'update:filter',
            (
              $event.target as HTMLInputElement
            ).value
          )
        "
      >
        <option value="">
          ---All---
        </option>
        <option
          v-for="option in categories"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </form>
  </div>
</template>

<style scoped lang="scss">
.filters {
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    label {
      font-size: 2.8rem;
      font-weight: 900;
      color: var(--dark-gray);
      text-align: center;
    }
    select {
      margin-bottom: 2rem;
      padding: 1rem 1.5rem;
      border: none;
      border-radius: 1rem;
      font-size: 2rem;
      text-transform: capitalize;
      background-color: var(
        --light-gray
      );
      &:focus {
        outline: 2px solid var(--blue);
      }
    }
  }
}
</style>
