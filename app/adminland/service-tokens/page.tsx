import Text from '../../common/Text'
import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'
import Alert from "./Alert";

const Page = () => (
  <Base currentPage="/service-tokens">
    <Text className={BaseStyles.title} variant="title">
      Service Tokens
    </Text>
    <Text className={BaseStyles.bottomMargin}>
      Service Tokens, unlike User Tokens, are used with integrations and other
      internal components in order to access the API without an user account.
    </Text>

    <Alert></Alert>
  </Base>
)

export default Page
