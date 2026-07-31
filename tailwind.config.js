/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-sky": "#3FBAEB",   // accent
        "brand-navy": "#18144A",  // text
        "brand-navy-soft": "#2A236B",
      },
      fontFamily: {
        heading: ['"Syne"', "ui-sans-serif", "system-ui"],
        body:    ['"DM Sans"', "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(24, 20, 74, 0.25)",
      },
    },
  },
  plugins: [],
};
