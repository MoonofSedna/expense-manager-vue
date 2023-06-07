<script setup lang="ts">
import {
  ref,
  reactive,
  watch,
  onMounted,
  computed,
} from "vue";
// assets
import newExpense from "./assets/img/new-expense.svg";
// components
import Budget from "./components/Budget.vue";
import ControlBudget from "./components/ControlBudget.vue";
import Modal from "./components/Modal.vue";
import Expense from "./components/Expense.vue";
import Filter from "./components/Filter.vue";
// helpers
import { createId } from "./helpers";
// types
import { Expenses } from "./types/budget";

const modal = reactive({
  show: false,
  animation: false,
});

const expenseInitialState = {
  id: null,
  name: "",
  amount: 0,
  category: "",
  date: Date.now(),
};

const budget = ref(0);
const available = ref(0);
const spent = ref(0);
const filter = ref("");
const expenses = ref<Expenses[]>([]);

const expense = reactive<Expenses>({
  ...expenseInitialState,
});

onMounted(() => {
  const budgetStorage =
    localStorage.getItem("budget");
  const expensesStorage =
    localStorage.getItem("expenses");

  if (budgetStorage) {
    budget.value = JSON.parse(
      budgetStorage
    );
  }

  if (expensesStorage) {
    expenses.value = JSON.parse(
      expensesStorage
    );
  }
});

watch(
  expenses,
  () => {
    const total = expenses.value.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    spent.value = total;
    available.value =
      budget.value - total;
  },
  {
    deep: true,
  }
);

watch(budget, () => {
  localStorage.setItem(
    "budget",
    JSON.stringify(budget.value)
  );
});

watch(
  expenses,
  () => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses.value)
    );
  },
  {
    deep: true,
  }
);

const setBudget = (value: number) => {
  budget.value = value;
  available.value = value;
};

const toggleModal = () => {
  if (modal.show) {
    modal.animation = false;

    setTimeout(() => {
      modal.show = false;
      Object.assign(
        expense,
        expenseInitialState
      );
    }, 300);
  } else {
    modal.show = true;
    setTimeout(() => {
      modal.animation = true;
    }, 300);
  }
};

const saveExpense = () => {
  if (expense.id) {
    const index =
      expenses.value.findIndex(
        (item) => item.id === expense.id
      );

    expenses.value[index] = {
      ...expense,
    };
  } else {
    expenses.value.push({
      ...expense,
      id: createId(),
    });
  }

  toggleModal();
};

const selectExpense = (id: string) => {
  const editExpense =
    expenses.value.find(
      (expense) => expense.id === id
    );

  Object.assign(expense, editExpense);

  toggleModal();
};

const deleteExpense = () => {
  if (confirm("Are you sure?")) {
    expenses.value =
      expenses.value.filter(
        (exp) => exp.id !== expense.id
      );

    toggleModal();
  }
};

const resetBudget = () => {
  localStorage.removeItem("budget");
  localStorage.removeItem("expenses");
  budget.value = 0;
  available.value = 0;
  spent.value = 0;
  expenses.value = [];
};

const filterExpenses = computed(() => {
  if (filter.value) {
    return expenses.value.filter(
      (expense) =>
        expense.category ===
        filter.value
    );
  }
  return expenses.value;
});
</script>

<template>
  <div
    :class="{
      'modal-open': modal.show,
    }"
  >
    <header>
      <h1>Expense Manager</h1>
      <div
        class="container-header container shadow"
      >
        <Budget
          v-if="budget === 0"
          @set-budget="setBudget"
        />
        <div v-else>
          <ControlBudget
            :budget="budget"
            :available="available"
            :spent="spent"
            @reset-budget="resetBudget"
          />
        </div>
      </div>
    </header>
    <main
      v-if="budget > 0"
      class="flex-column"
    >
      <div class="add-budget">
        <img
          :src="newExpense"
          alt="new-expense"
          @click="toggleModal"
        />
      </div>
      <Modal
        v-if="modal.show"
        :id="expense.id"
        :modal="modal"
        :available="available"
        :animation="modal.animation"
        @toggle-modal="toggleModal"
        @save-expense="saveExpense"
        @delete-expense="deleteExpense"
        v-model:name="expense.name"
        v-model:amount="expense.amount"
        v-model:category="
          expense.category
        "
      />
      <div
        class="container expenses flex-column"
      >
        <Filter
          v-model:filter="filter"
        />
        <h2>
          {{
            filterExpenses.length > 0
              ? "Expenses"
              : "No expenses yet"
          }}
        </h2>

        <Expense
          v-for="expense in filterExpenses"
          :key="
            expense.id + expense.name
          "
          :expense="expense"
          @select-expense="
            selectExpense
          "
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --blue: #3b82f6;
  --white: #ffffff;
  --black: #000000;
  --gray: #94a3b8;
  --red: #ce2828;
  --dark-gray: #808080;
  --light-gray: #f1f1f1;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background: var(--light-gray);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

header {
  background-color: var(--blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: var(--white);
    padding: 5rem 0;
    margin: 0;
    text-align: center;
    font-weight: 800;
  }
}

.container {
  width: 95%;
  max-width: 80rem;
}

.modal-open {
  overflow: hidden;
  height: 100vh;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.expenses {
  margin-top: 20rem;
  padding: 3rem 0;
  h2 {
    color: var(--dark-gray);
    font-weight: 800;
  }
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-header {
  margin-top: -20rem;
  transform: translateY(20rem);
}

.shadow {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border-radius: 2rem;
  padding: 5rem;
}

.btn,
.danger {
  font-size: 2rem;
  padding: 1rem 1.5rem;
  border: none;
  font-weight: 800;
  cursor: pointer;
  background-color: var(--blue);
  color: var(--white);
  border-radius: 1rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2563eb;
}

.danger {
  background-color: var(--red);
  color: var(--white);
}
.danger:hover {
  background-color: #ac2020;
}

.flex-container {
  display: flex;
  gap: 3rem;
  justify-content: space-between;
  align-items: center;
}

.add-budget {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  img {
    cursor: pointer;
    width: 5rem;
    height: 5rem;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 768px) {
  .flex-container {
    flex-direction: column;
    justify-content: center;
  }

  .shadow {
    padding: 3rem 2.5rem;
  }
}
</style>
