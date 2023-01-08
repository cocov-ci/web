import localFont from '@next/font/local'
import 'styles/globals.scss'

const satoshi = localFont({
  src: '../public/fonts/Satoshi.ttf',
  variable: '--satoshi-font',
})

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
