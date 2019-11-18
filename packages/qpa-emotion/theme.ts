const theme = {
  colors: {
    lead: "#043b14",
    secondary: "#FFAD00",
    gray: "#ffffff",
  },
}

type Theme = typeof theme
export { Theme }

export interface ThemeProps {
  theme: Theme
}

export default theme
