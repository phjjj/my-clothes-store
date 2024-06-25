export type ColorKey = "primary" | "secondary" | "text";
export type HeadingSize = "large" | "medium" | "small";

interface Theme {
  colors: Record<ColorKey, string>;
  heading: Record<HeadingSize, { fontSize: string }>;
}

export const defaultTheme: Theme = {
  colors: {
    primary: "#2e7131",
    secondary: "#fff",
    text: "#333",
  },
  heading: {
    large: { fontSize: "2rem" },
    medium: { fontSize: "1.5rem" },
    small: { fontSize: "1rem" },
  },
};
