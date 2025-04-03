/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inknut: ['"Inknut Antiqua"', "serif"], // Add Inknut Antiqua font
        josefin: ['"Josefin Sans"', "serif"],
      },
      fontWeight: {
        semiBold: 600, // Add custom font-weight if needed (600 is semi-bold)
      },
    },
  },
  plugins: [],
};
