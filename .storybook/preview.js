import { satoshi } from 'utils/fonts'
import 'styles/globals.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  fontFamily: {
    heading: "'Satoshi'",
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  Story => (
    <div className={satoshi.className}>
      <Story />
    </div>
  ),
]
