import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface ExperienceDatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null, range?: [Date | null, Date | null]) => void;
  className?: string;
  onClose?: () => void;
  language?: 'pt' | 'en';
}

const TRANSLATIONS = {
  pt: {
    weekdays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    quickOptions: {
      today: 'Hoje',
      tomorrow: 'Amanhã',
      thisWeekend: 'Este fim de semana'
    }
  },
  en: {
    weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    quickOptions: {
      today: 'Today',
      tomorrow: 'Tomorrow',
      thisWeekend: 'This weekend'
    }
  }
};

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
  // Normalize dates to compare only day/month/year (ignore time)
  const dayDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
  return dayDate > startDate && dayDate < endDate;
}

export default function ExperienceDatePicker({
  value,
  onChange,
  className,
  onClose,
  language = 'pt'
}: ExperienceDatePickerProps) {
  const today = new Date();
  const t = TRANSLATIONS[language] || TRANSLATIONS.pt;
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(value || null);
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([null, null]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelected(value);
      if (value) {
        setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
      }
    }
  }, [value]);

  // Sync predefined options with current selection
  useEffect(() => {
    const matchingOption = getMatchingOption();
    // This effect will trigger re-render when selection changes
    // The getMatchingOption function will determine which button should be highlighted
  }, [selected, selectedRange]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // Don't close if clicking on navigation buttons (tab switching)
      if (target.closest('button') && target.textContent && 
          (target.textContent.includes('Stays') || 
           target.textContent.includes('Experiences') || 
           target.textContent.includes('Services'))) {
        return;
      }
      // Don't close if clicking on navigation bar area
      if (target.closest('header') || target.closest('[role="tablist"]')) {
        return;
      }
      // Only close if clicking outside the component
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  function handleDayClick(day: Date) {
    if (isUnavailable(day)) return;
    
    // If no selection yet, start with this day
    if (!selected && !selectedRange[0]) {
      setSelected(day);
      setSelectedRange([null, null]);
      onChange?.(day, [null, null]);
      return;
    }
    
    // If we have a single date selected, create a range
    if (selected && !selectedRange[0]) {
      const [start, end] = day > selected ? [selected, day] : [day, selected];
      setSelectedRange([start, end]);
      setSelected(null);
      onChange?.(start, [start, end]);
      return;
    }
    
    // If we have a range, start a new selection
    if (selectedRange[0] && selectedRange[1]) {
      setSelected(day);
      setSelectedRange([null, null]);
      onChange?.(day, [null, null]);
      return;
    }
    
    // If we have a start date but no end date, complete the range
    if (selectedRange[0] && !selectedRange[1]) {
      const [start, end] = day > selectedRange[0] ? [selectedRange[0], day] : [day, selectedRange[0]];
      setSelectedRange([start, end]);
      setSelected(null);
      onChange?.(start, [start, end]);
      return;
    }
  }

  function isUnavailable(date: Date) {
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  function getQuickOptions() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Find this weekend (Friday to Sunday)
    const thisWeekendStart = new Date(today);
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
    thisWeekendStart.setDate(today.getDate() + daysUntilFriday);
    
    const thisWeekendEnd = new Date(thisWeekendStart);
    thisWeekendEnd.setDate(thisWeekendStart.getDate() + 2); // Friday + 2 = Sunday
    
    return [
      {
        label: t.quickOptions.today,
        date: today,
        subtitle: today.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: '2-digit' }),
        isRange: false
      },
      {
        label: t.quickOptions.tomorrow,
        date: tomorrow,
        subtitle: tomorrow.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: '2-digit' }),
        isRange: false
      },
      {
        label: t.quickOptions.thisWeekend,
        date: thisWeekendStart,
        endDate: thisWeekendEnd,
        subtitle: `${thisWeekendStart.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: '2-digit' })} - ${thisWeekendEnd.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short' })}`,
        isRange: true
      }
    ];
  }

  // Check if current selection matches any predefined option
  function getMatchingOption() {
    const quickOptions = getQuickOptions();
    
    for (const option of quickOptions) {
      if (option.isRange) {
        // Check if current range matches this option's range
        if (selectedRange[0] && selectedRange[1] && 
            isSameDay(selectedRange[0], option.date) && 
            option.endDate && isSameDay(selectedRange[1], option.endDate)) {
          return option;
        }
      } else {
        // Check if current single date matches this option's date
        if (selected && isSameDay(selected, option.date)) {
          return option;
        }
      }
    }
    
    return null;
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

    // Range background: para cada linha, desenhar um div bg-[#EBEBEB] se houver range
    function rangeBg(rowIdx: number) {
      if (!selectedRange[0] || !selectedRange[1]) return null;
      const startIdx = rowIdx * 7;
      const endIdx = startIdx + 7;
      let left = -1, right = -1;
      for (let i = startIdx; i < endIdx; i++) {
        const date = days[i];
        if (!date) continue;
        const inRange = isInRange(date, selectedRange[0], selectedRange[1]);
        if (inRange && left === -1) left = i - startIdx;
        if (inRange) right = i - startIdx;
      }
      if (left === -1 || right === -1) return null;
      
      return (
        <div
          className="absolute bg-[#f7f7f7] h-10"
          style={{
            left: `calc(${left * 14.285714285714286}% + ${left * -0.5}rem)`,
            right: `calc(${(6-right) * 14.285714285714286}% + ${(6-right) * -0.5}rem)`,
            top: `calc(${rowIdx}*3.25rem)`,
            zIndex: 1,
          }}
        />
      );
    }

    return (
      <div className="flex flex-col w-full relative">
        <div className="grid grid-cols-7 text-xs font-medium text-[#717171] mb-3 px-3">
          {t.weekdays.map(w => <div key={w} className="text-center">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-3 px-3 relative" style={{minHeight: `${Math.ceil(days.length/7)*2.75}rem`}}>
          {/* Range background por linha */}
          {Array.from({length: Math.ceil(days.length/7)}).map((_, rowIdx) => rangeBg(rowIdx))}
          {days.map((date, i) => {
            if (!date) return <div key={i} />;
            
            const isSelected = selected && isSameDay(date, selected);
            const isRangeStart = selectedRange[0] && isSameDay(date, selectedRange[0]);
            const isRangeEnd = selectedRange[1] && isSameDay(date, selectedRange[1]);
            const inRange = selectedRange[0] && selectedRange[1] && isInRange(date, selectedRange[0], selectedRange[1]);
            const isRangeMiddle = (inRange && !isRangeStart && !isRangeEnd && !isSelected);
            const isToday = isSameDay(date, today);
            const isDisabled = isUnavailable(date);
            const isOutMonth = date.getMonth() !== month;
            
            return (
              <button
                key={i}
                className={cn(
                  'w-10 h-10 flex items-center justify-center text-sm transition font-medium',
                  // Estado selecionado: ponta do range ou data única
                  (isSelected || isRangeStart || isRangeEnd) && 'bg-[#222] text-white font-bold border-2 border-[#222] shadow-airbnb-01 rounded-full',
                  // Estado intermediário do range: sem círculo, colado, texto preto
                  isRangeMiddle && 'w-[42px] -mx-[1px] bg-[#f7f7f7] rounded-none text-[#222] font-medium ',
                  // Estado hoje
                  isToday && !isSelected && !isRangeStart && !isRangeEnd && 'border border-[#222] rounded-full',
                  // Estado indisponível
                  isDisabled && 'text-[#B0B0B0] opacity-50 cursor-not-allowed rounded-full',
                  // Fora do mês
                  isOutMonth && 'text-neutral-300 rounded-full',
                  // Estado default: círculo e hover leve
                  (!isSelected && !inRange && !isToday && !isDisabled && !isOutMonth) && 'rounded-full hover:bg-[#222]/5 hover:text-[#222]',
                )}
                onClick={() => handleDayClick(date)}
                disabled={isDisabled}
                style={{ position: 'relative', zIndex: (isSelected || isRangeStart || isRangeEnd) ? 20 : 2 }}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const quickOptions = getQuickOptions();


  return (
    <div 
      ref={wrapperRef}
      className={cn('w-[680px] max-w-full rounded-3xl shadow-airbnb-03 border border-neutral-200 bg-white p-6 flex flex-row gap-6', className)}
      onMouseDown={e => e.stopPropagation()}
    >
      {/* Quick selection options */}
      <div className="flex flex-col gap-2 w-[190px] flex-shrink-0">
        {quickOptions.map((option, index) => {
          const matchingOption = getMatchingOption();
          const isSelected = matchingOption && matchingOption.label === option.label;
            
          return (
            <button
              key={index}
              className={cn(
                'flex flex-col items-start justify-center p-3 rounded-xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition text-left h-[102px]',
                isSelected && 'border-[#222] bg-[#F7F7F7]'
              )}
              onClick={() => {
                if (option.isRange && option.endDate) {
                  // Set range for weekend
                  setSelectedRange([option.date, option.endDate]);
                  setSelected(null); // Clear single selection
                  onChange?.(option.date, [option.date, option.endDate]); // Pass both date and range
                } else {
                  // Set single date
                  setSelected(option.date);
                  setSelectedRange([null, null]); // Clear range
                  onChange?.(option.date, [null, null]);
                }
              }}
            >
              <div className="font-semibold text-[#222] text-sm">{option.label}</div>
              <div className="text-[#717171] text-sm">{option.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Calendar */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-neutral-100 transition text-[#B0B0B0]"
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            aria-label="Previous month"
          >
            &#8592;
          </button>
          <span className="font-semibold text-base text-[#222]">
            {t.months[currentMonth.getMonth()]}, {currentMonth.getFullYear()}
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-neutral-100 transition text-[#222]"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            aria-label="Next month"
          >
            &#8594;
          </button>
        </div>
        {renderMonth(currentMonth)}
        
        {/* Close button */}
        <button
          className="mt-4 ml-auto text-base font-medium underline text-[#222] bg-transparent border-0 p-0 cursor-pointer hover:text-black"
          type="button"
          onClick={onClose}
        >
          {language === 'pt' ? 'Fechar' : 'Close'}
        </button>
      </div>
    </div>
  );
}
