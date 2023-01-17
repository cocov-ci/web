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
        percentCovered: 57.14,
      },
      { id: 2, file: 'app/lib/cocov/git_hub.rb', percentCovered: 90.48 },
      { id: 3, file: 'app/models/private_key.rb', percentCovered: 91.43 },
      { id: 4, file: 'app/models/user.rb', percentCovered: 92.86 },
      {
        id: 5,
        file: 'app/services/git_service/base_storage.rb',
        percentCovered: 95.24,
      },
      { id: 6, file: 'app/models/user_token.rb', percentCovered: 95.83 },
      { id: 7, file: 'app/lib/cocov/crypto.rb', percentCovered: 96.97 },
      {
        id: 8,
        file: 'app/lib/cocov/schema_validator.rb',
        percentCovered: 98.25,
      },
      {
        id: 9,
        file: 'app/controller/application_controller.rb',
        percentCovered: 100,
      },
    ],
  },
}
