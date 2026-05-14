import React, { useState } from 'react';
import { Plus, X, List } from 'lucide-react';
import ExpenseSummary from '../components/expenses/ExpenseSummary';
import TravelSummary from '../components/expenses/TravelSummary';
import ExpenseRequestForm from '../components/expenses/ExpenseRequestForm';

const ExpensesPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState('expense'); // 'expense' or 'travel'

  const handleAddClick = (type) => {
    setFormType(type);
    setShowAddForm(true);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-zinc-950 px-4 sm:px-6 py-8 sm:py-4 overflow-x-hidden w-full min-w-0 text-zinc-100">
      <div className="max-w-6xl mx-auto w-full min-w-0 space-y-6">
        
        {/* Header with Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-700/30">
          <div>
            <h1 className="text-2xl font-bold">Reimbursement Requests</h1>
          </div>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (!showAddForm) setFormType('expense');
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              showAddForm 
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' 
                : 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20 hover:bg-[#4f46e5]'
            }`}
          >
            {showAddForm ? (
              <><List className="w-4 h-4" /> View Summary</>
            ) : (
              <><Plus className="w-4 h-4" /> New Request</>
            )}
          </button>
        </div>

        {showAddForm ? (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <ExpenseRequestForm 
              type={formType} 
              onCancel={() => setShowAddForm(false)} 
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-300">
            <ExpenseSummary onAdd={() => handleAddClick('expense')} />
            <TravelSummary onAdd={() => handleAddClick('travel')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;
