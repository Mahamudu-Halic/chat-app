import Input from "./input"
import Messages from "./messages"


const Chat = () => {
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>Halic</span>
                <div className="chatIcons">
                    <i className="fa-solid fa-video"></i>
                    <i className="fa-solid fa-user"></i>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat