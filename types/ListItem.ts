import { StatsProps } from './Stats'
import Url from './Url'

export interface ListItemComponentProps {
  title: string
  description?: string
  stats?: StatsProps
  href?: Url
}
