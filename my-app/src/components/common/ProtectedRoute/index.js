import Error403 from '../../screens/ErrorPages/Error403'

function index({ isLogin, path, children }) {
  if (!isLogin) {
    return <Error403 />
  }
  return children
}

export default index
