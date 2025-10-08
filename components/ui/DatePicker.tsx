import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import TextField from './TextField';

const TRANSLATIONS = {
  pt: {
    weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    tabs: {
      dates: 'Datas',
      months: 'Meses', 
      flexible: 'Flexível'
    },
    flexPills: [
      'Datas exatas',
      '± 1 dia',
      '± 2 dias', 
      '± 3 dias',
      '± 7 dias'
    ],
    buttons: {
      clear: 'Limpar datas',
      close: 'Fechar'
    },
    labels: {
      checkIn: 'CHECK-IN',
      checkOut: 'CHECK-OUT',
      addDate: 'Adicionar data',
      selectDates: 'Selecionar datas',
      minStay: 'Estadia mínima: 2 noites',
      nights: 'noites'
    },
    errors: {
      invalidDate: 'Data inválida',
      unavailableDate: 'Data indisponível'
    }
  },
  en: {
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    tabs: {
      dates: 'Dates',
      months: 'Months',
      flexible: 'Flexible'
    },
    flexPills: [
      'Exact dates',
      '± 1 day',
      '± 2 days',
      '± 3 days', 
      '± 7 days'
    ],
    buttons: {
      clear: 'Clear dates',
      close: 'Close'
    },
    labels: {
      checkIn: 'CHECK-IN',
      checkOut: 'CHECK-OUT',
      addDate: 'Add date',
      selectDates: 'Select dates',
      minStay: 'Minimum stay: 2 nights',
      nights: 'nights'
    },
    errors: {
      invalidDate: 'Invalid date',
      unavailableDate: 'Unavailable date'
    }
  }
};

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
  language?: 'pt' | 'en';
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

const TABS = [
  { key: 'dates' },
  { key: 'months' },
  { key: 'flexible' },
];

type TabKey = 'dates' | 'months' | 'flexible';


export default function DatePicker({
  value,
  onChange,
  initialMonth,
  initialPill = 0,
  className,
  variant = 'modal',
  onRequestClose,
  unavailableDates = [],
  language = 'pt',
}: DatePickerProps) {
  const today = new Date();
  const t = TRANSLATIONS[language] || TRANSLATIONS.pt;
  const [tab, setTab] = useState<TabKey>('dates');
  const [currentMonth, setCurrentMonth] = useState(initialMonth ? new Date(initialMonth) : new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<[Date | null, Date | null]>(value ?? [null, null]);
  const [hovered, setHovered] = useState<Date | null>(null);
  const [flex, setFlex] = useState(initialPill);
  const [isFlexibleMode, setIsFlexibleMode] = useState(false);
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


  function isRangeAvailable(start: Date, end: Date) {
    if (!unavailableDates) return true;
    const d = new Date(start);
    while (d < end) {
      d.setDate(d.getDate() + 1);
      if (unavailableDates.some(u => isSameDay(u, d))) return false;
    }
    return true;
  }

  function handleDayClick(day: Date) {
    if (isUnavailable(day)) return;
    
    // Se estiver no modo flexível, não permite seleção manual
    if (isFlexibleMode) return;
    
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

  function handleFlexPillClick(pillIndex: number) {
    setFlex(pillIndex);
    
    if (pillIndex === 0) {
      // "Datas exatas" - modo livre
      setIsFlexibleMode(false);
      setSelected([null, null]);
      onChange?.([null, null]);
    } else {
      // "+ X dias" - seleção automática
      setIsFlexibleMode(true);
      const today = new Date();
      const daysToAdd = pillIndex; // 1, 2, 3, 7 dias
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + daysToAdd);
      
      const newSelection: [Date, Date] = [today, endDate];
      setSelected(newSelection);
      onChange?.(newSelection);
      
      // Ajusta o mês exibido para mostrar a data de início
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    }
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
      
      // Se for modo flexível, usar cálculo diferente para evitar extrapolação
      const isFlexibleRange = isFlexibleMode;
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
            'absolute bg-[#f7f7f7] h-10',
            isRangeStart ? 'rounded-l-full' : '',
            isRangeEnd ? 'rounded-r-full' : '',
          )}
          style={{
            left: `calc(${left * 14.285714285714286}% + ${left * -0.5}rem)`,
            right: isFlexibleRange 
              ? `calc(${(6-right) * 14.285714285714286}% + ${(6-right) * 0.75}rem)`
              : `calc(${(6-right) * 14.285714285714286}% + ${(6-right) * -0.5}rem)`,
            top: `calc(${rowIdx}*3.25rem)`,
            zIndex: 1,
          }}
        />
      );
    }
    
    // Hover background: para cada linha, desenhar um div bg-[#f7f7f7] se houver hover
    function hoverBg(rowIdx: number) {
      if (!selected[0] || !hovered || selected[1]) return null;
      const startIdx = rowIdx * 7;
      const endIdx = startIdx + 7;
      let left = -1, right = -1;
      for (let i = startIdx; i < endIdx; i++) {
        const date = days[i];
        if (!date) continue;
        const inHoverRange = date >= selected[0] && date <= hovered;
        if (inHoverRange && left === -1) left = i - startIdx;
        if (inHoverRange) right = i - startIdx;
      }
      if (left === -1 || right === -1) return null;
      
      return (
        <div
          className="absolute bg-[#f7f7f7] h-10 opacity-50"
          style={{
            left: `calc(${left * 14.285714285714286}% + ${left * 0.75}rem)`,
            right: `calc(${(6-right) * 14.285714285714286}% + ${(6-right) * 0.75}rem)`,
            top: `calc(${rowIdx}*3.25rem)`,
            zIndex: 1,
          }}
        />
      );
    }
    
    return (
      <div className="flex flex-col w-full relative">
        <div className="grid grid-cols-7 text-xs font-medium text-[#717171] mb-3 px-3">
          {(t?.weekdays || []).map(w => <div key={w} className="text-center">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-3 px-3 relative" style={{minHeight: `${Math.ceil(days.length/7)*2.75}rem`}}>
          {/* Range background por linha */}
          {Array.from({length: Math.ceil(days.length/7)}).map((_, rowIdx) => rangeBg(rowIdx))}
          {/* Hover background por linha */}
          {Array.from({length: Math.ceil(days.length/7)}).map((_, rowIdx) => hoverBg(rowIdx))}
          {days.map((date, i) => {
            if (!date) return <div key={i} />;
            const isSelected = (selected[0] && isSameDay(date, selected[0])) || (selected[1] && isSameDay(date, selected[1]));
            const inRange = selected[0] && selected[1] && isInRange(date, selected[0], selected[1]);
            const isToday = isSameDay(date, today);
            const isHovered = selected[0] && !selected[1] && hovered && date >= selected[0] && date <= hovered;
            const isDisabled = isUnavailable(date);
            const isOutMonth = date.getMonth() !== month;
            const isRangeStart = selected[0] && isSameDay(date, selected[0]);
            const isRangeEnd = selected[1] && isSameDay(date, selected[1]);
            const isRangeMiddle = (inRange && !isRangeStart && !isRangeEnd && !isSelected);
            return (
              <button
                key={i}
                className={cn(
                  'w-10 h-10 flex items-center justify-center text-sm transition font-medium',
                  // Estado selecionado: ponta do range
                  isSelected && 'bg-[#222] text-white font-bold border-2 border-[#222] shadow-airbnb-01 rounded-full',
                  // Estado intermediário do range: sem círculo, colado
                  isRangeMiddle && 'w-[42px] -mx-[1px] bg-[#f7f7f7] rounded-none',
                  // Estado hoje
                  isToday && !isSelected && 'border border-[#222] rounded-full',
                  // Estado indisponível
                  isDisabled && 'text-[#B0B0B0] line-through opacity-100 cursor-not-allowed rounded-full',
                  // Fora do mês
                  isOutMonth && 'text-neutral-300 rounded-full',
                  // Modo flexível ativo - desabilita interação
                  isFlexibleMode && !isSelected && !inRange && 'opacity-50 cursor-not-allowed',
                  // Estado default: círculo e hover leve
                  (!isSelected && !inRange && !isHovered && !isDisabled && !isOutMonth && !isFlexibleMode) && 'rounded-full hover:bg-[#222]/5',
                )}
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => !isFlexibleMode && setHovered(date)}
                onMouseLeave={() => setHovered(null)}
                aria-label={date.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}
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
    return date ? date.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US') : (t?.labels?.addDate || 'Adicionar data');
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
        variant === 'dropdown' ? 'w-[720px] px-8 py-10' : 'w-[842px] max-w-full p-8',
        'flex flex-col gap-6',
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
                    {`${Math.round((Math.abs(selected[1].getTime() - selected[0].getTime())) / (1000 * 60 * 60 * 24))} ${t?.labels?.nights || 'noites'}`}
                  </div>
                  <div className="text-base text-[#717171]">
                    {`${selected[0].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })} - ${selected[1].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-[#222] leading-tight mb-1">{t?.labels?.selectDates || 'Selecionar datas'}</div>
                  <div className="text-base text-[#717171]">{t?.labels?.minStay || 'Estadia mínima: 2 noites'}</div>
                </>
              )}
            </div>
            {/* Inputs lado a lado à direita */}
            <div className="flex gap-1 flex-1 justify-end flex-shrink-0">
              {/* Check-in */}
              <div className="w-[150px] min-w-[150px] max-w-[150px] flex-shrink-0">
                <TextField
                  label={t?.labels?.checkIn || 'CHECK-IN'}
                  size="lg"
                  value={checkInInput}
                  placeholder={t?.labels?.addDate || 'Adicionar data'}
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
                      setCheckInError(t?.errors?.invalidDate || 'Data inválida');
                      return;
                    }
                    if (isUnavailable(parsed)) {
                      setCheckInError(t?.errors?.unavailableDate || 'Data indisponível');
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
                  label={t?.labels?.checkOut || 'CHECK-OUT'}
                  size="lg"
                  value={checkOutInput}
                  placeholder={t?.labels?.addDate || 'Adicionar data'}
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
                      setCheckOutError(t?.errors?.invalidDate || 'Data inválida');
                      return;
                    }
                    if (isUnavailable(parsed)) {
                      setCheckOutError(t?.errors?.unavailableDate || 'Data indisponível');
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
        <div className="flex justify-center mb-6">
          <div className="flex justify-between items-center p-3 gap-1  bg-[#D9d9d9] rounded-full w-[475px] h-[62px]">
            {TABS.map(t => (
              <button
                key={t.key}
                className={cn(
                  'capitalize font-bold px-4 py-2 rounded-full  text-sm transition w-[124px] h-[46px] flex items-center justify-center',
                  tab === t.key 
                    ? 'bg-white text-[#222] shadow-sm' 
                    : 'text-[#717171] hover:bg-white/50'
                )}
                onClick={() => setTab(t.key as TabKey)}
              >
                {t?.tabs?.[t.key as keyof typeof t.tabs] || t.key}
              </button>
            ))}
          </div>
        </div>
      )}
      {tab === 'dates' && (
        <div className="flex gap-12">
          {/* Calendário esquerdo */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-neutral-100 transition"
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                aria-label="Previous month"
              >
                &#8592;
              </button>
              <span className="font-semibold text-base text-[#222]">
                {t?.months?.[currentMonth.getMonth()] || currentMonth.toLocaleString('default', { month: 'long' })}
              </span>
              <span className="w-8" />
            </div>
            {renderMonth(currentMonth)}
          </div>
          
          {/* Calendário direito */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="w-8" />
              <span className="font-semibold text-base text-[#222]">
                {t?.months?.[addMonths(currentMonth, 1).getMonth()] || addMonths(currentMonth, 1).toLocaleString('default', { month: 'long' })}
              </span>
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
              {t?.buttons?.clear || 'Limpar datas'}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-[#222] text-white text-sm font-medium hover:bg-neutral-800"
              onClick={onRequestClose}
            >
              {t?.buttons?.close || 'Fechar'}
            </button>
        </div>
      )}
      {variant !== 'dropdown' && tab === 'dates' && (
        <div className="flex gap-2 justify-start mt-6">
          {(t?.flexPills || []).map((pill, i) => (
            <button
              key={pill}
              className={cn(
                'px-4 py-2 rounded-full border border-[#000000] text-sm font-medium transition w-[auto] h-[38px]',
                flex === i 
                  ? 'bg-[#222] text-white border-[#222]' 
                  : 'text-[#717171] hover:bg-[#F7F7F7] border-[#000000]'
              )}
              onClick={() => handleFlexPillClick(i)}
            >
              {pill}
            </button>
          ))}
        </div>
      )}
      {variant !== 'dropdown' && tab === 'months' && (
        <div className="text-center text-neutral-500 py-12">
          {language === 'pt' ? 'Seletor de meses (em breve)' : 'Months picker (coming soon)'}
        </div>
      )}
      {variant !== 'dropdown' && tab === 'flexible' && (
        <div className="text-center text-neutral-500 py-12">
          {language === 'pt' ? 'Seletor flexível (em breve)' : 'Flexible picker (coming soon)'}
        </div>
      )}
    </div>
  );
} 
