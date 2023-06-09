import { useContext, useState } from "react"
import { collection, getDoc, getDocs, query, setDoc, where, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../account/firebase"
import { AuthContext } from "../context/authContext"

const Search = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [err, setErr] = useState(false)
    const {currentUser} = useContext(AuthContext)

    const onChangeHandler = e => {
        setUsername(e.target.value)
    }

    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'), 
            where('displayName', '==', username)
        )

        try{
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                setUser(doc.data())
            })
        }catch(err){
            setErr(true)
        }
    }

    // on key down handler
    const onKeyDownHandler = e => {
        e.code === "Enter" && handleSearch()
    }

    // on select handler
    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try{
            const res = await getDoc(doc(db, 'chats', combinedId))
            if(!res.exists()){
                await setDoc(doc(db, 'chats', combinedId), {messages: []})

                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId+'.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId+'.date']: serverTimestamp()
                })
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId+'.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId+'.date']: serverTimestamp()
                })
            }
            setUsername('')
            setUser(null)
        }catch(err){

        }
    }
    return(
        <div className="search">
            <div className="userSearch">
                <input type="search" placeholder="Find a user" onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={username}/>
            </div>
            {err && <span>user not found</span>}
            {
                user 
                && 
                <div className="users" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search