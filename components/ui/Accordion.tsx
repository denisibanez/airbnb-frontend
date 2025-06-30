import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  link?: { label: string; href: string };
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, className }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndexes((prev) => {
      if (allowMultiple) {
        return prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx];
      } else {
        return prev[0] === idx ? [] : [idx];
      }
    });
  };

  return (
    <div className={cn('w-full', className)}>
      {items.map((item, idx) => {
        const open = openIndexes.includes(idx);
        return (
          <div key={idx} className="border-b border-[#E0E0E0]">
            <button
              className={cn(
                'w-full flex items-center justify-between py-4 text-left transition-colors',
                'cursor-pointer',
                open ? 'font-semibold text-[#222]' : 'font-normal text-[#222] hover:bg-[#F7F7F7]'
              )}
              aria-expanded={open}
              onClick={() => toggle(idx)}
            >
              <span>{item.title}</span>
              <span
                className={cn(
                  'ml-2 transition-transform duration-200',
                  open ? 'rotate-180' : 'rotate-0'
                )}
                aria-hidden
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                open ? 'max-h-96 opacity-100 py-1' : 'max-h-0 opacity-0 py-0'
              )}
            >
              {open && (
                <div className="pl-0 pr-2 pb-4 text-[#717171] text-base">
                  <div>{item.content}</div>
                  {item.link && (
                    <a
                      href={item.link.href}
                      className="block mt-3 text-sm font-medium text-[#222] underline hover:text-[#FF385C] transition-colors"
                      target="_blank" rel="noopener noreferrer"
                    >
                      {item.link.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion; 