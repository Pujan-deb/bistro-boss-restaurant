import { useContext } from "react"
import { Authinfo } from "../../Context/AuthProvider"
import { useNavigate } from "react-router-dom"

export default function SocialLogin() {
    const { signInWithGoogle } = useContext(Authinfo)
    const navigate = useNavigate()

    const Googlesignin = () => {
        signInWithGoogle()
            .then((result) => {
                const data = result.user
                const saveuser = { name: data.displayName, email: data.email }
                fetch("http://localhost:5000/user", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveuser)
                }).then(res => res.json())
                    .then(() => {
                        navigate(`/`)
                    })
                console.log(result.user)
            }).catch((error) => { console.log(error.message) })
    }
    return (
        <div>
            <div className="divider"></div>
            <div className='flex justify-center items-center'>
                <button className="btn btn-square btn-outline" onClick={Googlesignin} title='type captcha text'>
                    <i className="fa-brands fa-google"></i>
                </button>
            </div>
        </div>
    )
}
