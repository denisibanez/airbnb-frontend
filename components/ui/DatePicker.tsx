import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export interface DatePickerProps {
  value?: [Date | null, Date | null];
  onChange?: (range: [Date | null, Date | null]) => void;
  initialTab?: 'dates' | 'months' | 'flexible';
  initialMonth?: Date;
  initialPill?: number;
  className?: string;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(day: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return day > start && day < end;
}

const FLEX_PILLS = [
  { label: 'Exact dates' },
  { label: '± 1 day' },
  { label: '± 2 days' },
  { label: '± 3 days' },
  { label: '± 7 days' },
];

const TABS = [
  { key: 'dates', label: 'Dates' },
  { key: 'months', label: 'Months' },
  { key: 'flexible', label: 'Flexible' },
];

type TabKey = 'dates' | 'months' | 'flexible';

export default function DatePicker({
  value,
  onChange,
  initialTab = 'dates',
  initialMonth,
  initialPill = 0,
  className,
}: DatePickerProps) {
  const today = new Date();
  const [tab, setTab] = useState<TabKey>('dates');
  const [currentMonth, setCurrentMonth] = useState(initialMonth ? new Date(initialMonth) : new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<[Date | null, Date | null]>(value ?? [null, null]);
  const [hovered, setHovered] = useState<Date | null>(null);
  const [flex, setFlex] = useState(initialPill);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!gridRef.current) return;
    const buttons = Array.from(gridRef.current.querySelectorAll('button'));
    const active = document.activeElement;
    const idx = buttons.indexOf(active as HTMLButtonElement);
    if (idx === -1) return;
    if (e.key === 'ArrowRight' && idx < buttons.length - 1) {
      (buttons[idx + 1] as HTMLButtonElement).focus();
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      (buttons[idx - 1] as HTMLButtonElement).focus();
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && idx + 7 < buttons.length) {
      (buttons[idx + 7] as HTMLButtonElement).focus();
      e.preventDefault();
    }
    if (e.key === 'ArrowUp' && idx - 7 >= 0) {
      (buttons[idx - 7] as HTMLButtonElement).focus();
      e.preventDefault();
    }
    if (e.key === 'Enter' && active) {
      (active as HTMLButtonElement).click();
      e.preventDefault();
    }
  }

  function handleDayClick(day: Date) {
    if (day < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    let next: [Date | null, Date | null];
    if (!selected[0] || (selected[0] && selected[1])) {
      next = [day, null];
    } else if (selected[0] && !selected[1]) {
      if (day > selected[0]) next = [selected[0], day];
      else next = [day, selected[0]];
    } else {
      next = [null, null];
    }
    setSelected(next);
    onChange?.(next);
  }

  function renderMonth(monthDate: Date) {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: (Date | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }
    while (days.length % 7 !== 0) days.push(null);
    return (
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-2 px-2">
          <span className="font-medium text-base text-neutral-900">
            {monthDate.toLocaleString('pt-BR', { month: 'long' })} {year}
          </span>
        </div>
        <div className="grid grid-cols-7 text-xs text-neutral-500 mb-1 px-2">
          {WEEKDAYS.map(w => <div key={w} className="text-center">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 px-2" ref={gridRef} tabIndex={0} onKeyDown={handleKeyDown}>
          {days.map((date, i) => {
            if (!date) return <div key={i} />;
            const isSelected = (selected[0] && isSameDay(date, selected[0])) || (selected[1] && isSameDay(date, selected[1]));
            const inRange = selected[0] && selected[1] && isInRange(date, selected[0], selected[1]);
            const isToday = isSameDay(date, today);
            const isHovered = selected[0] && !selected[1] && hovered && isInRange(date, selected[0], hovered);
            const isDisabled = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return (
              <button
                key={i}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm transition',
                  isSelected && 'bg-primary-500 text-white',
                  inRange && 'bg-primary-100 text-primary-700',
                  isHovered && 'bg-primary-100',
                  isToday && !isSelected && 'border border-primary-500',
                  !isSelected && !inRange && !isHovered && 'hover:bg-neutral-100',
                  isDisabled && 'opacity-40 pointer-events-none',
                )}
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => setHovered(date)}
                onMouseLeave={() => setHovered(null)}
                aria-label={date.toLocaleDateString('pt-BR')}
                disabled={isDisabled}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[420px] max-w-full rounded-3xl shadow-airbnb-03 border border-neutral-200 bg-white p-6 flex flex-col gap-4">
      <div className="flex justify-center gap-2 mb-2">
        {TABS.map(t => (
          <button
            key={t.key}
            className={cn(
              'px-5 py-2 rounded-full font-medium text-base transition',
              tab === t.key ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500 hover:bg-neutral-100'
            )}
            onClick={() => setTab(t.key as TabKey)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'dates' && (
        <div className="flex gap-8 justify-center">
          <div className="w-56">
            <div className="flex items-center justify-between mb-2">
              <button
                className="p-1 rounded-full hover:bg-neutral-100"
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                aria-label="Previous month"
              >
                &#8592;
              </button>
              <span className="text-sm text-neutral-500">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <span className="w-6" />
            </div>
            {renderMonth(currentMonth)}
          </div>
          <div className="w-56">
            <div className="flex items-center justify-between mb-2">
              <span className="w-6" />
              <span className="text-sm text-neutral-500">{addMonths(currentMonth, 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <button
                className="p-1 rounded-full hover:bg-neutral-100"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                aria-label="Next month"
              >
                &#8594;
              </button>
            </div>
            {renderMonth(addMonths(currentMonth, 1))}
          </div>
        </div>
      )}
      {tab === 'dates' && (
        <div className="flex gap-2 justify-center mt-4">
          {FLEX_PILLS.map((pill, i) => (
            <button
              key={pill.label}
              className={cn(
                'px-4 py-1.5 rounded-full border text-sm font-medium transition',
                flex === i ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
              )}
              onClick={() => setFlex(i)}
            >
              {pill.label}
            </button>
          ))}
        </div>
      )}
      {tab === 'months' && (
        <div className="text-center text-neutral-500 py-12">Months picker (em breve)</div>
      )}
      {tab === 'flexible' && (
        <div className="text-center text-neutral-500 py-12">Flexible picker (em breve)</div>
      )}
    </div>
  );
} 