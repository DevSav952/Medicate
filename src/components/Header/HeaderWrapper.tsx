import Header from './Header'
import { getSession } from '@/lib/auth'

const HeaderWrapper = async () => {
  const { isLoggedIn } = await getSession()

  return (
    <header>
      <Header isLoggedIn={isLoggedIn} />
    </header>
  )
}
export default HeaderWrapper
