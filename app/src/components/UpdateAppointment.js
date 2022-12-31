/* eslint-disable import/no-anonymous-default-export */
import log from '../utils/coolog'
import updateAppointment from '../logic/updateAppointment'
import { GrFormClose } from 'react-icons/gr'
import Context from '../components/Context'
import { useContext } from 'react'
import { errors } from 'com'

const { FormatError, AuthError, LengthError, NotFoundError } = errors
export default function UpdateAppointment({ onUpdated, onClose, appointment }) {
    log.info('UpdateAppoiment -> render')
    const { showAlert } = useContext(Context)

    const submitUpdateAppointment = event => {
        event.preventDefault()

        const { title: { value: title }, body: { value: body }, date: { value: date } } = event.target

        try {
            updateAppointment(sessionStorage.token, appointment.id, title, body, date, error => {
                if (error) {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError) {
                        showAlert(error.message, 'warn')
                        return
                    }
                    else if (error instanceof AuthError || error instanceof NotFoundError) {
                        showAlert(error.message, 'error')
                        return
                    }
                    else {
                        showAlert(error.message, 'fatal')
                        return
                    }
                }

                onUpdated()
            })
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError) {
                showAlert(error.message, 'warn')
            }
            else if (error instanceof AuthError || error instanceof NotFoundError) {
                showAlert(error.message, 'error')
            }
            else {
                showAlert(error.message, 'fatal')
            }
        }
    }

    return <div className='bg-[#aaaa] absolute  top-0 right-0 h-full w-full flex flex-col justify-center items-center overflow-hidden' onClick={onClose}>
        <div className='p-3 rounded-lg flex flex-col items-end bg-white dark:bg-black text-black dark:text-white ' onClick={event => event.stopPropagation()}>
            <GrFormClose size='1.5rem' onClick={onClose} className='cursor-pointer' />

            <form className='flex flex-col gap-8' onSubmit={submitUpdateAppointment}>
                <div className='flexflex-col  gap-3'>
                    <label htmlFor='title' className='flex justify-start font-semibold text-xl'>Cita:</label>
                    <input
                        name='title'
                        className='font-semibold hover:opacity-100 rounded-sm text-lg flex flex-row bg-blue-100 opacity-40'
                        defaultValue={appointment.title}
                        id='title'
                    />
                </div>

                <div className='flex flex-col  gap-3' >
                    <label htmlFor='body' className='flex justify-start font-semibold text-xl'>Texto:</label>
                    <input
                        name='body'
                        className='font-semibold hover:opacity-100 rounded-sm text-lg flex flex-row bg-blue-100 opacity-40'
                        defaultValue={appointment.body}
                        id='body'
                    />
                </div>

                <div>
                    <input
                        name='date'
                        type='datetime-local'
                        className='font-semibold hover:opacity-100 rounded-sm text-lg flex flex-row bg-blue-100 opacity-40 text-center'
                        defaultValue={appointment.date.toISOString().substring(0, 23)}
                        id='date'
                    />
                </div>

                <button
                    className="text-center my-1 px-6 py-1 rounded-sm font-medium border-2 border-cyan-900 text-white hover:text-cyan-900 bg-cyan-900 hover:bg-white cursor-pointer "
                    type="submit"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    </div>
}

// post && post.text -> post?.text