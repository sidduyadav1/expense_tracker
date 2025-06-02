
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseItem } from "./ExpenseItem";
import { Expense } from "@/types/expense";
import { Receipt } from "lucide-react";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  if (expenses.length === 0) {
    return (
      <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg">
        <CardContent className="py-12">
          <div className="text-center text-slate-500">
            <Receipt className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">No expenses yet</p>
            <p className="text-sm">Add your first expense to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Receipt className="h-5 w-5 text-blue-600" />
          Recent Expenses ({expenses.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {expenses.map((expense, index) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDeleteExpense}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
