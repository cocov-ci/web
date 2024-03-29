import { satoshi } from 'utils/fonts'
import 'styles/globals.scss'
import 'app/common/CodeBlock/CodeBlock_global.scss'

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
  nextjs: {
    appDirectory: true,
  },
}

export const decorators = [
  Story => (
    <div className={satoshi.className}>
      <Story />
    </div>
  ),
]
