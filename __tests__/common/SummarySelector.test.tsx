import { fireEvent, render } from '@testing-library/react'

import SummarySelector from 'app/common/SummarySelector'

import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

describe('common/SummarySelector', () => {
  it('renders SummarySelector', () => {
    const { container } = render(
      <SummarySelector branchName="master" branchesList={[]} />,
    )

    expect(
      container.querySelector('.buttonWrapper > button'),
    ).toHaveTextContent('Switch Branch')
  })

  it('triggers Switch Branch button', () => {
    const { container } = render(
      <SummarySelector branchName="master" branchesList={[]} />,
    )

    fireEvent.click(
      container.querySelector('.buttonWrapper > button') as Element,
    )

    expect(container.querySelector('.branchSwitcher')).toBeVisible()
  })

  it('triggers close BranchSwitcher', () => {
    const { container } = render(
      <SummarySelector branchName="master" branchesList={[]} />,
    )

    fireEvent.click(
      container.querySelector('.buttonWrapper > button') as Element,
    )

    expect(container.querySelector('.branchSwitcher.visible')).not.toBeNull()

    fireEvent.click(
      container.querySelector('.branchSwitcher button') as Element,
    )

    expect(container.querySelector('.branchSwitcher.visible')).toBeNull()
  })

  it('renders SummarySelector snapshots', () => {
    const { container } = render(
      <SummarySelector branchName="master" branchesList={[]} />,
    )

    expect(container).toMatchSnapshot()
  })
})
