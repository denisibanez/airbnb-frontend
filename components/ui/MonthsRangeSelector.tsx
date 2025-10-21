import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface MonthsRangeSelectorProps {
  value?: number; // months selected (1-12)
  onChange?: (months: number) => void;
  className?: string;
  onClose?: () => void;
  language?: 'pt' | 'en';
}

const MonthsRangeSelector: React.FC<MonthsRangeSelectorProps> = ({
  value = 1,
  onChange,
  className,
  onClose,
  language = 'pt'
}) => {
  const [selectedMonths, setSelectedMonths] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const t = {
    pt: {
      title: 'Quando é a sua viagem?',
      months: 'meses',
      dateRange: (start: Date, end: Date, months: number) => {
        if (months <= 1) {
          // Até 1 mês: dia da semana + dia/mês
          const startStr = start.toLocaleDateString('pt-BR', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'numeric'
          });
          const endStr = end.toLocaleDateString('pt-BR', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'numeric'
          });
          return { start: startStr, end: endStr };
        } else {
          // Mais de 1 mês: dia de mês de ano (sem dia da semana)
          const startStr = start.toLocaleDateString('pt-BR', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric'
          });
          const endStr = end.toLocaleDateString('pt-BR', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric'
          });
          return { start: startStr, end: endStr };
        }
      }
    },
    en: {
      title: 'When is your trip?',
      months: 'months',
      dateRange: (start: Date, end: Date, months: number) => {
        if (months <= 1) {
          // Até 1 mês: dia da semana + dia/mês
          const startStr = start.toLocaleDateString('en-US', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'numeric'
          });
          const endStr = end.toLocaleDateString('en-US', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'numeric'
          });
          return { start: startStr, end: endStr };
        } else {
          // Mais de 1 mês: dia de mês de ano (sem dia da semana)
          const startStr = start.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric'
          });
          const endStr = end.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric'
          });
          return { start: startStr, end: endStr };
        }
      }
    }
  };

  const currentT = t[language];

  // Calculate date range based on selected months
  const getDateRange = (months: number) => {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + months);
    return { start, end };
  };

  // Convert months to angle (0-360 degrees)
  const monthsToAngle = (months: number) => {
    // Start from 0° (top) and go clockwise
    // Each month represents 30° (360° / 12 months)
    return (months / 12) * 360;
  };

  // Convert angle to months
  const angleToMonths = (angle: number) => {
    return Math.round((angle / 360) * 12);
  };

  // Get position on circle
  const getCirclePosition = (angle: number, radius: number) => {
    // Convert angle to radians
    // Handle should start from top (12 o'clock), going clockwise
    // Standard math: 0° = right (3 o'clock), going counter-clockwise
    // So we subtract 90° to convert from our system to standard math coordinates
    const radians = ((angle - 90) * Math.PI) / 180;
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    return { x, y };
  };

  // Handle mouse/touch events for dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !circleRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    // Calculate angle from mouse position
    // atan2 gives angle where 0° is right (3 o'clock), counter-clockwise
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    // Add 90° to shift so 0° is at top (12 o'clock)
    angle = angle + 90;
    // Normalize to 0-360
    angle = (angle + 360) % 360;
    
    const months = Math.max(1, Math.min(12, angleToMonths(angle)));
    setSelectedMonths(months);
    onChange?.(months);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Handle click on circle
  const handleCircleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    // Calculate angle from click position
    // atan2 gives angle where 0° is right (3 o'clock), counter-clockwise
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    // Add 90° to shift so 0° is at top (12 o'clock)
    angle = angle + 90;
    // Normalize to 0-360
    angle = (angle + 360) % 360;
    
    const months = Math.max(1, Math.min(12, angleToMonths(angle)));
    
    // Always set the new selection (no clearing allowed)
    setSelectedMonths(months);
    onChange?.(months);
  };

  // Update selected months when value prop changes
  useEffect(() => {
    setSelectedMonths(value);
  }, [value]);

  const currentAngle = monthsToAngle(selectedMonths);
  const radius = 90; // Circle radius - consistent with mask values
  const handlePosition = getCirclePosition(currentAngle, radius);
  const dateRange = getDateRange(selectedMonths);

  return (
    <div
      className={cn(
        'w-[380px] max-w-full    bg-white p-6 flex flex-col items-center gap-4',
        className
      )}
      data-months-selector
      onMouseDown={e => e.stopPropagation()}
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-[#222] text-center mb-2">
        {currentT.title}
      </h3>

      {/* Circular Range Selector */}
      <div className="relative">
        <div
          ref={circleRef}
          className="relative w-[240px] h-[240px] cursor-pointer"
          onClick={handleCircleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseDown={e => e.stopPropagation()}
        >
          {/* Outer ring with neumorphic design */}
          <div 
            className="absolute inset-0.5 rounded-full"
            style={{
              background: 'linear-gradient(145deg, #f8f8f8, #ffffff)',
              boxShadow: 'inset 1px 1px 2px #e8e8e8, inset -1px -1px 2px #ffffff',
              border: '6px solid #f5f5f5'
            }}
          >
            {/* Markers - smaller and more subtle */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i / 12) * 360;
              const pos = getCirclePosition(angle, radius + 5);
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                  }}
                />
              );
            })}
          </div>

          {/* Active range arc with enhanced gradient - always show since minimum is 1 */}
          {selectedMonths >= 1 && (
            <div
              className="absolute inset-2 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, 
                  #FF385C 0deg, 
                  #FF385C ${currentAngle}deg, 
                  transparent ${currentAngle}deg)`,
                mask: 'radial-gradient(circle, transparent 25px, black 115px)',
                WebkitMask: 'radial-gradient(circle, transparent 25px, black 115px)',
                filter: 'drop-shadow(0 4px 8px rgba(255, 56, 92, 0.3))',
              }}
            />
          )}

          {/* Inner circle with enhanced neumorphic design */}
          <div
            ref={centerRef}
            className="absolute inset-12 rounded-full flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #fafafa)',
              boxShadow: '4px 4px 8px #e5e5e5, -4px -4px 8px #ffffff, inset 1px 1px 1px rgba(0,0,0,0.05)',
            }}
          >
            <div className="text-7xl font-bold text-[#222] mb-0.5">
              {selectedMonths}
            </div>
            <div className="text-sm text-[#222] font-bold">
              {currentT.months}
            </div>
          </div>

          {/* Enhanced Handle - always show since minimum is 1 */}
          {selectedMonths >= 1 && (
            <div
              className="absolute w-11 h-11 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
              style={{
                left: `calc(50% + ${handlePosition.x}px)`,
                top: `calc(50% + ${handlePosition.y}px)`,
                background: 'linear-gradient(145deg, #ffffff, #fafafa)',
                border: '2.5px solid #FF385C',
                boxShadow: '1px 1px 2px #e5e5e5, -1px -1px 2px #ffffff, 0 0 0 0.5px rgba(255, 56, 92, 0.1)',
              }}
              onMouseDown={e => e.stopPropagation()}
            />
          )}
        </div>
      </div>

      {/* Date Range Display with enhanced styling - always show since minimum is 1 */}
      {selectedMonths >= 1 && (
        <div className="text-center">
          <div className="flex  gap-5">
            <div 
              className="text-sm text-[#222] font-medium"
              style={{
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textDecorationThickness: '1px',
                letterSpacing: '0.5px'
              }}
            >
              {currentT.dateRange(dateRange.start, dateRange.end, selectedMonths).start}
            </div>
            <div 
              className="text-sm text-[#222] font-medium"
              style={{
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textDecorationThickness: '1px',
                letterSpacing: '0.5px'
              }}
            >
              {currentT.dateRange(dateRange.start, dateRange.end, selectedMonths).end}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthsRangeSelector;
