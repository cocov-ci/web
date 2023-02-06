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
    issue: {
      objects: [
        {
          kind: 'line',
          line: 1,
          source:
            '<pre>    <span class="k">def</span> <span class="nf">repo_path</span><span class="p">(</span><span class="n">repo</span><span class="p">)</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 2,
          source:
            '<pre>      <span class="n">base</span> <span class="o">=</span> <span class="n">base_path</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 3,
          source:
            '<pre>      <span class="nb">name</span> <span class="o">=</span> <span class="no">Digest</span><span class="o">::</span><span class="no">SHA1</span><span class="p">.</span><span class="nf">hexdigest</span><span class="p">(</span><span class="n">repo</span><span class="p">)</span>\n</pre>',
        },
        {
          kind: 'warn',
          text: 'Weak hashing algorithm used: SHA1',
          padding: '      ',
        },
        {
          kind: 'line',
          line: 4,
          source:
            '<pre>      <span class="k">if</span> <span class="n">base</span><span class="p">.</span><span class="nf">is_a?</span> <span class="no">Pathname</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 5,
          source:
            '<pre>        <span class="n">base</span><span class="p">.</span><span class="nf">join</span><span class="p">(</span><span class="nb">name</span><span class="p">)</span>\n</pre>',
        },
      ],
    },
  },
}

export const LongMessage: Story = {
  args: {
    issue: [
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

export const Coverage: Story = {
  args: {
    coverage: {
      blocks: [
        { kind: 'neutral', start: 1, end: 2 },
        { kind: 'covered', start: 3, end: 7 },
        { kind: 'neutral', start: 8, end: 8 },
        { kind: 'covered', start: 9, end: 12 },
        { kind: 'neutral', start: 13, end: 14 },
        { kind: 'covered', start: 15, end: 15 },
        { kind: 'neutral', start: 16, end: 16 },
        { kind: 'covered', start: 17, end: 19 },
        { kind: 'neutral', start: 20, end: 20 },
        { kind: 'covered', start: 21, end: 21 },
        { kind: 'neutral', start: 22, end: 22 },
        { kind: 'covered', start: 23, end: 24 },
        { kind: 'neutral', start: 25, end: 26 },
        { kind: 'covered', start: 27, end: 29 },
        { kind: 'neutral', start: 30, end: 30 },
        { kind: 'covered', start: 31, end: 33 },
        { kind: 'neutral', start: 34, end: 34 },
        { kind: 'covered', start: 35, end: 35 },
        { kind: 'neutral', start: 36, end: 36 },
        { kind: 'covered', start: 37, end: 37 },
        { kind: 'neutral', start: 38, end: 40 },
        { kind: 'covered', start: 41, end: 42 },
        { kind: 'neutral', start: 43, end: 43 },
        { kind: 'missed', start: 44, end: 45 },
        { kind: 'neutral', start: 46, end: 46 },
        { kind: 'missed', start: 47, end: 47 },
        { kind: 'neutral', start: 48, end: 50 },
      ],
      source: [
        {
          kind: 'line',
          line: 1,
          source:
            '<pre><span class="c1"># frozen_string_literal: true</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 2,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 3,
          source:
            '<pre><span class="k">module</span> <span class="nn">V1</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 4,
          source:
            '<pre>  <span class="k">class</span> <span class="nc">GithubEventsController</span> <span class="o">&lt;</span> <span class="no">V1Controller</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 5,
          source:
            '<pre>    <span class="n">before_action</span> <span class="ss">:validate_signature</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 6,
          source:
            '<pre>    <span class="n">before_action</span> <span class="ss">:validate_event</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 7,
          source:
            '<pre>    <span class="n">around_action</span> <span class="ss">:ignore_duplicated_events</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 8,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 9,
          source:
            '<pre>    <span class="k">def</span> <span class="nf">create</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 10,
          source:
            '<pre>      <span class="n">key</span> <span class="o">=</span> <span class="p">[</span><span class="vi">@event_name</span><span class="p">,</span> <span class="vi">@event</span><span class="p">[</span><span class="ss">:action</span><span class="p">]</span><span class="o">&amp;</span><span class="p">.</span><span class="nf">to_sym</span><span class="p">].</span><span class="nf">compact</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 11,
          source:
            '<pre>      <span class="no">WebhookProcessorService</span><span class="p">.</span><span class="nf">call</span><span class="p">(</span><span class="n">key</span><span class="p">,</span> <span class="vi">@event</span><span class="p">)</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 12,
          source:
            '<pre>      <span class="n">head</span> <span class="ss">:ok</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 13,
          source: '<pre>    <span class="k">end</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 14,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 15,
          source: '<pre>    <span class="kp">private</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 16,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 17,
          source:
            '<pre>    <span class="k">def</span> <span class="nf">validate_event</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 18,
          source:
            '<pre>      <span class="vi">@event_name</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="nf">env</span><span class="p">[</span><span class="s2">"HTTP_X_GITHUB_EVENT"</span><span class="p">]</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 19,
          source:
            '<pre>      <span class="k">return</span> <span class="n">head</span> <span class="ss">:bad_request</span> <span class="k">if</span> <span class="vi">@event_name</span><span class="p">.</span><span class="nf">blank?</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 20,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 21,
          source:
            '<pre>      <span class="vi">@event_name</span> <span class="o">=</span> <span class="vi">@event_name</span><span class="p">.</span><span class="nf">to_sym</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 22,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 23,
          source:
            '<pre>      <span class="n">request</span><span class="p">.</span><span class="nf">body</span><span class="p">.</span><span class="nf">rewind</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 24,
          source:
            '<pre>      <span class="vi">@event</span> <span class="o">=</span> <span class="no">JSON</span><span class="p">.</span><span class="nf">parse</span><span class="p">(</span><span class="n">request</span><span class="p">.</span><span class="nf">body</span><span class="p">.</span><span class="nf">read</span><span class="p">,</span> <span class="ss">symbolize_names: </span><span class="kp">true</span><span class="p">).</span><span class="nf">with_indifferent_access</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 25,
          source: '<pre>    <span class="k">end</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 26,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 27,
          source:
            '<pre>    <span class="k">def</span> <span class="nf">ignore_duplicated_events</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 28,
          source:
            '<pre>      <span class="n">event_id</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="nf">env</span><span class="p">[</span><span class="s2">"HTTP_X_GITHUB_DELIVERY"</span><span class="p">]</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 29,
          source:
            '<pre>      <span class="k">return</span> <span class="n">head</span> <span class="ss">:bad_request</span> <span class="k">if</span> <span class="n">event_id</span><span class="p">.</span><span class="nf">blank?</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 30,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 31,
          source:
            '<pre>      <span class="n">event_key</span> <span class="o">=</span> <span class="s2">"github:event:delivery:</span><span class="si">#{</span><span class="n">event_id</span><span class="si">}</span><span class="s2">"</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 32,
          source:
            '<pre>      <span class="no">Cocov</span><span class="o">::</span><span class="no">Redis</span><span class="p">.</span><span class="nf">lock</span><span class="p">(</span><span class="s2">"github:delivery:</span><span class="si">#{</span><span class="n">event_id</span><span class="si">}</span><span class="s2">"</span><span class="p">,</span> <span class="mi">1</span><span class="p">.</span><span class="nf">minute</span><span class="p">)</span> <span class="k">do</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 33,
          source:
            '<pre>        <span class="n">head</span> <span class="ss">:ok</span> <span class="n">and</span> <span class="k">return</span> <span class="k">if</span> <span class="no">Cocov</span><span class="o">::</span><span class="no">Redis</span><span class="p">.</span><span class="nf">instance</span><span class="p">.</span><span class="nf">exists?</span> <span class="n">event_key</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 34,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 35,
          source: '<pre>        <span class="k">yield</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 36,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 37,
          source:
            '<pre>        <span class="no">Cocov</span><span class="o">::</span><span class="no">Redis</span><span class="p">.</span><span class="nf">instance</span><span class="p">.</span><span class="nf">set</span> <span class="n">event_key</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="ss">ex: </span><span class="mi">2</span><span class="p">.</span><span class="nf">days</span> <span class="k">if</span> <span class="n">response</span><span class="p">.</span><span class="nf">successful?</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 38,
          source: '<pre>      <span class="k">end</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 39,
          source: '<pre>    <span class="k">end</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 40,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 41,
          source:
            '<pre>    <span class="k">def</span> <span class="nf">validate_signature</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 42,
          source:
            '<pre>      <span class="k">return</span> <span class="k">if</span> <span class="no">Cocov</span><span class="o">::</span><span class="no">GITHUB_WEBHOOK_SECRET_KEY</span><span class="p">.</span><span class="nf">blank?</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 43,
          source: '<pre></pre>',
        },
        {
          kind: 'line',
          line: 44,
          source:
            '<pre>      <span class="n">request</span><span class="p">.</span><span class="nf">body</span><span class="p">.</span><span class="nf">rewind</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 45,
          source:
            '<pre>      <span class="n">hex_digest</span> <span class="o">=</span> <span class="no">OpenSSL</span><span class="o">::</span><span class="no">HMAC</span><span class="p">.</span><span class="nf">hexdigest</span><span class="p">(</span><span class="no">OpenSSL</span><span class="o">::</span><span class="no">Digest</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="s2">"sha256"</span><span class="p">),</span> <span class="no">Cocov</span><span class="o">::</span><span class="no">GITHUB_WEBHOOK_SECRET_KEY</span><span class="p">,</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 46,
          source:
            '<pre>        <span class="n">request</span><span class="p">.</span><span class="nf">body</span><span class="p">.</span><span class="nf">read</span><span class="p">)</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 47,
          source:
            '<pre>      <span class="n">head</span> <span class="ss">:forbidden</span> <span class="k">unless</span> <span class="no">Rack</span><span class="o">::</span><span class="no">Utils</span><span class="p">.</span><span class="nf">secure_compare</span><span class="p">(</span><span class="s2">"sha256=</span><span class="si">#{</span><span class="n">hex_digest</span><span class="si">}</span><span class="s2">"</span><span class="p">,</span> <span class="n">request</span><span class="p">.</span><span class="nf">env</span><span class="p">[</span><span class="s2">"HTTP_X_HUB_SIGNATURE_256"</span><span class="p">])</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 48,
          source: '<pre>    <span class="k">end</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 49,
          source: '<pre>  <span class="k">end</span>\n</pre>',
        },
        {
          kind: 'line',
          line: 50,
          source: '<pre><span class="k">end</span>\n</pre>',
        },
      ],
    },
  },
}
