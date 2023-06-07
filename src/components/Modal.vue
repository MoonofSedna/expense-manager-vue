<script setup lang="ts">
import {
  computed,
  ref,
} from "@vue/reactivity";
// assets
import close from "../assets/img/close.svg";
// components
import Alert from "./Alert.vue";
// helpers
import { formFields } from "../helpers";
// types
import { ModalProps } from "../types/modal";

const error = ref("");

const props = defineProps<ModalProps>();

const emit = defineEmits([
  "toggle-modal",
  "save-expense",
  "delete-expense",
  "update:name",
  "update:amount",
  "update:category",
]);

const isAnimated = computed(() => {
  return props.modal.animation
    ? "animate"
    : "";
});

const parseValue = (
  type: string,
  e: HTMLInputElement
) => {
  return type === "number"
    ? +e.value
    : e.value;
};

const budgetAvailable = props.id
  ? props.amount + props.available
  : props.available;

const addExpense = () => {
  const { name, amount, category } =
    props;

  if ([name, category].includes("")) {
    error.value = "";
    error.value =
      "All fields are required";

    return;
  } else if (amount <= 0) {
    error.value = "";
    error.value = "Amount not valid";
    return;
  }

  if (amount > budgetAvailable) {
    error.value = "";
    error.value =
      "Amount exceeds available";
    return;
  }

  error.value = "";
  emit("save-expense");
};
</script>
<template>
  <div class="modal centered">
    <div class="close-modal">
      <img
        :src="close"
        alt="close-modal"
        @click="$emit('toggle-modal')"
      />
    </div>
    <div
      :class="isAnimated"
      class="container form-container"
    >
      <Alert v-if="error">
        <p>{{ error }}</p>
      </Alert>
      <form
        @submit.prevent="addExpense"
      >
        <legend>
          {{
            id
              ? "Update Expense"
              : "Add Expense"
          }}
        </legend>

        <fieldset class="form-control">
          <template
            v-for="field in formFields"
          >
            <label :for="field.name">{{
              field.label
            }}</label>

            <template
              v-if="
                field.type === 'select'
              "
            >
              <select
                :id="field.name"
                :value="
                  props[field.name]
                "
                @input="
                  $emit(
                    'update:' +
                      field.name,
                    (
                      $event.target as HTMLInputElement
                    ).value
                  )
                "
              >
                <option value="">
                  ---Select---
                </option>
                <option
                  v-for="option in field.options"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </template>

            <template v-else>
              <input
                :value="
                  props[field.name]
                "
                :type="field.type"
                :id="field.name"
                :placeholder="
                  field.placeholder
                "
                @input="
                  $emit(
                    'update:' +
                      field.name,
                    parseValue(
                      field.type,
                      $event.target as HTMLInputElement
                    )
                  )
                "
              />
            </template>
          </template>
          <button
            type="submit"
            class="btn"
          >
            {{
              id
                ? "Save Changes"
                : "Add Expense"
            }}
          </button>
        </fieldset>
      </form>

      <button
        v-if="id"
        @click="$emit('delete-expense')"
        class="btn danger delete"
      >
        Delete Expense
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.close-modal {
  position: absolute;
  top: 5rem;
  right: 5rem;
  img {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  transition: all 0.3s ease-in;
  opacity: 0;
}

.form-container.animate {
  opacity: 1;
}

.form-control {
  padding: 0;
  display: flex;
  flex-direction: column;
  border: none;
}

.form-control {
  label {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: var(--white);
  }
  legend {
    display: block;
    text-align: center;
    font-size: 4rem;
    margin-bottom: 5rem;
    font-weight: 800;
    color: var(--white);
  }
  button {
    margin-top: 1rem;
  }
  input,
  select {
    margin-bottom: 2rem;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 1rem;
    font-size: 2rem;
    text-transform: capitalize;
    &:focus {
      outline: 2px solid var(--blue);
    }
  }
}
</style>
