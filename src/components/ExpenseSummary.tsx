import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense, categories } from "@/types/expense";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export const ExpenseSummary = ({ expenses }: ExpenseSummaryProps) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  
  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear;
  });
  
  const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = categories.map((category) => {
    const categoryExpenses = expenses.filter((expense) => expense.category === category);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return { category, total, count: categoryExpenses.length };
  }).filter((item) => item.total > 0);

  const topCategory = categoryTotals.reduce(
    (max, category) => (category.total > max.total ? category : max),
    { category: "None", total: 0, count: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Total Summary */}
      <Card className="backdrop-blur-sm bg-gradient-to-br from-blue-500/90 to-indigo-600/90 border-white/20 shadow-lg text-white hover:shadow-xl hover:from-blue-600/90 hover:to-indigo-700/90 transition-all duration-300">
  <CardHeader className="pb-3">
    <CardTitle className="text-white">
      <span className="group flex items-center gap-2 cursor-pointer">
        <DollarSign className="h-5 w-5 text-white transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
        Total Expenses
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
          <div className="text-3xl font-bold mb-2 hover:scale-105 transition-transform">
            ₹{totalAmount.toFixed(2)}
          </div>
          <p className="text-blue-100 text-sm">
            {expenses.length} transaction{expenses.length !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      {/* This Month */}
      <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300">
  <CardHeader className="pb-3">
    <CardTitle className="text-slate-800">
      <span className="group flex items-center gap-2 cursor-pointer">
        <Calendar className="h-5 w-5 text-blue-600 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110" />
        This Month
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
          <div className="text-2xl font-bold text-slate-800 mb-2 hover:text-blue-600 transition-colors">
            ₹{thisMonthTotal.toFixed(2)}
          </div>
          <p className="text-slate-600 text-sm">
            {thisMonthExpenses.length} transaction{thisMonthExpenses.length !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      {/* Top Category */}
      {topCategory.total > 0 && (
       <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300">
       <CardHeader className="pb-3">
         <CardTitle className="text-slate-800">
           <span className="group flex items-center gap-2 cursor-pointer">
             <TrendingUp className="h-5 w-5 text-blue-600 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
             Top Category
           </span>
         </CardTitle>
       </CardHeader>
       <CardContent>
            <div className="text-lg font-semibold text-slate-800 mb-1 hover:text-blue-600 transition-colors">
              {topCategory.category}
            </div>
            <div className="text-xl font-bold text-slate-800 mb-2 hover:text-blue-600 transition-colors">
              ₹{topCategory.total.toFixed(2)}
            </div>
            <p className="text-slate-600 text-sm">
              {topCategory.count} transaction{topCategory.count !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Category Breakdown */}
      {categoryTotals.length > 0 && (
        <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-800">
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryTotals
                .sort((a, b) => b.total - a.total)
                .slice(0, 5)
                .map((item) => (
                  <div key={item.category} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-medium text-slate-700 truncate hover:text-blue-600 transition-colors">
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors">
                      ₹{item.total.toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
