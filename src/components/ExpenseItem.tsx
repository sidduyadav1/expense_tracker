
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Expense } from "@/types/expense";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
  index: number;
}

export const ExpenseItem = ({ expense, onDelete, index }: ExpenseItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div 
      className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-slate-200/50 hover:bg-white/80 transition-all duration-200 animate-in slide-in-from-top-2"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-slate-800 truncate">
            {expense.title}
          </h3>
          <span className="text-lg font-bold text-slate-800">
            ₹{expense.amount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {expense.category}
          </span>
          <span>{formatDate(expense.date)}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(expense.id)}
        className="ml-3 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
