<script setup lang="ts">
import { ref } from "vue";
// components
import Alert from "./Alert.vue";

const budget = ref(0);
const error = ref("");

const emit = defineEmits([
  "set-budget",
]);

const setBudget = () => {
  if (budget.value <= 0) {
    error.value = "Budget not valid";

    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  } else {
    emit("set-budget", budget.value);
  }
};
</script>
<template>
  <form @submit.prevent="setBudget">
    <Alert v-if="error">
      <p>{{ error }}</p>
    </Alert>
    <fieldset class="form-control">
      <label for="budget"
        >Set Your Budget</label
      >
      <input
        type="number"
        id="budget"
        min="0"
        v-model.number="budget"
        placeholder="New budget"
      />
      <button type="submit" class="btn">
        Add new budget
      </button>
    </fieldset>
  </form>
</template>

<style scoped lang="scss">
.form-control {
  padding: 0;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  border: none;
  label {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    color: var(--blue);
    font-weight: 800;
    text-align: center;
  }
  input {
    font-size: 2rem;
    padding: 1rem;
    border: none;
    background-color: var(--light-gray);
    border-radius: 1rem;
    text-align: center;
    &:focus {
      outline: 2px solid var(--blue);
    }
  }
}
</style>
