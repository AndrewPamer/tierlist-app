import "@/styles/globals.css";
import { ThemeProvider } from "../components/TailwindComponents";
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
      variants: ["filled", "outlined", "gradient", "text"],

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
        text: {
          theme: {
            color: "text-text",
            hover: "hover:text-button-hover",
            active: "active:text-button-hover",
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
  input: {
    defaultProps: {
      color: "theme",
    },
    valid: {
      colors: ["theme"],
    },
    styles: {
      variants: {
        outlined: {
          colors: {
            input: {
              theme: {
                color: "text-text",
                borderColor: "border-text",
                borderColorFocused: "focus:border-text",
              },
            },
            label: {
              theme: {
                color: "!text-text peer-focus:text-text",
                before: "before:border-text peer-focus:before:!border-text",
                after: "after:border-text peer-focus:after:!border-text",
              },
            },
          },
        },
      },
    },
  },
  popover: {
    styles: {
      base: {
        bg: "bg-alt-bg-darker",
        border: "border border-text",
        color: "text-text",
      },
    },
  },
  dialog: {
    styles: {
      base: {
        container: {
          bg: "bg-alt-bg",
          color: "text-text",
        },
      },
    },
  },
  dialogHeader: {
    styles: {
      base: {
        color: "text-text",
      },
    },
  },
  dialogBody: {
    styles: {
      base: {
        initial: {
          color: "text-text",
        },
      },
    },
  },
  dialogFooter: {
    styles: {
      base: {
        color: "text-text",
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
