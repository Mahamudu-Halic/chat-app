import Chats from "./chats"
import Navbar from "./navbar"
import Search from "./search"


const SideBar = () => {
    return(
        <div className="sidebar">
            <Navbar />
            <Search /> 
            <Chats />
        </div>
    )
}

export default SideBar