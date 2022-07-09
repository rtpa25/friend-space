/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-background':
          "url('https://img.freepik.com/free-photo/green-texture_1160-674.jpg?w=1380&t=st=1657343323~exp=1657343923~hmac=99c911847a27647450063596d61b2933a8a29e1432bb9510f7966bce58c106b1')",
      },
    },
  },
  plugins: [],
};
