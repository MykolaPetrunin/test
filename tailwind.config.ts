import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif']
            },
            fontSize: {
                'display-xxl': ['28px', { lineHeight: '32px' }],
                'display-xl': ['22px', { lineHeight: '28px' }],
                'text-lg': ['18px', { lineHeight: '28px' }],
                'text-md': ['16px', { lineHeight: '24px' }],
                'text-sm': ['14px', { lineHeight: '20px' }],
                'text-xs': ['12px', { lineHeight: '18px' }],
                'text-xxs': ['10px', { lineHeight: '18px' }]
            },
            fontWeight: {
                regular: '400',
                medium: '500',
                semibold: '600'
            },
            colors: {
                gray: {
                    25: '#FCFCFD',
                    50: '#F9FAFB',
                    100: '#F2F4F7',
                    200: '#EAECF0',
                    300: '#D0D5DD',
                    400: '#98A2B3',
                    500: '#667085',
                    600: '#475467',
                    700: '#344054',
                    800: '#1D2939',
                    900: '#101828'
                },
                primary: {
                    25: '#F3F5FF',
                    50: '#EBECFF',
                    100: '#C3C5FC',
                    200: '#A09FFB',
                    300: '#7876FB',
                    400: '#6358FA',
                    500: '#4A3FE1',
                    600: '#352BC2',
                    700: '#2D259E',
                    800: '#251E7F',
                    900: '#1B1563'
                },
                success: {
                    25: '#F6FEF9',
                    50: '#ECFDF3',
                    100: '#D1FADF',
                    200: '#A6F4C5',
                    300: '#6CE9A6',
                    400: '#32D583',
                    500: '#12B76A',
                    600: '#039855',
                    700: '#027A48',
                    800: '#05603A',
                    900: '#054F31'
                },
                error: {
                    25: '#FFFBFA',
                    50: '#FEF3F2',
                    100: '#FEE4E2',
                    200: '#FECDCA',
                    300: '#FDA29B',
                    400: '#F97066',
                    500: '#F04438',
                    600: '#D92D20',
                    700: '#B42318',
                    800: '#912018',
                    900: '#7A271A'
                },
                'pie-chart': {
                    yellow: '#FFCC47',
                    green: '#4EE870',
                    teal: '#38F6F4',
                    blue: '#645BFA',
                    purple: '#AE47FF',
                    pink: '#E547FF',
                    fuchsia: '#FF47A0',
                    red: '#EF4564'
                },
                'system-view': {
                    lightest: '#FBFFFE',
                    lighter: '#EBFCF7',
                    light: '#CBCFE8',
                    medium: '#777EA1'
                },
                other: {
                    warning: '#F79009',
                    error: '#F04438'
                }
            }
        }
    },
    plugins: []
};
export default config;
