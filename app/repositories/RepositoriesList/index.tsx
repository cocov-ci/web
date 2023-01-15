import ListItem from 'app/common/ListItem'
import { RepositoryResponseProps } from 'types/Repositories'

interface ListProps {
  repositories: RepositoryResponseProps[]
}

const List = ({ repositories }: ListProps): JSX.Element => {
  return (
    <>
      {repositories.map(item => (
        <ListItem
          description={item.description}
          key={item.id}
          title={item.name}
        />
      ))}
    </>
  )
}

export default List
