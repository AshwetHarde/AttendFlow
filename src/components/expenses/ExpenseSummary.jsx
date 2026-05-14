import { CreditCard, Plus, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const ExpenseSummary = ({ onAdd }) => {
  const recentExpenses = [
    { id: 1, title: 'Client Meeting Lunch', category: 'Food', amount: 3500, status: 'Approved', date: 'Mar 20', reimbursed: true },
    { id: 2, title: 'Medical Checkup', category: 'Healthcare', amount: 2000, status: 'Pending', date: 'Mar 18', reimbursed: false },
    { id: 3, title: 'Office Supplies', category: 'Transport', amount: 1500, status: 'Approved', date: 'Mar 15', reimbursed: true },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-4 sm:p-5 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden w-full h-full lg:min-h-[360px] flex flex-col">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-100">Expense Summary</h3>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-500">Pending</span>
            </div>
            <div className="text-2xl font-bold text-zinc-100">₹2,000</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-500">Reimbursed</span>
            </div>
            <div className="text-2xl font-bold text-zinc-100">₹5,000</div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#6366F1]" />
              <h3 className="text-sm font-medium text-zinc-200">Recent Transactions</h3>
            </div>
            <TrendingUp className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="space-y-2">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-[#6366F1]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-zinc-200">{expense.title}</div>
                    <div className="text-xs text-zinc-500">{expense.category} • {expense.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-zinc-100">₹{expense.amount.toLocaleString('en-IN')}</div>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    {expense.reimbursed && <CheckCircle className="w-3 h-3 text-zinc-400" />}
                    <span className={`text-[10px] font-semibold ${
                      expense.status === 'Approved' ? 'text-green-400/70' : 'text-yellow-400/70'
                    }`}>
                      {expense.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
