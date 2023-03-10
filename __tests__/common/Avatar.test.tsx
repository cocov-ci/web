import { render } from '@testing-library/react'

import Avatar from 'app/common/Avatar'
import '@testing-library/jest-dom'

describe('common/Avatar', () => {
  const { container } = render(
    <Avatar
      avatarURL="https://avatars.githubusercontent.com/u/118852412?s=200&v=4"
      size="30px"
    />,
  )

  it('renders Avatar', () => {
    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
    )
  })

  it('renders Avatar snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
