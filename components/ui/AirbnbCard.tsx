import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import {
  IconsInterfaceHeart,
  IconsInterfaceHeartFull,
  IconsInterfaceChevronLeft,
  IconsInterfaceChevronRight,
  IconsInterfaceStarFull,
  IconsNeonSuperhost,
} from './Icons';

export type AirbnbCardVariant = 'listing' | 'simple' | 'dates' | 'reserve' | 'priceDetails';

type AirbnbCardBaseProps = {
  variant?: AirbnbCardVariant;
  images?: string[];
  imageUrl?: string;
  title?: string;
  location?: string;
  rating?: number;
  reviewsCount?: number;
  price?: string;
  priceOld?: string;
  priceTotal?: string;
  dates?: string;
  beds?: string;
  badge?: string;
  favorite?: boolean;
  onFavoriteClick?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  details?: { label: string; value: string; highlight?: boolean }[];
  summary?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  showFooter?: boolean;
  skeleton?: boolean;
};

import aircover from '@/assets/images/aircover.png';

interface AirbnbCardProps extends AirbnbCardBaseProps {
  title?: string;
}

const AirbnbCard: React.FC<AirbnbCardProps> = ({
  variant = 'listing',
  images,
  imageUrl,
  title,
  location,
  rating,
  reviewsCount,
  price,
  priceOld,
  priceTotal,
  dates,
  beds,
  badge,
  favorite,
  onFavoriteClick,
  actionLabel,
  onAction,
  details,
  summary,
  className,
  children,
  showFooter,
  skeleton,
}) => {
  // Carrossel de imagens
  const imgs = images && images.length > 0 ? images : imageUrl ? [imageUrl] : [];
  const [imgIdx, setImgIdx] = useState(0);
  const hasCarousel = imgs.length > 1;

  // Skeleton visual
  if (skeleton) {
    return (
      <div className={cn('bg-transparent rounded-[16px] w-[308px] flex flex-col overflow-visible relative animate-pulse', className)}>
        <div className="relative w-full h-[204px] rounded-[16px] bg-neutral-200 flex items-center justify-center overflow-hidden shadow-airbnb-02" />
        <div className="flex-1 flex flex-col py-4 gap-1 bg-white rounded-b-[12px] ">
          <div className="flex items-center">
            <div className="h-4 bg-neutral-200 rounded w-2/3" />
            <div className="h-4 bg-neutral-200 rounded w-1/6 ml-auto" />
          </div>
          <div className="h-4 bg-neutral-200 rounded w-full " />
          <div className="h-4 bg-neutral-200 rounded w-full mb-1" />
          <div className="h-4 bg-neutral-200 rounded w-full mb-1" />
        </div>
      </div>
    );
  }

  // Card de imóvel/listagem
  if (variant === 'listing' || variant === 'dates') {
    // Decide se mostra footer branco
    const footer = showFooter ?? (variant === 'dates');
    return (
      <div className={cn('bg-transparent rounded-[16px] w-[308px] flex flex-col overflow-visible relative', className)}>
        {/* Imagem/carrossel */}
        <div className={cn('relative w-full h-[204px] rounded-[16px] bg-[#E0E0E0] flex items-center justify-center overflow-hidden shadow-airbnb-02', footer && 'shadow-airbnb-03')}>          
          {/* Badge */}
          {badge && (
            <span className="absolute top-3 left-3 bg-white text-[13px] font-semibold px-2.5 py-1 rounded-[4px] shadow-airbnb-01 z-10 leading-tight text-[#222]">{badge}</span>
          )}
          {/* Carrossel */}
          {imgs.length > 0 ? (
            <>
              <img
                src={imgs[imgIdx]}
                alt={title}
                className="object-cover w-full h-full transition-all duration-300 select-none"
                draggable={false}
                style={{ borderRadius: 16 }}
              />
              {/* Dots */}
              {hasCarousel && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {imgs.map((_, i) => (
                    <span
                      key={i}
                      className={cn('block w-1.5 h-1.5 rounded-full transition-all cursor-pointer',
                        i === imgIdx ? 'bg-white' : 'bg-[#DDDDDD]')}
                      onClick={e => { e.stopPropagation(); setImgIdx(i); }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ir para imagem ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <img
              src="https://www.getchalet.com/images/placeholder.svg"
              alt="Placeholder"
              className="object-cover w-full h-full select-none"
              draggable={false}
              style={{ borderRadius: 16 }}
            />
          )}
          {/* Botão favorito */}
          <button
            className={cn(
              'absolute top-2 right-2 z-10 flex items-center justify-center transition',
              'w-8 h-8 p-0',
              'transition-transform duration-150',
              'hover:scale-110',
              'cursor-pointer',
              favorite ? '' : ''
            )}
            onClick={onFavoriteClick}
            aria-label="Favorito"
            type="button"
            style={{ background: 'none', border: 'none', boxShadow: 'none' }}
          >
            {favorite ? (
              <IconsInterfaceHeartFull className="w-6 h-6 text-[#FF385C] transition-colors duration-200" />
            ) : (
              <IconsInterfaceHeart className="w-6 h-6 text-[#222] transition-colors duration-200" />
            )}
          </button>
        </div>
        {/* Footer branco (com sombra) */}
        {footer ? (
          <div className="relative -mt-7 z-10 px-4">
            <div className="bg-white rounded-[12px] shadow-airbnb-03 px-5 py-4 flex flex-col gap-1 border border-[#E0E0E0]">
              {/* Primeira linha: título */}
              <div className="font-bold text-[17px] text-[#222] truncate leading-[1.15] mb-0.5" title={title}>{title}</div>
              {/* Segunda linha: preço + datas + avaliação */}
              <div className="flex items-center justify-between leading-[1.15] mt-1">
                <div className="flex items-center gap-1 min-w-0">
                  {priceOld && <span className="text-[15px] text-[#B0B0B0] line-through font-normal">{priceOld}</span>}
                  {price && <span className="font-bold text-[15px] text-[#222]">{price}</span>}
                  <span className="text-[15px] text-[#717171] font-normal">night</span>
                  {dates && <>
                    <span className="mx-1 text-[15px] text-[#222]">&middot;</span>
                    <span className="text-[15px] text-[#717171] font-normal truncate">{dates}</span>
                  </>}
                </div>
                {rating !== undefined && (
                  <span className="flex items-center gap-0.5 text-[13px] text-[#222] font-medium ml-2 leading-[1.15] flex-shrink-0">
                    <IconsInterfaceStarFull className="w-4 h-4 text-[#222]" />
                    {rating.toFixed(2)}
                    {reviewsCount !== undefined && <span className="text-[#717171] font-normal">({reviewsCount})</span>}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Infos abaixo da imagem
          <div className="flex-1 flex flex-col py-3 gap-1">
            {/* Primeira linha: título + avaliação */}
            <div className="flex items-center justify-between min-h-[18px] leading-[1.15]">
              <span className="font-bold text-[17px] text-[#222] truncate leading-[1.15]" title={title}>{title}</span>
              {rating !== undefined && (
                <span className="flex items-center gap-0.5 text-[13px] text-[#222] font-medium ml-2 leading-[1.15]">
                  <IconsInterfaceStarFull className="w-4 h-4 text-[#222]" />
                  {rating.toFixed(2)}
                  {reviewsCount !== undefined && <span className="text-[#717171] font-normal">({reviewsCount})</span>}
                </span>
              )}
            </div>
            {/* Segunda linha: subtítulo (location) */}
            {location && <div className="text-[15px] text-[#717171] truncate leading-[1.15]">{location}</div>}
            {/* Terceira linha: detalhes (beds) */}
            {beds && <div className="text-[15px] text-[#717171] leading-[1.15]">{beds}</div>}
            {/* Quarta linha: datas */}
            {dates && <div className="text-[15px] text-[#717171] truncate leading-[1.15]">{dates}</div>}
            {/* Quinta linha: preço, desconto, total */}
            <div className="flex items-center gap-1 leading-[1.15] mt-1">
              {priceOld && <span className="text-[15px] text-[#B0B0B0] line-through font-normal">{priceOld}</span>}
              {price && <span className="font-bold text-[15px] text-[#222]">{price}</span>}
              <span className="text-[15px] text-[#717171] font-normal">night</span>
              {priceTotal && <>
                <span className="mx-1 text-[15px] text-[#222]">&middot;</span>
                <span className="text-[15px] text-[#717171] font-normal">{priceTotal} total</span>
              </>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Card simples
  if (variant === 'simple') {
    return (
      <div className={cn('bg-white rounded-xl shadow-sm border border-[#E0E0E0] w-[308px] flex flex-col overflow-hidden', className)}>
        <div className="w-full h-[204px]  flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
          ) : (
            <img
              src="https://www.getchalet.com/images/placeholder.svg"
              alt="Placeholder"
              className="w-full h-full select-none object-cover"
              draggable={false}

            />
          )}
        </div>
        <div className="flex-1 flex flex-col px-3 py-3 gap-1">
          {/* Primeira linha: título + avaliação */}
          <div className="flex items-center justify-between min-h-[18px] leading-[1.15]">
            <span className="font-bold text-[17px] text-[#222] truncate leading-[1.15]" title={title}>{title}</span>
            {rating !== undefined && (
              <span className="flex items-center gap-0.5 text-[13px] text-[#222] font-medium ml-2 leading-[1.15] flex-shrink-0">
                <IconsInterfaceStarFull className="w-4 h-4 text-[#222]" />
                {rating.toFixed(2)}
                {reviewsCount !== undefined && <span className="text-[#717171] font-normal">({reviewsCount})</span>}
              </span>
            )}
          </div>
          {/* Segunda linha: preço + datas */}
          <div className="flex items-center gap-1 leading-[1.15] mt-1">
            {priceOld && <span className="text-[15px] text-[#B0B0B0] line-through font-normal">{priceOld}</span>}
            {price && <span className="font-bold text-[15px] text-[#222]">{price}</span>}
            <span className="text-[15px] text-[#717171] font-normal">night</span>
            {dates && <>
              <span className="mx-1 text-[15px] text-[#222]">&middot;</span>
              <span className="text-[15px] text-[#717171] font-normal truncate">{dates}</span>
            </>}
          </div>
        </div>
      </div>
    );
  }

  // Card de reserva
  if (variant === 'reserve') {
    return (
      <div className={cn('bg-white rounded-2xl shadow-airbnb-03 border border-[#E0E0E0] w-[375px] p-6 flex flex-col gap-4', className)}>
        {/* Header: preço + avaliação */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {priceOld && <span className="text-xl text-[#B0B0B0] line-through font-normal">{priceOld}</span>}
            {price && <span className="text-xl font-bold text-[#222]">{price}</span>}
            <span className="text-base text-[#717171] font-normal">night</span>
          </div>
          {rating !== undefined && (
            <span className="flex items-center text-base text-[#222] font-bold">
              <IconsInterfaceStarFull className="w-5 h-5 text-[#222]" />
              <span className="font-bold text-[#222]">{rating.toFixed(2)}</span>
              <span className="text-[#B0B0B0] mx-1">·</span>
              {reviewsCount !== undefined && <span className="text-[#717171] font-normal">{reviewsCount} reviews</span>}
            </span>
          )}
        </div>
        {/* Box de datas e hóspedes */}
        <div className="rounded-xl border border-[#B0B0B0] divide-y divide-[#B0B0B0] overflow-hidden mb-2">
          <div className="flex divide-x divide-[#B0B0B0]">
            <div className="flex-1 p-3">
              <div className="text-xs font-semibold uppercase ">Check-in</div>
              <div className="text-base text-[#717171]">{details?.[0]?.value || '--'}</div>
            </div>
            <div className="flex-1 p-3">
              <div className="text-xs font-semibold uppercase ">Checkout</div>
              <div className="text-base text-[#717171]">{details?.[1]?.value || '--'}</div>
            </div>
          </div>
          <div className="p-3">
            <div className="text-xs font-semibold uppercase">Guests</div>
            <div className="text-base text-[#717171]">{details?.[2]?.value || '--'}</div>
          </div>
        </div>
        {/* Botão Reserve */}
        {actionLabel && (
          <button
            className="w-full bg-gradient-to-r from-[#EB4A5A] to-[#C13584] text-white font-semibold rounded-xl py-3 text-lg hover:brightness-105 transition-colors shadow"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
        {/* Texto auxiliar */}
        <div className="text-center text-[#717171] text-sm mb-2">You won't be charged yet</div>
        {/* Tabela de valores */}
        {details && (
          <div className="mb-2">
            {details.slice(3, -1).map((d, i) => (
              <div key={i} className="flex justify-between py-2 text-base">
                <span className="underline">{d.label}</span>
                <span className={cn(
                  d.label.toLowerCase().includes('discount') ? 'text-green-600 font-medium' : '',
                  d.highlight ? 'font-semibold text-[#222]' : '',
                )}>{d.value}</span>
              </div>
            ))}
          </div>
        )}
        {/* Total */}
        {details && details.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-[#E0E0E0] mt-2">
            <span className="font-bold text-lg text-[#222]">{details[details.length-1].label}</span>
            <span className=" text-lg text-[#222]">{details[details.length-1].value}</span>
          </div>
        )}
      </div>
    );
  }

  // Card de detalhes de preço (priceDetails)
  if (variant === 'priceDetails') {
    return (
      <div className={cn('bg-white rounded-[16px] shadow-airbnb-03 border border-[#E0E0E0] max-w-[477px] w-full px-5 py-5 flex flex-col', className)}>
        {/* Imagem e título */}
        <div className="flex gap-3 mb-1 items-start">
          {imgs.length > 0 ? (
            <img
              src={imgs[0]}
              alt={title}
              className="w-[124px] h-[106px] rounded-lg object-cover flex-shrink-0"
              draggable={false}
            />
          ) : (
            <img
              src="https://www.getchalet.com/images/placeholder.svg"
              alt="Placeholder"
              className="w-[124px] h-[106px] rounded-lg object-cover flex-shrink-0"
              draggable={false}
            />
          )}
          <div className='flex gap-14 flex-col'>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[11px] font-semibold text-[#B0B0B0] leading-tight">Entire cabin</div>
            <div className="text-[14px] text-[#222] font-normal leading-tight">{title}</div>
          </div>

           {/* Avaliação, reviews, superhost */}
          <div className="flex items-center gap-2 text-[12px] text-[#222] mb-1">
            <IconsInterfaceStarFull className="w-4 h-4 text-[#222]" />
            <span className="font-semibold">{rating?.toFixed(2)}</span>
            {reviewsCount !== undefined && <span className="text-[#717171]">({reviewsCount} reviews)</span>}
            <span className="mx-1 text-[#B0B0B0]">·</span>
            <IconsNeonSuperhost className="w-4 h-4 text-[#222]" />
            <span className="text-[#717171]">Superhost</span>
          </div>
          </div>
        </div>
       
        {/* Proteção aircover */}
        <hr className="border-[#E0E0E0] mt-4 mb-2" />
        <div className="text-[13px] text-[#717171] my-3 flex items-center">Your booking is protected by 
          <img src={aircover.src} alt="aircover" style={{ display: 'inline', height: 16, marginLeft: 4, verticalAlign: 'middle' }} className='mb-1' />
        </div>
        <hr className="border-[#E0E0E0] mt-2 mb-4" />
        {/* Título Price details */}
        <div className="font-medium text-[#222] mb-2 text-2xl">Price details</div>
        {/* Tabela de valores */}
        {details && (
          <div className="mb-2">
            {details.slice(0, -1).map((d, i) => (
              <div key={i} className="flex justify-between py-1 text-[15px]">
                <span className="underline">{d.label}</span>
                <span>{d.value}</span>
              </div>
            ))}
          </div>
        )}
        <hr className="border-[#E0E0E0] my-2" />
        {/* Total */}
        {details && details.length > 0 && (
          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-base text-[#222]">{details[details.length-1].label}</span>
            <span className=" text-base text-[#222]">{details[details.length-1].value}</span>
          </div>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className={cn('bg-white rounded-xl shadow-sm border border-[#E0E0E0] w-[220px] flex flex-col overflow-hidden', className)}>
      <div className="w-full h-[120px] bg-[#E0E0E0] flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#B0B0B0]">Image</div>
        )}
      </div>
      <div className="flex-1 flex flex-col px-3 py-2 gap-1">
        <div className="font-bold text-base text-[#222] truncate" title={title}>{title}</div>
        {beds && <div className="text-xs text-[#717171]">{beds}</div>}
      </div>
    </div>
  );
};

export default AirbnbCard; 