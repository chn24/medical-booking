import Error403 from '../../screens/ErrorPages/Error403'

function index({ isLogin, path, children }) {
  if (!isLogin.login || (isLogin.login && isLogin.roll === 'User')) {
    return <Error403 />
  }
  return children
}

export default index
