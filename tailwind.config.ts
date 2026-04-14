import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/interfaces/**/*.{js,ts,jsx,tsx,mdx}',
    './src/application/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
