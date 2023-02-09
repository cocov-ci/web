import type { Meta, StoryObj } from '@storybook/react'

import FileList from './index'

const meta: Meta<typeof FileList> = {
  title: 'Common/FileList',
  component: FileList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof FileList>

export const Default: Story = {
  args: {
    files: [
      {
        id: 1,
        file: 'app/models/application_record.rb',
        percent_covered: 57.14,
      },
      { id: 2, file: 'app/lib/cocov/git_hub.rb', percent_covered: 90.48 },
      { id: 3, file: 'app/models/private_key.rb', percent_covered: 91.43 },
      { id: 4, file: 'app/models/user.rb', percent_covered: 92.86 },
      {
        id: 5,
        file: 'app/services/git_service/base_storage.rb',
        percent_covered: 95.24,
      },
      { id: 6, file: 'app/models/user_token.rb', percent_covered: 95.83 },
      { id: 7, file: 'app/lib/cocov/crypto.rb', percent_covered: 96.97 },
      {
        id: 8,
        file: 'app/lib/cocov/schema_validator.rb',
        percent_covered: 98.25,
      },
      {
        id: 9,
        file: 'app/controller/application_controller.rb',
        percent_covered: 100,
      },
    ],
  },
}
