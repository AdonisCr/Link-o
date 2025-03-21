/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { 
      colors: {
        Blacks: "#2C2E33",
        Whites: "#F8F9FF",
        Indigolight: "#2F1C48",
        Indigodark: "#2B2038",
        linac: "#AC6CFF",
        Honey: "#F8D57E",
        Lilacligh: "#EADAFF",
        DarkBlue: "#473EAC",
        DarkLilac: "#873EAC",
      },
    },
  },
  plugins: [],
};
