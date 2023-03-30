import { render, screen } from '@testing-library/react'

import CodeBlock from 'app/common/CodeBlock'

import '@testing-library/jest-dom'

const issue = [
  {
    type: 'line' as const,
    line: 1,
    source:
      '<pre>    <span class="k">def</span> <span class="nf">repo_path</span><span class="p">(</span><span class="n">repo</span><span class="p">)</span>\n</pre>',
  },
  {
    type: 'warn' as const,
    text: 'Weak hashing algorithm used: SHA1',
    padding: '      ',
  },
  {
    type: 'line' as const,
    line: 2,
    source:
      '<pre>      <span class="n">base</span> <span class="o">=</span> <span class="n">base_path</span>\n</pre>',
  },
]

const coverage = {
  blocks: [
    { kind: 'neutral' as const, start: 1, end: 2 },
    { kind: 'covered' as const, start: 3, end: 7 },
    { kind: 'neutral' as const, start: 8, end: 8 },
  ],
  source: [
    {
      kind: 'line' as const,
      line: 1,
      source:
        '<pre><span class="c1"># frozen_string_literal: true</span>\n</pre>',
    },
    {
      kind: 'line' as const,
      line: 2,
      source: '<pre></pre>',
    },
  ],
}

const plainText =
  "Execution failed. Plugin exited with status 1:\nFailed processing: uninitialized constant PluginKit\n\n  rescue PluginKit::Exec::ExecutionError =\u003e e\n         ^^^^^^^^^\n/plugin.rb:4:in `rescue in block in \u003ctop (required)\u003e'\n/plugin.rb:2:in `block in \u003ctop (required)\u003e'\n/home/cocov/.gem/gems/cocov_plugin_kit-0.1.6/lib/cocov/plugin_kit.rb:41:in `instance_exec'\n/home/cocov/.gem/gems/cocov_plugin_kit-0.1.6/lib/cocov/plugin_kit.rb:41:in `block in run'\n/home/cocov/.gem/gems/cocov_plugin_kit-0.1.6/lib/cocov/plugin_kit.rb:38:in `chdir'\n/home/cocov/.gem/gems/cocov_plugin_kit-0.1.6/lib/cocov/plugin_kit.rb:38:in `run'\n/plugin.rb:1:in `\u003ctop (required)\u003e'\n\u003cinternal:/usr/local/lib/ruby/3.1.0/rubygems/core_ext/kernel_require.rb\u003e:85:in `require'\n\u003cinternal:/usr/local/lib/ruby/3.1.0/rubygems/core_ext/kernel_require.rb\u003e:85:in `require'\n/home/cocov/.gem/gems/cocov_plugin_kit-0.1.6/exe/cocov:11:in `\u003ctop (required)\u003e'\n/home/cocov/.gem/bin/cocov:25:in `load'\n/home/cocov/.gem/bin/cocov:25:in `\u003cmain\u003e'\n"

describe('common/CodeBlock', () => {
  it('renders CodeBlock with "issue" param', () => {
    render(<CodeBlock issue={issue} />)

    expect(screen.getByText('repo_path')).toBeVisible()
  })

  it('renders CodeBlock with "coverage" param', () => {
    render(<CodeBlock coverage={coverage} />)

    expect(screen.getByText('# frozen_string_literal: true')).toBeVisible()
  })

  it('renders CodeBlock with "coverage" param', () => {
    render(<CodeBlock plainText={plainText} />)

    expect(
      screen.getByText('Execution failed. Plugin exited with status 1:'),
    ).toBeVisible()
  })

  it('renders CodeBlock snapshots', () => {
    const { container } = render(<CodeBlock issue={issue} />)
    expect(container).toMatchSnapshot()
  })
})
