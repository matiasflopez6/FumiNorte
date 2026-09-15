import React from 'react';

interface FumiNorteLogoProps {
  variant?: 'full' | 'icon';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  subtitle?: string;
}

export const FumiNorteLogo: React.FC<FumiNorteLogoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
  subtitle = 'Control de Plagas'
}) => {
  // Size mapping
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: { title: 'text-base', sub: 'text-[9px]' },
    md: { title: 'text-xl', sub: 'text-xs' },
    lg: { title: 'text-2xl', sub: 'text-sm' },
    xl: { title: 'text-3xl', sub: 'text-base' }
  };

  // Color tokens based on theme
  const colors = theme === 'dark' ? {
    shield: '#38BDF8', // Cyan / Teal accent on dark
    shieldDark: '#94A3B8', // Slate accent
    arrow: '#FFFFFF', // White arrow
    leaf: '#34D399', // Fresh emerald leaf
    vein: '#064E3B',
    textFumi: '#F8FAFC',
    textNorte: '#38BDF8',
    textSub: '#94A3B8'
  } : {
    shield: '#1E293B', // Dark charcoal/slate
    shieldDark: '#0F172A',
    arrow: '#0F766E', // Deep petroleum teal
    leaf: '#10B981', // Fresh green leaf
    vein: '#064E3B',
    textFumi: '#1E293B',
    textNorte: '#0F766E',
    textSub: '#64748B'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision Vector Emblem matching Image 1: Shield + Upward Arrow + Eco Leaf */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]} transition-transform duration-200`}>
        <svg 
          viewBox="0 0 120 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Defs for gradients & clip paths */}
          <defs>
            <linearGradient id="fumiShieldGrad" x1="20" y1="20" x2="80" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={theme === 'dark' ? '#334155' : '#1E293B'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#0F172A' : '#0F172A'} />
            </linearGradient>

            <linearGradient id="fumiArrowGrad" x1="45" y1="90" x2="75" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={theme === 'dark' ? '#0D9488' : '#0F766E'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#2DD4BF' : '#14B8A6'} />
            </linearGradient>

            <linearGradient id="fumiLeafGrad" x1="50" y1="85" x2="70" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={theme === 'dark' ? '#10B981' : '#059669'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#4ADE80' : '#10B981'} />
            </linearGradient>
          </defs>

          {/* 1. Left protective shield wing (angled, thick modern contour) */}
          <path
            d="M 38 32 C 26 40 18 54 18 70 C 18 84 28 98 42 106 C 33 97 27 85 28 72 C 29 59 34 46 44 38 Z"
            fill={theme === 'dark' ? '#64748B' : '#1E293B'}
          />

          {/* 2. Main Shield Base & Right Contour */}
          <path
            d="M 44 107 C 56 112 68 108 78 100 C 88 92 94 80 94 67 C 94 58 91 50 86 43 L 86 52 C 89 57 90 63 90 69 C 90 80 84 89 74 95 C 65 101 54 104 44 107 Z"
            fill={theme === 'dark' ? '#475569' : '#334155'}
          />

          {/* 3. Upward Shooting Arrow (Rising through the shield center) */}
          {/* Arrow Head */}
          <path
            d="M 66 12 L 85 36 L 68 35 L 68 62 C 68 74 62 86 52 94 L 46 87 C 54 81 58 72 58 62 L 58 35 L 43 36 Z"
            fill="url(#fumiArrowGrad)"
          />

          {/* 4. Eco Leaf (Nestled organically inside lower curve) */}
          <path
            d="M 52 92 C 50 78 58 64 70 57 C 72 70 65 85 52 92 Z"
            fill="url(#fumiLeafGrad)"
          />
          {/* Leaf central vein accent */}
          <path
            d="M 54 88 Q 60 76 68 60"
            stroke={theme === 'dark' ? '#022C22' : '#FFFFFF'}
            strokeWidth="1.75"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Typography: FumiNorte + Control de Plagas */}
      {variant === 'full' && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-black tracking-tight ${textSizes[size].title}`}>
            <span style={{ color: colors.textFumi }}>Fumi</span>
            <span style={{ color: colors.textNorte }}>Norte</span>
          </div>
          <span 
            className={`font-semibold uppercase tracking-wider mt-0.5 ${textSizes[size].sub}`}
            style={{ color: colors.textSub }}
          >
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};
