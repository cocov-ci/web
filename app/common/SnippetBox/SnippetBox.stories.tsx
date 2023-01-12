import type { Meta, StoryObj } from '@storybook/react'

import SnippetBox from './index'

const meta: Meta<typeof SnippetBox> = {
  title: 'Common/SnippetBox',
  component: SnippetBox,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SnippetBox>

export const SingleLine: Story = {
  args: {
    source: 'crt_d3e4ad8b6735a2fa04f546f68b51df73039463df16',
  },
}

export const MultiLine: Story = {
  args: {
    source: `<a href=“https://cocov.company.io/repos/jps/coverage”><img alt="" src="https://badges-cocov.company.io/api/coverage” /></a>`,
    multiline: true,
  },
}
