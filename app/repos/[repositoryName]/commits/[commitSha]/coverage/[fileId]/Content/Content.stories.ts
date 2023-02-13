import type { Meta, StoryObj } from '@storybook/react'

import { FileIdReponseProps } from 'types/Coverage'

import Content from './index'

const meta: Meta<typeof Content> = {
  title: 'Commits/[CommitSha]/Coverage/[FileId]/Content',
  component: Content,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Content>

const coverage = {
  coverage: {
    blocks: [
      { kind: 'neutral', start: 1, end: 2 },
      { kind: 'covered', start: 3, end: 6 },
      { kind: 'neutral', start: 7, end: 7 },
      { kind: 'covered', start: 8, end: 8 },
      { kind: 'missed', start: 9, end: 13 },
      { kind: 'neutral', start: 14, end: 15 },
      { kind: 'covered', start: 16, end: 16 },
      { kind: 'missed', start: 17, end: 17 },
      { kind: 'neutral', start: 18, end: 22 },
    ],
    lines_covered: 6,
    lines_total: 12,
    percent_covered: 50,
  },
  file: {
    base_path: 'app/lib/cocov/schema_validator/',
    name: 'unsatisfied_array_length_error.rb',
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
} as FileIdReponseProps

export const Default: Story = {
  args: {
    data: coverage,
  },
}
