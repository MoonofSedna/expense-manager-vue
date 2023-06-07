type category =
  | "saves"
  | "food"
  | "expenses"
  | "home"
  | "health"
  | "leisure"
  | "subscriptions";

interface Expenses {
  id?: string | null;
  name: string;
  amount: number;
  category: string;
  date: number;
}

interface ControlBudgetProps {
  budget: number;
  available: number;
  spent: number;
}

interface ExpensesProps {
  expense: {
    id?: string | null;
    name: string;
    amount: number;
    category: category;
    date: number;
  };
}

export type {
  Expenses,
  ControlBudgetProps,
  ExpensesProps,
};
