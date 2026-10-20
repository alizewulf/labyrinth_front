import { useLogout } from "../model/handleLogout"

function LogoutButton() {
    const {handleLogout } = useLogout()
  return (
    <button onClick={handleLogout}>Log out</button>
  )
}

export default LogoutButton