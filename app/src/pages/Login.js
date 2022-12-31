import log from '../utils/coolog'
import authenticateUser from '../logic/authenticateUser'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'
const { FormatError, AuthError, LengthError, NotFoundError } = errors


function Login() {
    log.info('Login -> render')

    const { login, showAlert } = useContext(Context)

    const handleLogin = event => {
        log.info('Login -> handleLogin')

        event.preventDefault()

        const { email: { value: email }, password: { value: password } } = event.target

        try {
            authenticateUser(email, password)
                .then(token => login(token))
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof AuthError || error instanceof NotFoundError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')

            event.target.password.value = ''
        }
    }

    return <main className=" h-full flex flex-col items-center justify-center gap-2 bg-slate-400">
        <div className='bg-white p-5 rounded-lg'>
            <form className="flex flex-col gap-4 mb-4" onSubmit={handleLogin}>
                <label htmlFor="email" className="font-medium container__item--left">E-mail</label>
                <input name="email" type="email" id="email" placeholder="Introduce tu e-mail" className="border-b border-black text-black" />
                <label htmlFor="password" className="font-medium container__item--left">Password</label>
                <input name="password" type="password" id="password" placeholder="Introduce tu contraseña" className="border-b border-black text-black" />
                <button className="text-center my-1 px-6 py-1 rounded-sm font-medium border-2 border-cyan-900 text-white hover:text-cyan-900 hover:bg-white bg-cyan-900 cursor-pointer">Entrar</button>
            </form>
            <div className=' tex-center  text-center gap-3'>
                <Link to="/register" className="text-center my-1 px-6 py-1 rounded-sm font-medium border-2 border-cyan-900 hover:text-white text-cyan-900 bg-white hover:bg-cyan-900 cursor-pointer">Regístrate</Link>
            </div>
        </div>
    </main>
}

export default Login