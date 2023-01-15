type Opts = { pathname?: string; query?: object }
const navigationProps = ({ pathname = '', query = {} }: Opts = {}) => ({
  parameters: {
    nextjs: {
      navigation: {
        pathname: pathname,
        query: query,
      },
    },
  },
})

export default navigationProps
