<script setup lang="ts">
import { ExpensesProps } from "../types/budget";
import {
  categoryIcons,
  normalizeAmount,
  normalizeDate,
} from "../helpers";

defineProps<ExpensesProps>();

defineEmits(["select-expense"]);
</script>
<template>
  <div class="expense shadow">
    <div class="content">
      <img
        class="icon"
        :src="
          categoryIcons[
            expense.category
          ]
        "
        :alt="expense.category"
      />
      <div class="details">
        <p class="category">
          {{ expense.category }}
        </p>
        <p
          class="name"
          @click="
            $emit(
              'select-expense',
              expense.id
            )
          "
        >
          {{ expense.name }}
        </p>
        <p class="date">
          <span>Date: </span
          >{{
            normalizeDate(expense.date)
          }}
        </p>
      </div>
    </div>
    <p class="amount">
      {{
        normalizeAmount(expense.amount)
      }}
    </p>
  </div>
</template>

<style scoped>
.expense {
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.details p {
  margin: 0 0 1rem 0;
}

.icon {
  width: 6rem;
  height: 6rem;
}

.category {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 800;
  color: var(--gray);
}

.name {
  color: var(--dark-gray);
  font-size: 2.4rem;
  font-weight: 800;
  text-transform: capitalize;
  cursor: pointer;
}

.date {
  color: var(--dark-gray);
  font-size: 1.6rem;
  font-weight: 400;
}
.date span {
  font-weight: 800;
}

.amount {
  font-size: 3rem;
  font-weight: 900;
  color: var(--dark-gray);
  margin: 0;
}

@media screen and (max-width: 768px) {
  .icon {
    width: 4rem;
    height: 4rem;
  }

  .amount {
    font-size: 2.4rem;
  }
}
</style>
