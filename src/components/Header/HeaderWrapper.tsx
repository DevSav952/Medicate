import Header from './Header'
import { getSession } from '@/lib/auth'

const HeaderWrapper = async () => {
  const session = await getSession()

  return (
    <header>
      <Header session={session} />
    </header>
  )
}
export default HeaderWrapper
