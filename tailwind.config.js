/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6fc6c6",
          secondary: "#0f379b",
          accent: "#42cea2",
          neutral: "#1e1b22",
          "base-100": "#ffffff",
          info: "#a2bbeb",
          success: "#59e8aa",
          warning: "#b67307",
          error: "#dd4236",
          light: "#f8fafc",
        },
      },
    ],
  },
};
