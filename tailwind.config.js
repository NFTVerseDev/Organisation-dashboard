/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
          colors: {
              primary: "#282c34",
              "borderGreen":"#BBFF00",
              "details-heading-bg": "#f3f3f3",
              "darkBakcground":"rgb(55 65 81 / var(--tw-bg-opacity))",
              "lightHoverGrey":"#FCFFF2",
              darkPrimary: '#282c34',
              // darkSecondary: "#292929",
              secPurple:"#BD00FF",
              secBlue: "#5D2BE9",
              prevBg: "#422246",
              darkBorder: "#525252"
          },
          scale:{
              '200':'2',
              '300':'3'
          },
          "detailsBoxShadow": "0px 15px 40px #0C0C0C0D"
      },
  },
  plugins: [],
};
