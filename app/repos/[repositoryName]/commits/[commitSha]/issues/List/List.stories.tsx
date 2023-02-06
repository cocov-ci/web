import type { Meta, StoryObj } from '@storybook/react'

import { IssueProps } from 'types/Commits'

import List from './index'

const meta: Meta<typeof List> = {
  title: 'Commits/List',
  component: args => (
    <div style={{ height: '300px' }}>
      <List {...args} />
    </div>
  ),
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof List>

const issue = {
  id: 1809,
  kind: 'security',
  status: 'new',
  file: 'app/services/git_service/base_storage.rb',
  uid: '12a75d7df840a95bd9da0d107848829a0ac67d2ebf0d2f65a4ed9d0ca7d813e6',
  line_start: 23,
  line_end: 23,
  message: 'Weak hashing algorithm used: SHA1',
  check_source: 'cocov/brakeman',
  status_reason: null,
  affected_file: {
    content: [
      {
        type: 'line',
        line: 21,
        source:
          '<pre>    <span class="k">def</span> <span class="nf">repo_path</span><span class="p">(</span><span class="n">repo</span><span class="p">)</span>\n</pre>',
      },
      {
        type: 'line',
        line: 22,
        source:
          '<pre>      <span class="n">base</span> <span class="o">=</span> <span class="n">base_path</span>\n</pre>',
      },
      {
        type: 'line',
        line: 23,
        source:
          '<pre>      <span class="nb">name</span> <span class="o">=</span> <span class="no">Digest</span><span class="o">::</span><span class="no">SHA1</span><span class="p">.</span><span class="nf">hexdigest</span><span class="p">(</span><span class="n">repo</span><span class="p">)</span>\n</pre>',
      },
      {
        type: 'warn',
        text: 'Weak hashing algorithm used: SHA1',
        padding: '      ',
      },
      {
        type: 'line',
        line: 24,
        source:
          '<pre>      <span class="k">case</span> <span class="n">base</span>\n</pre>',
      },
      {
        type: 'line',
        line: 25,
        source:
          '<pre>      <span class="k">when</span> <span class="no">Pathname</span>\n</pre>',
      },
    ],
    status: 'ok',
  },
} as IssueProps

export const Default: Story = {
  args: {
    issues: [issue, issue],
  },
}
