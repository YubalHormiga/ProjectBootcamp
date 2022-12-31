import log from '../utils/coolog'
import { useEffect, useState } from 'react'
import retrieveUser from '../logic/retrieveUser'
import Header from '../components/Header'
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'
import Flow from './Flow'
import Appointment from './Appointment'
const { FormatError, AuthError, LengthError, NotFoundError } = errors

function Home() {
    log.info('Home -> render')

    const [user, setUser] = useState()
    const { showAlert } = useContext(Context)

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => setUser(user))
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
        }
    }, [])

    return <main className='font-serif'>
        {user && <Header userName={user.name}  />}
        <div className=' md:grid md:grid-rows-2 grid-cols-2 gap-2  text-center mx-2'>
            <section className='h-[32rem] overflow-y-auto  row-start-1 row-end-4 col-start-1 col-end-2  w-full p-2 rounded-lg bg-white '>
                <div>
                    <Flow />
                </div>
            </section>
            <section className='h-[32rem] overflow-y-auto row-start-1 row-end-3 col-start-2 col-end-3  w-full rounded-lg bg-white p-2'>
                <div>
                    <Appointment />
                </div>
            </section>
        </div>

    </main>
}

export default Home