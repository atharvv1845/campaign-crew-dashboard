import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#1EAEDB', // Bright blue color from Leveraged Growth logo
					foreground: '#000000' // Black
				},
				secondary: {
					DEFAULT: '#222222', // Dark Gray
					foreground: '#FFFFFF' // White
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#1E1E1E', // Very dark gray for muted areas
					foreground: '#AAAAAA' // Light gray for muted text
				},
				accent: {
					DEFAULT: '#333333', // Dark gray accent
					foreground: '#1EAEDB' // Bright blue
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: '#000000', // Black
					foreground: '#FFFFFF', // White
					primary: '#1EAEDB', // Bright blue
					'primary-foreground': '#000000', // Black
					accent: '#333333', // Dark gray
					'accent-foreground': '#FFFFFF', // White
					border: '#333333', // Dark gray
					ring: '#1EAEDB' // Bright blue
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					from: {
						opacity: '1',
						transform: 'translateY(0)'
					},
					to: {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'slide-in-left': {
					from: {
						transform: 'translateX(-100%)'
					},
					to: {
						transform: 'translateX(0)'
					}
				},
				'slide-out-left': {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(-100%)'
					}
				},
				'scale-in': {
					from: {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'scale-out': {
					from: {
						opacity: '1',
						transform: 'scale(1)'
					},
					to: {
						opacity: '0',
						transform: 'scale(0.95)'
					}
				},
				pulse: {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				appear: {
					from: {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'appear-zoom': {
					from: {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'slide-out-left': 'slide-out-left 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'appear': 'appear 0.7s ease-out forwards',
				'appear-zoom': 'appear-zoom 0.7s ease-out forwards'
			},
			transitionProperty: {
				height: 'height',
				spacing: 'margin, padding',
			},
			backdropBlur: {
				xs: '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
