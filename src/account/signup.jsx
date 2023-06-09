import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

const SignUp = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const onSubmitHandler = async e => {
        e.preventDefault()
        // navigate('/home')
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then( async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(db, 'userChats', res.user.uid), {})
                        navigate('/')
                    });

                }
            );
        }
        catch(err){
            setErr(true)
        }

    }
    return(
        <div className="form-wrapper">
            <form action="" onSubmit={onSubmitHandler}>
                <h2>lama chat</h2>
                <p>register</p>
                <input type="text" name="" id="" placeholder="display name" />
                <input type="email" name="" id="" placeholder="email" />
                <input type="password" name="" id="" placeholder="password" />
                <label htmlFor="attachFile">
                    <input type="file" name="" id="attachFile"/>
                </label>

                <button type="submit">sign up</button>
                {err && <span>something went wrong</span>}
                <p>You do have an account? <Link to='/login'>Login</Link></p>

            </form>
        </div>
    )
}

export default SignUp