import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Expense, categories } from "@/types/expense";
import { useToast } from "@/hooks/use-toast";

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
}

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !amount || !category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    onAddExpense({
      title: title.trim(),
      amount: numAmount,
      category,
      date: new Date().toISOString().split("T")[0],
    });

    // Reset form
    setTitle("");
    setAmount("");
    setCategory("");

    toast({
      title: "Success",
      description: "Expense added successfully",
    });
  };

  return (
    <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-slate-800">
      <span className="group flex items-center gap-2 cursor-pointer">
        <Plus className="h-5 w-5 text-blue-600 transition-transform duration-300  group-hover:rotate-90 group-hover:scale-110" />
        Add New Expense
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-700">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Lunch at restaurant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400 hover:border-blue-300 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-700">
                Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400 hover:border-blue-300 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-700">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400 hover:border-blue-300 transition-colors">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4 mr-2 hover:rotate-90 transition-transform duration-300" />
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
