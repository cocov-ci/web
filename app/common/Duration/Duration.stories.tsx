import type { Meta, StoryObj } from '@storybook/react'

import Duration from './index'

const meta: Meta<typeof Duration> = {
  title: 'Common/Duration',
  component: Duration,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Duration>

export const Default: Story = {
  args: {
    fromDate: '01 Jan 1970 00:00:00 GMT',
    toDate: '01 Jan 1970 00:00:03 GMT',
  },
}

export const OneMinute: Story = {
  args: {
    fromDate: '01 Jan 1970 00:00:00 GMT',
    toDate: '01 Jan 1970 00:01:00 GMT',
  },
}

export const OneHour: Story = {
  args: {
    fromDate: '01 Jan 1970 00:00:00 GMT',
    toDate: '01 Jan 1970 01:00:00 GMT',
  },
}

export const OneMinuteTwoSeconds: Story = {
  args: {
    fromDate: '01 Jan 1970 00:00:00 GMT',
    toDate: '01 Jan 1970 00:01:02 GMT',
  },
}

export const OneHourOneSecond: Story = {
  args: {
    fromDate: '01 Jan 1970 00:00:00 GMT',
    toDate: '01 Jan 1970 01:00:01 GMT',
  },
}

export const TwoHoursOneMinuteThreeSeconds: Story = {
  args: {
    fromDate: '01 Jan 1970 00:00:00 GMT',
    toDate: '01 Jan 1970 02:01:03 GMT',
  },
}

export const Zero: Story = {
  args: {
    fromDate: '01 Jan 1970 00:00:00 GMT',
    toDate: '01 Jan 1970 00:00:00 GMT',
  },
}
