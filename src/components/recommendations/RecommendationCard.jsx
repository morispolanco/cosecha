import React from 'react';

const RecommendationCard = ({ title, items, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-700 border-primary-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100'
  }[color] || 'bg-slate-50 text-slate-700 border-slate-100';

  const iconClasses = {
    primary: 'bg-primary-600 text-white',
    red: 'bg-red-600 text-white',
    amber: 'bg-amber-600 text-white'
  }[color] || 'bg-slate-600 text-white';

  return (
    <div className={`card border-t-4 ${color === 'primary' ? 'border-t-primary-500' : color === 'red' ? 'border-t-red-500' : color === 'amber' ? 'border-t-amber-500' : 'border-t-slate-500'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${iconClasses}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      </div>

      <ul className="space-y-3">
        {Array.isArray(items) ? items.map((item, index) => (
          <li key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${colorClasses}`}>
            <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${color === 'primary' ? 'bg-primary-500' : color === 'red' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
            <span className="text-sm font-semibold">{item}</span>
          </li>
        )) : (
          <li className={`p-3 rounded-lg border ${colorClasses} text-sm`}>
            {String(items)}
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecommendationCard;
