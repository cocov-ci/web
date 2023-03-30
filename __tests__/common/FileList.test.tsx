import { fireEvent, render, screen } from '@testing-library/react'

import FileList from 'app/common/FileList'

import '@testing-library/jest-dom'

const args = {
  commitSha: '1234356',
  repositoryName: 'api',
  files: [
    {
      id: 1,
      file: 'app/models/application_record.rb',
      percent_covered: 57.14,
    },
    { id: 2, file: 'app/lib/cocov/git_hub.rb', percent_covered: 90.48 },
  ],
}

describe('common/FileList', () => {
  it('renders FileList', () => {
    const { container } = render(<FileList {...args} />)

    expect(container.querySelectorAll('.fileList a').length).toEqual(2)
    expect(screen.getByText('57.14%')).toBeVisible()
    expect(screen.getByText('app/models/application_record.rb')).toBeVisible()
  })

  it('triggers onClick', () => {
    render(<FileList {...args} resetScrollAfterPageLoad />)

    fireEvent.click(screen.getByText('app/models/application_record.rb'))
  })

  it('renders FileList with empty list', () => {
    const { container } = render(
      <FileList commitSha="1234356" files={[]} repositoryName="api" />,
    )

    expect(container.querySelectorAll('.base').length).toEqual(0)
  })

  it('renders FileList with "loading" param', () => {
    const { container } = render(<FileList {...args} loading={true} />)

    expect(
      container.getElementsByClassName('react-loading-skeleton').length,
    ).toEqual(13)
  })

  it('renders FileList snapshots', () => {
    const { container } = render(<FileList {...args} />)

    expect(container).toMatchSnapshot()
  })
})
