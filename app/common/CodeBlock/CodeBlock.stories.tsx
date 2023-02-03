import type { Meta, StoryObj } from '@storybook/react'

import CodeBlock from './index'

const meta: Meta<typeof CodeBlock> = {
  title: 'Common/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CodeBlock>

export const Default: Story = {
  args: {
    objects: [
      {
        type: 'line',
        line: 1,
        source:
          '<pre>    <span class="k">def</span> <span class="nf">repo_path</span><span class="p">(</span><span class="n">repo</span><span class="p">)</span>\n</pre>',
      },
      {
        type: 'line',
        line: 2,
        source:
          '<pre>      <span class="n">base</span> <span class="o">=</span> <span class="n">base_path</span>\n</pre>',
      },
      {
        type: 'line',
        line: 3,
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
        line: 4,
        source:
          '<pre>      <span class="k">if</span> <span class="n">base</span><span class="p">.</span><span class="nf">is_a?</span> <span class="no">Pathname</span>\n</pre>',
      },
      {
        type: 'line',
        line: 5,
        source:
          '<pre>        <span class="n">base</span><span class="p">.</span><span class="nf">join</span><span class="p">(</span><span class="nb">name</span><span class="p">)</span>\n</pre>',
      },
    ],
  },
}

export const LongMessage: Story = {
  args: {
    objects: [
      {
        type: 'line',
        line: 1,
        source:
          '<pre>    <span class="k">def</span> <span class="nf">repo_path</span><span class="p">(</span><span class="n">repo</span><span class="p">)</span>\n</pre>',
      },
      {
        type: 'line',
        line: 2,
        source:
          '<pre>      <span class="n">base</span> <span class="o">=</span> <span class="n">base_path</span>\n</pre>',
      },
      {
        type: 'line',
        line: 3,
        source:
          '<pre>      <span class="nb">name</span> <span class="o">=</span> <span class="no">Digest</span><span class="o">::</span><span class="no">SHA1</span><span class="p">.</span><span class="nf">hexdigest</span><span class="p">(</span><span class="n">repo</span><span class="p">)</span>\n</pre>',
      },
      {
        type: 'warn',
        text: '$METHOD is a state-changing MVC method that does not validate the antiforgery token or do strict content-type checking. State-changing controller methods should either enforce antiforgery tokens or do strict content-type checking to prevent simple HTTP request types from bypassing CORS preflight controls.',
        padding: '      ',
      },
      {
        type: 'line',
        line: 4,
        source:
          '<pre>      <span class="k">if</span> <span class="n">base</span><span class="p">.</span><span class="nf">is_a?</span> <span class="no">Pathname</span>\n</pre>',
      },
      {
        type: 'line',
        line: 5,
        source:
          '<pre>        <span class="n">base</span><span class="p">.</span><span class="nf">join</span><span class="p">(</span><span class="nb">name</span><span class="p">)</span>\n</pre>',
      },
    ],
  },
}
