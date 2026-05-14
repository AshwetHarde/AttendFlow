import React, { useState } from 'react';
import { CreditCard, Calendar, Plus, X, Plane, MapPin, IndianRupee } from 'lucide-react';

const ExpenseRequestForm = ({ onCancel, type: initialType = 'expense' }) => {
  const [type, setType] = useState(initialType); // 'expense' or 'travel'
  const [formData, setFormData] = useState({
    title: '',
    category: 'Food',
    amount: '',
    date: '',
    destination: '',
    from: '',
    duration: '',
  });

  const typeTabs = [
    { id: 'expense', label: 'Expense' },
    { id: 'travel', label: 'Travel' },
  ];

  const categories = ['Food', 'Healthcare', 'Transport', 'Entertainment', 'Others'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { type, ...formData });
    onCancel();
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-4 sm:p-6 border border-zinc-700/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#6366F1]" />
            New Request
          </h3>
          <button 
            onClick={onCancel}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliding pill toggle - matching Leave component style */}
        <div className="flex items-center sm:justify-start justify-center mb-6">
          <div className="relative flex items-center bg-zinc-800/80 rounded-lg p-1 w-full max-w-xs">
            {/* Sliding background pill */}
            <div
              className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-out"
              style={{
                left: `calc(${typeTabs.findIndex(t => t.id === type)} * 50% + 4px)`,
                width: 'calc(50% - 8px)',
                backgroundColor: 'white',
              }}
            ></div>
            {typeTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  type === t.id ? 'text-zinc-900' : 'text-zinc-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'expense' ? (
            <>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Client Meeting Dinner"
                  className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/50 transition-all placeholder:text-zinc-600"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Amount</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="number"
                      required
                      placeholder="0.00"
                      className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl pl-10 pr-4 py-3 text-zinc-100 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/50 transition-all placeholder:text-zinc-600"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Category</label>
                  <select
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#6366F1]/50 transition-all"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="date"
                    required
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl pl-10 pr-4 py-3 text-zinc-100 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/50 transition-all [color-scheme:dark]"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    placeholder="Where to?"
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl pl-10 pr-4 py-3 text-zinc-100 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/50 transition-all placeholder:text-zinc-600"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">From</label>
                  <input
                    type="text"
                    required
                    placeholder="Origin"
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/50 transition-all placeholder:text-zinc-600"
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3 days"
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/50 transition-all placeholder:text-zinc-600"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="date"
                    required
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl pl-10 pr-4 py-3 text-zinc-100 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/50 transition-all [color-scheme:dark]"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[#6366F1] hover:bg-[#4f46e5] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#6366F1]/20 transition-all active:scale-[0.98] mt-4"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseRequestForm;
