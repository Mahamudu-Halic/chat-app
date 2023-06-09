import { useContext } from "react"
import { auth } from "../account/firebase"
import { signOut } from "firebase/auth"
import { AuthContext } from "../context/authContext"

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    return(
        <div className="navbar">
            <span className="logo">Lama Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span className="name">{currentUser.displayName}</span>
                <button className="logout"onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

export default Navbar