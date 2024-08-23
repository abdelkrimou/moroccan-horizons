/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainYellow: "#FCDC2A",
        accentYellow: "#F7F6BB",
        mainGreen: "#114232",
        accentGreen: "#87A922",
      },
      fontFamily: {
        mainFont: "Montserrat , sans-serif",
        textFont: "Lato, sans-serif",
        headFont: "Roboto Serif, serif",
        accentFont: "",
      },
      gridTemplateColumns: {
        tourGrid: "repeat(auto-fill,minmax(300px,1fr))",
        bookingTable: "2fr auto 1fr auto",
        reviewTable: "3fr 2fr auto auto",
        billingTable: "2fr auto auto 1fr",
        manageUsersTable: "2fr 2fr auto auto auto auto",
        manageToursTable: "2fr auto 2fr 1fr 1fr 1fr",
        manageBookingsTable: "1fr 1fr 1fr auto 1fr auto",
        manageReviewsTable: "1fr 1fr 2fr auto auto",
      },
    },
  },
  plugins: [],
};
