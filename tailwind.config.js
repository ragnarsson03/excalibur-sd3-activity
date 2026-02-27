/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./views/**/*.ejs",
        "./src/**/*.ts"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#ff5722',
                    dark: '#e64a19',
                    light: '#ff8a65',
                },
                surface: {
                    DEFAULT: '#f4f6f8',
                    dark: '#1e293b',
                    card: '#ffffff',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.25rem',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'card': '0 4px 25px rgba(0,0,0,0.08)',
            }
        },
    },
    plugins: [],
}
