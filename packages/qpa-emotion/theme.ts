const theme = {
  colors: {
    lead: "#043b14",
    secondary: "#FFAD00",
    gray: "#c8c8c8",
  },
}

type Theme = typeof theme
export { Theme }

export interface ThemeProps {
  theme: Theme
}

export default theme
