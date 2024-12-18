import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      margin: {
        "4px": "4px",
        "6px": "6px",
        "8px": "8px",
        "16px": "16px",
        "20px": "20px",
        "24px": "24px",
      },
      padding: {
        "8px": "8px",
        "10px": "10px",
        "12px": "12px",
        "14px": "14px",
        "16px": "16px",
        "20px": "20px",
        "24px": "24px",
        "42px": "42px",
        "64px": "64px",
        "80px": "80px",
      },
    },
    borderRadius: {
      md: "0.5rem",
      none: "0",
    },
    colors: {
      bg: {
        primary: "#FFFFFF",
        secondary: "#F9FAFB",
        body: "#F5F5F5",
      },
      fg: {
        quaternary: "#667085",
      },
      border: {
        primary: "#D0D5DD",
        secondary: "#EAECF0",
      },
      text: {
        placeholder: "#667085",
        primary: "#101828",
        secondary: "#344054",
        tertiary: "#475467",
      },
      button: {
        primary: {
          fg: "#FFFFFF",
          bg: "#7F56D9",
          border: "#7F56D9",
        },
        secondary: {
          fg: "#344054",
          bg: "#FFFFFF",
          border: "#D0D5DD",
          color: {
            fg: "#6941C6",
            border: "#D6BBFB",
            bg: "#FFFFFF",
          },
        },
        tertiary: {
          fg: "#475467",
        },
      },
      utility: {
        brand: {
          700: "#6941C6",
          200: "#E9D7FE",
          50: "#F9F5FF",
        },
        grey: {
          700: "#344054",
          200: "#EAECF0",
          50: "#F9FAFB",
        },
      },
    },
    container: {
      center: true,
      padding: "20px",
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1208px",
      },
    },
    gap: {
      xs: "0.25rem",
      s: "0.5rem;",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    fontSize: {
      sm: ["14px", "20px"],
      md: ["16px", "24px"],
    },
  },
  plugins: [],
} satisfies Config;
