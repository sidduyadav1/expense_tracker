
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Other",
];
