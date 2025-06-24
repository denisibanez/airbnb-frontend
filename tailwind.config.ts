import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Shades
        'shade-01': '#FFFFFF',
        'shade-02': '#222222',
        'shade-02-5': 'rgba(34,34,34,0.05)',   // 5% opacity
        'shade-02-30': 'rgba(34,34,34,0.3)',  // 30% opacity
        
        // Neutrals
        'neutral-01': '#F7F7F7',
        'neutral-02': '#EBEBEB',
        'neutral-03': '#DDDDDD',
        'neutral-04': '#D3D3D3',
        'neutral-05': '#C2C2C2',
        'neutral-06': '#B0B0B0',
        'neutral-07': '#717171',
        'neutral-08': '#5E5E5E',
        
        // Primary
        'primary-01': '#F6475F',
        'primary-02': '#FF385C',
        
        // Error
        'error-01': '#FEF8F6',
        'error-02': '#C13515',
        
        // Accents
        'accent-01': '#F6D7DF',
        'accent-02': '#D03660',
        'discount': '#008A05',
        'link': '#004CC4',

        // Gradients (cores intermediárias)
        'gradient-01-a': '#C72D65',
        'gradient-01-b': '#D23760',
        'gradient-01-c': '#D23755',
        'gradient-02-a': '#EB4C60',
        'gradient-02-b': '#EB4C60',
        'gradient-02-c': '#EB4C60',
      },
      backgroundImage: {
        // Gradients principais
        'gradient-01': 'linear-gradient(90deg, #C72D65 0%, #D23760 50%, #D23755 100%)',
        'gradient-02': 'linear-gradient(90deg, #EB4C60 0%, #EB4C60 50%, #EB4C60 100%)',
        'gradient-03': 'linear-gradient(90deg, #F6475F 0%, #FF385C 50%, #F6475F 100%)',
      },
      fontFamily: {
        sans: [
          'SF Pro',
          'Airbnb Cereal VF',
          'Inter',
          'Circular',
          'Nunito',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        'circular': ['Circular', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'circular-book': ['Circular Book', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'circular-medium': ['Circular Medium', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'circular-bold': ['Circular Bold', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Airbnb Typography Scale
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        'sm': ['14px', { lineHeight: '18px', letterSpacing: '0.25px' }],
        'base': ['16px', { lineHeight: '20px', letterSpacing: '0.15px' }],
        'lg': ['18px', { lineHeight: '22px', letterSpacing: '0.15px' }],
        'xl': ['20px', { lineHeight: '24px', letterSpacing: '0.15px' }],
        '2xl': ['22px', { lineHeight: '26px', letterSpacing: '0.15px' }],
        '3xl': ['24px', { lineHeight: '28px', letterSpacing: '0.15px' }],
        '4xl': ['26px', { lineHeight: '30px', letterSpacing: '0.15px' }],
        '5xl': ['32px', { lineHeight: '36px', letterSpacing: '0.15px' }],
        '6xl': ['40px', { lineHeight: '44px', letterSpacing: '0.15px' }],
        '7xl': ['48px', { lineHeight: '52px', letterSpacing: '0.15px' }],
        '8xl': ['56px', { lineHeight: '60px', letterSpacing: '0.15px' }],
      },
      fontWeight: {
        'book': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      spacing: {
        // Airbnb Spacing Scale
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
      },
      borderRadius: {
        // Airbnb Border Radius Scale
        'none': '0px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'airbnb-01': '0 4px 18px 0 rgba(0,0,0,0.17)',
        'airbnb-02': '0 1px 5px 0 rgba(0,0,0,0.19)',
        'airbnb-03': '0 8px 16px 0 rgba(0,0,0,0.12)',
        // Classes de compatibilidade para o Card
        'airbnb-md': '0 1px 5px 0 rgba(0,0,0,0.19)',
        'airbnb-lg': '0 8px 16px 0 rgba(0,0,0,0.12)',
        'airbnb-xl': '0 4px 18px 0 rgba(0,0,0,0.17)',
        // Airbnb Elevation Scale antigo (mantido para compatibilidade)
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        'airbnb-sm': '0 1px 2px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config 