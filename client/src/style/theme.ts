export type ColorKey = "primary" | "secondary" | "text"
export type HeadingSize = "large" | "medium" | "small"
export type layoutSize = "large" | "medium" | "small"
export type ButtonSize = "large" | "medium" | "small"
export type ButtonSchema = "primary" | "secondary"

interface Theme {
  colors: Record<ColorKey, string>
  heading: Record<HeadingSize, { fontSize: string }>
  layout: Record<layoutSize, { width: string }>
  button: Record<ButtonSize, { fontSize: string; padding: string }>
  buttonSchema: Record<ButtonSchema, { color: string; backgroundColor: string }>
}

export const defaultTheme: Theme = {
  colors: {
    primary: "#2e7131",
    secondary: "#F0F0F0",
    text: "#333",
  },
  heading: {
    large: { fontSize: "2rem" },
    medium: { fontSize: "1.5rem" },
    small: { fontSize: "1rem" },
  },
  layout: {
    large: { width: "1000px" },
    medium: { width: "450px" },
    small: { width: "300px" },
  },
  button: {
    large: { fontSize: "1.2rem", padding: "1rem 2rem" },
    medium: { fontSize: "0.8rem", padding: "0.75rem 1rem" },
    small: { fontSize: "0.5rem", padding: "0.75rem 0.5rem" },
  },
  buttonSchema: {
    primary: {
      color: "#fff",
      backgroundColor: "#2e7131",
    },
    secondary: {
      color: "#333",
      backgroundColor: "#fff",
    },
  },
}
