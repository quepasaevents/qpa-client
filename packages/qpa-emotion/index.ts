import styled from "@emotion/styled"
import { css, Global } from "@emotion/core"
import { ThemeProvider, useTheme as genericUseTheme} from "emotion-theming"
import theme, { Theme } from './theme'

const useTheme = () => genericUseTheme<Theme>()
export default styled
export { css, Global, ThemeProvider, theme, Theme, useTheme}
