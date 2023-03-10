import { fireEvent, render, screen } from '@testing-library/react'
import { Info } from 'lucide-react'

import Banner from 'app/common/Banner'
import '@testing-library/jest-dom'

describe('common/Banner', () => {
  const { container } = render(
    <Banner open={true} variation="info">
      At solmen va esser necessi far uniform grammatica, pronunciation e plu
      commun paroles.
    </Banner>,
  )

  it('renders Banner', () => {
    expect(
      screen.getByText(
        'At solmen va esser necessi far uniform grammatica, pronunciation e plu commun paroles.',
      ),
    ).toBeVisible()
  })

  it('renders Banner with "icon" param', () => {
    const { container } = render(
      <Banner icon={Info} open={true} variation="info">
        At solmen va esser necessi far uniform grammatica, pronunciation e plu
        commun paroles.
      </Banner>,
    )
    expect(container.querySelectorAll('svg')).toHaveLength(2)
  })

  it('triggers onClose event', () => {
    const handleEvent = jest.fn()

    render(
      <Banner onClose={handleEvent} open={true} variation="info">
        At solmen va esser necessi far uniform grammatica, pronunciation e plu
        commun paroles.
      </Banner>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleEvent).toHaveBeenCalledTimes(1)
  })

  it('renders Banner snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
