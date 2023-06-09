import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../account/firebase"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext"

const Chats = () => {
    const {currentUser} = useContext(AuthContext)
    const [chats, setChats] = useState([])

    useEffect(() => {
        const getChat = () => {

            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
                setChats(doc.data())
            })
            
            return () => unsub()
        }
        currentUser.uid && getChat()
    }, [currentUser.uid])

    console.log('chats',Object.entries(chats))
    return(
        <div className="chats">
            {Object.entries(chats)?.map(chat => {

                return(
                    <div className="users" onClick='' key={chat[0]}>
                    <img
                    src={chat[1].userInfo.photoURL} 
                    alt="" />
                    <div className="userInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].userInfo.lastMessage?.text}</p>
                    </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Chats