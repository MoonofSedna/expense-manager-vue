<script setup lang="ts">
import { computed } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import { normalizeAmount } from "../helpers";
import { ControlBudgetProps } from "../types/budget";

const props =
  defineProps<ControlBudgetProps>();
const emit = defineEmits([
  "reset-budget",
]);

const resetBudget = () => {
  if (confirm("Are you sure?")) {
    emit("reset-budget");
  }
};

const percentage = computed(() => {
  return parseInt(
    (
      ((props.budget -
        props.available) /
        props.budget) *
      100
    ).toString()
  );
});
</script>

<template>
  <div class="flex-container">
    <div class="chart-container">
      <CircleProgress
        :percent="percentage"
        :show-percent="true"
        :size="220"
        :border-width="25"
        :border-bg-width="25"
        fill-color="#3b82f6"
        class="chart"
      />
    </div>
    <div class="budget-container">
      <button
        class="btn danger"
        @click="resetBudget"
      >
        Reset Budget
      </button>
      <p>
        <span>Budget:</span>
        {{ normalizeAmount(budget) }}
      </p>
      <p>
        <span>Available:</span>
        {{ normalizeAmount(available) }}
      </p>
      <p>
        <span>Spent:</span>
        {{ normalizeAmount(spent) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.budget-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  & p {
    margin: 0;
    font-size: 2.4rem;
    color: var(--dark-gray);
    span {
      font-weight: 800;
      color: var(--blue);
    }
  }
}

.btn {
  margin-bottom: 2rem;
}

.current-counter {
  font-size: 4rem;
  font-weight: 900;
  color: var(--dark-gray);
  &::after {
    content: "%";
  }
}
</style>
