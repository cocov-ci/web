import type { Meta, StoryObj } from '@storybook/react'

import Content from './index'

const meta: Meta<typeof Content> = {
  title: 'Badges/Content',
  component: Content,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Content>

export const Default: Story = {
  args: {
    coverage_badge_url: 'http://localhost:5000/api/coverage',
    coverage_badge_href: 'http://localhost:3000/repos/api',
    issues_badge_url: 'http://localhost:5000/api/issues',
    issues_badge_href: 'http://localhost:3000/repos/api',
    templates: {
      html: {
        coverage:
          '<a href="http://localhost:3000/repos/api"><img src="http://localhost:5000/api/coverage" /></a>\n',
        issues:
          '<a href="http://localhost:3000/repos/api"><img src="http://localhost:5000/api/issues" /></a>\n',
      },
      markdown: {
        coverage:
          '[![Coverage](http://localhost:5000/api/coverage)](http://localhost:3000/repos/api)\n',
        issues:
          '[![Issues](http://localhost:5000/api/issues)](http://localhost:3000/repos/api)\n',
      },
      textile: {
        coverage:
          '"!http://localhost:5000/api/coverage!":http://localhost:3000/repos/api\n',
        issues:
          '"!http://localhost:5000/api/issues!":http://localhost:3000/repos/api\n',
      },
      rdoc: {
        coverage:
          '{<img src="http://localhost:5000/api/coverage" />}[http://localhost:3000/repos/api]\n',
        issues:
          '{<img src="http://localhost:5000/api/issues" />}[http://localhost:3000/repos/api]\n',
      },
      restructured: {
        coverage:
          '.. image:: http://localhost:5000/api/coverage\n' +
          ' :target: http://localhost:3000/repos/api\n' +
          ' :alt: Coverage\n',
        issues:
          '.. image:: http://localhost:5000/api/issues\n' +
          ' :target: http://localhost:3000/repos/api\n' +
          ' :alt: Issues\n',
      },
    },
  },
}
