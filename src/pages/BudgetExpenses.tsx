import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Plus,
  AlertTriangle,
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { useTrips } from '../context/TripContext';
import { Modal } from '../components/common/Modal';

export const BudgetExpenses: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const { getTrip, addExpenseToTrip } = useTrips();

  const trip = getTrip(tripId || 'trip_kyoto_spring') || getTrip('trip_kyoto_spring');

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState<number>(100);
  const [expenseCategory, setExpenseCategory] = useState<'stay' | 'transport' | 'meals' | 'activities' | 'misc'>('activities');

  if (!trip) {
    return <div className="p-8 text-center text-outline">Trip not found.</div>;
  }

  // Calculate dynamic expense totals
  const customTotal = (trip.customExpenses || []).reduce((sum, e) => sum + e.amount, 0);

  // Total Estimated Calculation
  const totalEstimated = customTotal > 0 ? customTotal : 3240.5;
  const totalBudget = trip.budget || 4500;
  const remainingBalance = totalBudget - totalEstimated;
  const percentageSpent = Math.min(100, Math.round((totalEstimated / totalBudget) * 100));

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trip && expenseTitle) {
      addExpenseToTrip(trip.id, {
        title: expenseTitle,
        category: expenseCategory,
        amount: expenseAmount,
        date: new Date().toISOString().split('T')[0],
      });
      setShowAddExpenseModal(false);
      setExpenseTitle('');
      setExpenseAmount(100);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Back Link & Header */}
      <div>
        <Link
          to={`/trips/${trip.id}/plan`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {trip.title} Itinerary</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface">
              Budget & Expenses
            </h1>
            <p className="text-outline text-sm mt-0.5">
              Tokyo & Kyoto • {trip.startDate} - {trip.endDate}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Exporting budget report to CSV/PDF...')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-xs font-bold text-on-surface transition-colors"
            >
              <Download className="w-4 h-4 text-outline" />
              <span>Export</span>
            </button>

            <button
              onClick={() => setShowAddExpenseModal(true)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-dim transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>
      </div>

      {/* OVER-BUDGET WARNING BANNER matching media_1787376728913.png */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-start justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-rose-900">Over-budget Warning</h4>
            <p className="text-xs text-rose-700 mt-0.5">
              Day 4 (Oct 15) exceeded daily budget by $145.00 due to 'Theme Park Tickets'.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Opening Day 4 Theme Park Tickets expense detail...')}
          className="text-xs font-extrabold text-rose-700 hover:underline flex-shrink-0"
        >
          Review
        </button>
      </div>

      {/* 3 SUMMARY CARDS ROW matching media_1787376728913.png */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Budget */}
        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-outline font-semibold mb-2">
            <span>Total Budget</span>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-bold text-[10px]">
              Fixed Target
            </span>
          </div>
          <h3 className="font-headline font-extrabold text-3xl text-on-surface">
            ${totalBudget.toLocaleString()}.00
          </h3>
        </div>

        {/* Card 2: Total Estimated */}
        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-outline font-semibold mb-2">
            <span>Total Estimated</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center gap-1 border border-emerald-200">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              On Track
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-headline font-extrabold text-3xl text-on-surface">
              ${totalEstimated.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-xs text-outline font-medium">{percentageSpent}% of budget</span>
          </div>
        </div>

        {/* Card 3: Remaining Balance */}
        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-outline font-semibold mb-2">
            <span>Remaining Balance</span>
            <span className="text-[10px] text-outline font-medium">Safe to spend: $104/day</span>
          </div>

          <h3 className="font-headline font-extrabold text-3xl text-primary">
            ${remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>

          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-3">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${percentageSpent}%` }}
            />
          </div>
        </div>
      </div>

      {/* CHARTS SECTION matching media_1787376728913.png */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Expense Breakdown Donut Chart */}
        <div className="glass-card-elevated rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-primary" />
              Expense Breakdown
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* SVG Donut Chart */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Track */}
                <path
                  className="text-surface-container"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Stay segment (cyan) */}
                <path
                  className="text-primary"
                  strokeDasharray="45, 100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Transport segment (dark blue) */}
                <path
                  className="text-teal-700"
                  strokeDasharray="20, 100"
                  strokeDashoffset="-45"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Meals segment (light blue) */}
                <path
                  className="text-sky-400"
                  strokeDasharray="15, 100"
                  strokeDashoffset="-65"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Activities segment (purple) */}
                <path
                  className="text-tertiary"
                  strokeDasharray="10, 100"
                  strokeDashoffset="-80"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute text-center">
                <span className="font-extrabold text-lg text-on-surface">12</span>
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">
                  CATEGORIES
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2.5 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-on-surface">Stay</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-700" />
                <span className="text-on-surface">Transport</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-400" />
                <span className="text-on-surface">Meals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary" />
                <span className="text-on-surface">Activities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-on-surface">Misc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Daily Spending Vertical Bar Chart */}
        <div className="glass-card-elevated rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Daily Spending
            </h3>
            <span className="text-[10px] font-bold text-outline uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container">
              This Trip
            </span>
          </div>

          {/* Vertical Bars matching screenshot with red bar on Oct 15 */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Oct 12', amount: 180, isOver: false },
              { day: 'Oct 13', amount: 230, isOver: false },
              { day: 'Oct 14', amount: 160, isOver: false },
              { day: 'Oct 15', amount: 330, isOver: true }, // Highlighted over-budget red bar!
              { day: 'Oct 16', amount: 185, isOver: false },
              { day: 'Oct 17', amount: 250, isOver: false },
              { day: 'Oct 18', amount: 120, isOver: false },
            ].map((item) => {
              const heightPercent = Math.round((item.amount / 350) * 100);
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                    ${item.amount}
                  </span>
                  <div className="w-full bg-surface-container-high h-36 rounded-xl flex items-end overflow-hidden p-0.5">
                    <div
                      className={`w-full rounded-lg transition-all duration-500 ${
                        item.isOver ? 'bg-rose-500 shadow-md' : 'bg-sky-400 group-hover:bg-primary'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-outline whitespace-nowrap">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
        title="Add Expense Item"
      >
        <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
              Expense Title
            </label>
            <input
              type="text"
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
              placeholder="e.g. Bullet Train Pass, Hotel Deposit"
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
                Category
              </label>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-sm focus:outline-none"
              >
                <option value="stay">Stay</option>
                <option value="transport">Transport</option>
                <option value="meals">Meals</option>
                <option value="activities">Activities</option>
                <option value="misc">Misc</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-sm focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/40">
            <button
              type="button"
              onClick={() => setShowAddExpenseModal(false)}
              className="px-4 py-2 rounded-xl border border-outline-variant text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md"
            >
              Save Expense
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
