import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import TextField from './TextField';

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export interface DatePickerProps {
  value?: [Date | null, Date | null];
  onChange?: (range: [Date | null, Date | null]) => void;
  initialTab?: 'dates' | 'months' | 'flexible';
  initialMonth?: Date;
  initialPill?: number;
  className?: string;
  variant?: 'modal' | 'dropdown';
  onRequestClose?: () => void;
  unavailableDates?: Date[];
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

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function DatePicker({
  value,
  onChange,
  initialTab = 'dates',
  initialMonth,
  initialPill = 0,
  className,
  variant = 'modal',
  onRequestClose,
  unavailableDates = [],
}: DatePickerProps) {
  const today = new Date();
  const [tab, setTab] = useState<TabKey>('dates');
  const [currentMonth, setCurrentMonth] = useState(initialMonth ? new Date(initialMonth) : new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<[Date | null, Date | null]>(value ?? [null, null]);
  const [hovered, setHovered] = useState<Date | null>(null);
  const [flex, setFlex] = useState(initialPill);
  const gridRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelected(value);
      if (value[0]) {
        setCurrentMonth(new Date(value[0].getFullYear(), value[0].getMonth(), 1));
      }
    }
  }, [value]);

  useEffect(() => {
    if (variant !== 'dropdown') return;
    function handle(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onRequestClose?.();
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [variant, onRequestClose]);

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

  function isRangeAvailable(start: Date, end: Date) {
    if (!unavailableDates) return true;
    let d = new Date(start);
    while (d < end) {
      d.setDate(d.getDate() + 1);
      if (unavailableDates.some(u => isSameDay(u, d))) return false;
    }
    return true;
  }

  function handleDayClick(day: Date) {
    if (isUnavailable(day)) return;
    let next: [Date | null, Date | null];
    if (!selected[0] || (selected[0] && selected[1])) {
      next = [day, null];
      setCurrentMonth(new Date(day.getFullYear(), day.getMonth(), 1)); // Garante que o mês exibido é o da data selecionada
    } else if (selected[0] && !selected[1]) {
      // Ordena as datas para garantir que selected[0] seja a menor
      const [start, end] = day > selected[0] ? [selected[0], day] : [day, selected[0]];
      if (!isRangeAvailable(start, end)) return;
      next = [start, end];
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
    // Range background: para cada linha, desenhar um div bg-[#EBEBEB] se houver range
    function rangeBg(rowIdx: number) {
      if (!selected[0] || !selected[1]) return null;
      const startIdx = rowIdx * 7;
      const endIdx = startIdx + 7;
      let left = -1, right = -1;
      for (let i = startIdx; i < endIdx; i++) {
        const date = days[i];
        if (!date) continue;
        const inRange = isInRange(date, selected[0], selected[1]);
        if (inRange && left === -1) left = i - startIdx;
        if (inRange) right = i - startIdx;
      }
      if (left === -1 || right === -1) return null;
      // Checa se o range começa/termina nesta linha
      const isRangeStart = (() => {
        if (!selected[0]) return false;
        const start = days[startIdx + left];
        if (!start) return false;
        return isSameDay(start, selected[0]);
      })();
      const isRangeEnd = (() => {
        if (!selected[1]) return false;
        const end = days[startIdx + right];
        if (!end) return false;
        return isSameDay(end, selected[1]);
      })();
      return (
        <div
          className={cn(
            'absolute bg-[#f7f7f7] h-9',
            isRangeStart ? 'rounded-l-full' : '',
            isRangeEnd ? 'rounded-r-full' : '',
          )}
          style={{
            left: `calc(${left}/8*100%)`,
            right: `calc(${6-right}/8*100%)`,
            top: `calc(${rowIdx}*2.50rem)`,
            zIndex: 1,
          }}
        />
      );
    }
    return (
      <div className="flex flex-col w-full relative">
        <div className="grid grid-cols-7 text-xs font-semibold text-neutral-500 mb-1 px-2">
          {WEEKDAYS.map(w => <div key={w} className="text-center">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-1 px-2 relative" style={{minHeight: `${Math.ceil(days.length/7)*2.25}rem`}}>
          {/* Range background por linha */}
          {Array.from({length: Math.ceil(days.length/7)}).map((_, rowIdx) => rangeBg(rowIdx))}
          {days.map((date, i) => {
            if (!date) return <div key={i} />;
            const isSelected = (selected[0] && isSameDay(date, selected[0])) || (selected[1] && isSameDay(date, selected[1]));
            const inRange = selected[0] && selected[1] && isInRange(date, selected[0], selected[1]);
            const isToday = isSameDay(date, today);
            const isHovered = selected[0] && !selected[1] && hovered && isInRange(date, selected[0], hovered);
            const isDisabled = isUnavailable(date);
            const isOutMonth = date.getMonth() !== month;
            const isRangeStart = selected[0] && isSameDay(date, selected[0]);
            const isRangeEnd = selected[1] && isSameDay(date, selected[1]);
            const isRangeMiddle = ((inRange || isHovered) && !isRangeStart && !isRangeEnd && !isSelected);
            return (
              <button
                key={i}
                className={cn(
                  // Estado selecionado: ponta do range
                  isSelected && 'bg-[#222] text-white font-bold border-2 border-[#222] shadow-airbnb-01 rounded-full',
                  // Estado intermediário do range (inclusive hover): fundo cinza, bold, sem círculo, sem padding/margin
                  ((inRange && !isSelected) || (isHovered && !isSelected)) && 'bg-[#f7f7f7] text-[#222]  p-0 m-0 w-9 h-9 flex items-center justify-center text-base transition font-medium',
                  // Intermediário do range: colado
                  isRangeMiddle && 'w-[38px] -mx-[1px] bg-[#f7f7f7]',
                  // Estado hoje
                  isToday && !isSelected && 'border border-primary-500',
                  // Estado indisponível
                  isDisabled && 'text-[#B0B0B0] line-through opacity-100 cursor-not-allowed',
                  // Fora do mês
                  isOutMonth && 'text-neutral-300',
                  // Estado default: círculo e hover leve
                  (!isSelected && !inRange && !isHovered && !isDisabled) && 'rounded-full hover:bg-[#222]/10',
                  // Estado intermediário do range (inclusive hover): sem círculo
                  ((inRange && !isSelected) || (isHovered && !isSelected)) && 'rounded-none',
                  'w-9 h-9 flex items-center justify-center text-base transition font-medium',
                )}
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => setHovered(date)}
                onMouseLeave={() => setHovered(null)}
                aria-label={date.toLocaleDateString('pt-BR')}
                disabled={isDisabled}
                style={{ position: 'relative', zIndex: isSelected ? 20 : 2 }}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function isUnavailable(date: Date) {
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return true;
    if (!unavailableDates) return false;
    return unavailableDates.some(d => isSameDay(d, date));
  }

  // Helper para formatar data ou string vazia
  function formatDate(date: Date | null) {
    return date ? date.toLocaleDateString('pt-BR') : 'Adicionar Data';
  }

  // Estados locais para edição manual dos campos
  const [checkInInput, setCheckInInput] = useState(selected[0] ? formatDate(selected[0]) : '');
  const [checkOutInput, setCheckOutInput] = useState(selected[1] ? formatDate(selected[1]) : '');
  const [checkInError, setCheckInError] = useState('');
  const [checkOutError, setCheckOutError] = useState('');

  // Sincroniza campos de texto quando selected muda
  useEffect(() => {
    setCheckInInput(selected[0] ? formatDate(selected[0]) : '');
    setCheckOutInput(selected[1] ? formatDate(selected[1]) : '');
    setCheckInError('');
    setCheckOutError('');
  }, [selected[0], selected[1]]);

  // Função para parsear data dd/MM/yyyy
  function parseDate(str: string): Date | null {
    const [d, m, y] = str.split(/[\/\-\.]/).map(Number);
    if (!d || !m || !y) return null;
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
    return date;
  }

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'bg-white rounded-3xl shadow-airbnb-03 border border-neutral-200',
        variant === 'dropdown' ? 'w-[660px] px-4 py-6' : 'w-[420px] max-w-full p-6',
        'flex flex-col gap-4',
        className
      )}
    >
      {variant === 'dropdown' ? (
        <>
          {/* Header Airbnb - condicional */}
          <div className="flex items-start justify-between gap-4 mb-6 w-full flex-wrap">
            {/* Esquerda: título/sub ou noites/datas */}
            <div className="flex flex-col min-w-[220px] flex-shrink-0">
              {selected[0] && selected[1] ? (
                <>
                  <div className="text-2xl font-bold text-[#222] leading-tight mb-1">
                    {`${Math.round((Math.abs(selected[1].getTime() - selected[0].getTime())) / (1000 * 60 * 60 * 24))} noites`}
                  </div>
                  <div className="text-base text-[#717171]">
                    {`${selected[0].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })} - ${selected[1].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-[#222] leading-tight mb-1">Selecionar datas</div>
                  <div className="text-base text-[#717171]">Estadia mínima: 2 noites</div>
                </>
              )}
            </div>
            {/* Inputs lado a lado à direita */}
            <div className="flex gap-1 flex-1 justify-end flex-shrink-0">
              {/* Check-in */}
              <div className="w-[150px] min-w-[150px] max-w-[150px] flex-shrink-0">
                <TextField
                  label="CHECK-IN"
                  size="lg"
                  value={checkInInput}
                  placeholder="Adicionar data"
                  errorMessage={checkInError}
                  onChange={val => {
                    setCheckInInput(val);
                    if (!val) {
                      setSelected([null, selected[1]]);
                      setCheckInError('');
                      onChange?.([null, selected[1]]);
                      return;
                    }
                    const parsed = parseDate(val);
                    if (!parsed) {
                      setCheckInError('Data inválida');
                      return;
                    }
                    if (isUnavailable(parsed)) {
                      setCheckInError('Data indisponível');
                      return;
                    }
                    setCheckInError('');
                    setSelected([parsed, selected[1]]);
                    onChange?.([parsed, selected[1]]);
                  }}
                  iconRight={selected[0] ? (
                    <button
                      type="button"
                      tabIndex={-1}
                      className="text-[#717171] cursor-pointer hover:text-[#222] absolute right-1 top-1/2 z-50 -translate-y-1/2"
                      onClick={() => {
                        setSelected([null, null]);
                        onChange?.([null, null]);
                      }}
                    >
                      ×
                    </button>
                  ) : undefined}
                />
              </div>
              {/* Check-out */}
              <div className="w-[150px] min-w-[150px] max-w-[150px] flex-shrink-0">
                <TextField
                  label="CHECK-OUT"
                  size="lg"
                  value={checkOutInput}
                  placeholder="Adicionar data"
                  disabled={!selected[0]}
                  errorMessage={checkOutError}
                  onChange={val => {
                    setCheckOutInput(val);
                    if (!val) {
                      setSelected([selected[0], null]);
                      setCheckOutError('');
                      onChange?.([selected[0], null]);
                      return;
                    }
                    const parsed = parseDate(val);
                    if (!parsed) {
                      setCheckOutError('Data inválida');
                      return;
                    }
                    if (isUnavailable(parsed)) {
                      setCheckOutError('Data indisponível');
                      return;
                    }
                    setCheckOutError('');
                    setSelected([selected[0], parsed]);
                    onChange?.([selected[0], parsed]);
                  }}
                  iconRight={selected[1] ? (
                    <button
                      type="button"
                      tabIndex={-1}
                      className="text-[#717171] cursor-pointer hover:text-[#222] absolute right-1 top-1/2 -translate-y-1/2 z-50"
                      onClick={() => {
                        setSelected([selected[0], null]);
                        onChange?.([selected[0], null]);
                      }}
                    >
                      ×
                    </button>
                  ) : undefined}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
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
      )}
      {tab === 'dates' && (
        <div className="flex justify-between ">
          <div className="w-4xl mr-4">
            <div className="flex items-center justify-between mb-2">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-neutral-100 transition"
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                aria-label="Previous month"
              >
                &#8592;
              </button>
              
              <span className="font-bold text-lg text-[#222] capitalize">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <span className="w-6" />
            </div>
            {renderMonth(currentMonth)}
          </div>
          <div className="w-4xl ml-4">
            <div className="flex items-center justify-between mb-2">
              <span className="w-6" />
              <span className="font-bold text-lg text-[#222] capitalize">{addMonths(currentMonth, 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-neutral-100 transition"
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
      {variant === 'dropdown' && (
        <div className="flex justify-end items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-[#f7f7f7] text-[#222] text-sm font-medium hover:bg-[#EBEBEB] transition"
            onClick={() => { setSelected([null, null]); onChange?.([null, null]); }}
          >
            Limpar datas
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[#222] text-white text-sm font-medium hover:bg-neutral-800"
            onClick={onRequestClose}
          >
            Fechar
          </button>
        </div>
      )}
      {variant !== 'dropdown' && tab === 'dates' && (
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
      {variant !== 'dropdown' && tab === 'months' && (
        <div className="text-center text-neutral-500 py-12">Months picker (em breve)</div>
      )}
      {variant !== 'dropdown' && tab === 'flexible' && (
        <div className="text-center text-neutral-500 py-12">Flexible picker (em breve)</div>
      )}
    </div>
  );
} 