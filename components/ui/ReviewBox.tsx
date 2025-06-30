import React from 'react';
import { cn } from '@/lib/utils';

export interface ReviewCriterion {
  label: string;
  value: number; // 0-5
}
export interface ReviewData {
  user: {
    name: string;
    avatarUrl?: string;
    date: string;
  };
  text: string;
}
export interface ReviewBoxProps {
  criteria: ReviewCriterion[];
  review: ReviewData;
  className?: string;
}

export default function ReviewBox({ criteria, review, className }: ReviewBoxProps) {
  return (
    <div className={cn('bg-[#FAFAFA] p-6 rounded-xl border-2 border-dashed border-violet-300', className)}>
      <div className="font-semibold text-violet-600 flex items-center gap-2 mb-3">
        <span className="text-[15px]">◆</span>
        <span>Reviews</span>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Critérios */}
        <div className="flex-1 flex flex-col gap-2 min-w-[180px]">
          {criteria.map(c => (
            <div key={c.label} className="flex items-center gap-2">
              <span className="w-28 text-sm text-neutral-700">{c.label}</span>
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-neutral-700 rounded-full transition-all"
                  style={{ width: `${(c.value / 5) * 100}%` }}
                />
              </div>
              <span className="w-8 text-sm text-neutral-700 text-right">{c.value.toFixed(1)}</span>
            </div>
          ))}
        </div>
        {/* Review */}
        <div className="flex-1 flex items-start gap-4">
          <div className="flex-shrink-0">
            {review.user.avatarUrl ? (
              <img src={review.user.avatarUrl} alt={review.user.name} className="w-10 h-10 rounded-full bg-neutral-200 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-neutral-200" />
            )}
          </div>
          <div>
            <div className="font-semibold text-neutral-900 leading-tight">{review.user.name}</div>
            <div className="text-xs text-neutral-500 mb-1">{review.user.date}</div>
            <div className="text-sm text-neutral-800 leading-snug">{review.text}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 