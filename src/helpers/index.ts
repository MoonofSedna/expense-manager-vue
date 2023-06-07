// assets
import SavesIcon from "../assets/img/saves.svg";
import HomeIcon from "../assets/img/home.svg";
import FoodIcon from "../assets/img/food.svg";
import ExpensesIcon from "../assets/img/expenses.svg";
import LeisureIcon from "../assets/img/leisure.svg";
import HealthIcon from "../assets/img/health.svg";
import SubscriptionIcon from "../assets/img/subscription.svg";
// types
import { FormFields } from "../types/modal";

export const normalizeAmount = (
  budget: number
) => {
  return Number(
    budget.toFixed(2)
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const normalizeDate = (
  date: number
) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }
  );
};

export const createId = () => {
  const random = Math.random()
    .toString(36)
    .substring(2);

  const date = Date.now().toString(36);
  return `${random}-${date}`;
};

export const categoryIcons = {
  saves: SavesIcon,
  home: HomeIcon,
  food: FoodIcon,
  expenses: ExpensesIcon,
  leisure: LeisureIcon,
  health: HealthIcon,
  subscriptions: SubscriptionIcon,
};

export const categories = [
  "saves",
  "food",
  "expenses",
  "home",
  "health",
  "leisure",
  "subscriptions",
];

export const formFields: FormFields[] =
  [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Expense Name",
      required: true,
    },
    {
      label: "Amount",
      name: "amount",
      type: "number",
      placeholder: "Expense Amount",
      required: true,
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      placeholder: "Category",
      required: true,
      options: categories,
    },
  ];
