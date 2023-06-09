import Chat from "./chat"
import SideBar from "./sidebar"


const Home = () => {
    return(
        <div className="home">
            <div className="container">
                <SideBar />
                <Chat />
            </div>
        </div>
    )
}

export default Home