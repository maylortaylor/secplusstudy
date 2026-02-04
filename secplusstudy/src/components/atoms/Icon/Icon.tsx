import React from 'react';

export type IconName =
  | 'star'
  | 'flag'
  | 'arrow-left'
  | 'arrow-right'
  | 'menu'
  | 'close'
  | 'check'
  | 'x'
  | 'chevron-down';

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '' }) => {
  const svgProps = {
    width: size,
    height: size,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (name) {
    case 'star':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'flag':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      );
    case 'close':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'check':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case 'x':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      );
    default:
      return null;
  }
};
