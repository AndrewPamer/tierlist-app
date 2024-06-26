import "@/styles/globals.css";
import { ThemeProvider } from "./test.js";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Tier List Maker",
  description: "Tier list maker",
};

const theme = {
  accordion: {
    styles: {
      base: {
        header: {
          initial: {
            color: "text-text",
            hover: "hover:text-text",
          },
          active: {
            color: "text-text",
          },
        },
      },
    },
  },
  list: {
    styles: {
      base: {
        list: {
          color: "text-text",
        },
        item: {
          initial: {
            bg: "hover:bg-button-bg hover:bg-opacity-80 focus:bg-button-hover focus:bg-opacity-80 active:bg-button-hover active:bg-opacity-80",
            color:
              "hover:text-alt-bg-darker focus:text-alt-bg-darker active:text-alt-bg-darker",
          },
        },
      },
    },
  },
  button: {
    defaultProps: {
      color: "theme",
      ripple: false,
    },
    valid: {
      colors: ["theme"],
    },
    styles: {
      variants: {
        filled: {
          theme: {
            background: "bg-button-bg",
            color: "text-button-text",
            hover: "hover:bg-button-hover",
            focus: "focus:opacity-[0.85] focus:shadow-none",
            active: "active:opacity-[0.85] active:shadow-none",
          },
        },
      },
    },
  },
  checkbox: {
    defaultProps: {
      color: "boxTheme",
    },
    valid: {
      colors: ["boxTheme"],
    },
    styles: {
      colors: {
        boxTheme: {
          background: "checked:bg-alt-bg",
          border: "checked:border-text",
          before: "checked:before:bg-blue-600",
        },
      },
    },
  },
  radio: {
    defaultProps: {
      color: "theme",
    },
    valid: {
      colors: ["theme"],
    },
    styles: {
      base: {
        input: {
          borderColor: "border-button-hover",
        },
      },
      colors: {
        theme: {},
      },
    },
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <ThemeProvider value={theme}>
        <body
          className={`!bg-background !text-text ${inter.className} ${inter.variable}`}
        >
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
