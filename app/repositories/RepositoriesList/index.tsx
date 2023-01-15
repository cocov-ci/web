import ListItem from 'app/common/ListItem'
import { RepositoryResponseProps } from 'types/Repositories'

interface ListProps {
  repositories: RepositoryResponseProps[]
}

const RepositoriesList = ({ repositories }: ListProps) => {
  return (
    <div>
      {repositories.map(item => (
        <ListItem
          description={item.description}
          key={item.id}
          title={item.name}
        />
      ))}
    </div>
  )
}

export default RepositoriesList
