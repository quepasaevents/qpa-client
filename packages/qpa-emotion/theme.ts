const theme = {
    colors: {
        lead: '#5E8036',
        secondary: '#FFAD00'
    }
}

type Theme = typeof theme
export { Theme }

export interface ThemeProps {
    theme: Theme
}

export default theme
