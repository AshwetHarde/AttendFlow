import { Plane, Calendar, Plus, CheckCircle, ArrowRight } from 'lucide-react';

const TravelSummary = ({ onAdd }) => {
  const upcomingTrips = [
    { id: 1, destination: 'Delhi', from: 'Pune', date: 'Apr 15', duration: '3 days', status: 'Confirmed', reimbursed: true, budget: '₹14,000' },
    { id: 2, destination: 'Hyderabad', from: 'Nagpur', date: 'Apr 22', duration: '2 days', status: 'Pending', reimbursed: false, budget: '₹12,000' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-4 sm:p-5 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden w-full h-full lg:min-h-[360px] flex flex-col">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-100">Travel Summary</h3>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-[#6366F1]" />
            <h3 className="text-sm font-medium text-zinc-200">Upcoming Trips</h3>
          </div>
          <div className="space-y-3">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
                      <Plane className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-200">{trip.destination}</div>
                      <div className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                        <span>{trip.from}</span>
                        <ArrowRight className="w-3 h-3 opacity-40" />
                        <span>{trip.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-zinc-500 mb-1">{trip.duration}</div>
                    <div className="text-xs font-semibold text-zinc-200">{trip.budget}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-700/30">
                  <div className="flex items-center gap-1">
                    {trip.reimbursed && <CheckCircle className="w-3 h-3 text-zinc-400" />}
                    <span className={`text-[10px] font-semibold ${
                      trip.status === 'Confirmed' ? 'text-green-400/70' : 'text-yellow-400/70'
                    }`}>
                      {trip.status}
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

export default TravelSummary;
