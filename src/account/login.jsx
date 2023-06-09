import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login = () =>{

    const navigate = useNavigate()
    const [err, setErr] = useState(false)
    const onSubmitHandler = async e => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }
        catch(err){
            setErr(true)
        }
    }
    return (
        <div className="form-wrapper">
            <form action="" onSubmit={onSubmitHandler}>
                <h2>lama chat</h2>
                <p>login</p>
                <input type="email" name="" id="" placeholder="email" required/>
                <input type="password" name="" id="" placeholder="password" required/>

                <button type="submit">Sign in</button>
                {err && <span>Something went wrong</span>}
                <p>You don't have an account? <Link to='/register'>Sign up</Link></p>

            </form>
        </div>
    )
}

export default Login