import log from '../utils/coolog'
import { useState, useEffect } from 'react'
import createAppointment from '../logic/createAppointment'
import Context from '../components/Context'
import { useContext } from 'react'
import { errors } from 'com'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

function AppointmentForm({ onNewAppointment, appointment }) {
    log.info('AppoimentForm -> render')
    //*Alertas
    const { showAlert } = useContext(Context)

    //*States */
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [body, setBody] = useState('')

    //*Eventos */
    const handleChangeName = event => setTitle(event.target.value)
    const handleChangeDate = event => setDate(event.target.value)
    const handleChangeText = event => setBody(event.target.value)

    useEffect(() => {
        setTitle(appointment.title)
        setDate(appointment.date)
        setBody(appointment.body)

    }, [appointment])

    const submitCreateAppointment = event => {
        event.preventDefault()
        try {
            createAppointment(sessionStorage.token, title, body, new Date(date))
                .then(() => onNewAppointment())
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

        //*Creamos un Objeto con todos los valores no hace falta añadir el valor ya que es el mismo.
        const appointment = {
            title,
            date,
            body,
        }
        //*Recogemos los apointments
        onNewAppointment(appointment)
        //*Limpiamos formulario
        setTitle('')
        setDate('')
        setBody('')

    }

    return <>
        <form className=' rounded-lg shadow-md shadow-[#219ebc] p-2 mb-4 ' onSubmit={submitCreateAppointment}>
            <div className='md:flex justify-evenly gap-2'>
                <div className='flex shadow-md mb-3 '>
                    <label htmlFor='appointment' className=' w-20 font-semibold text-lg flex justify-start'>Cita</label>
                    <input id='appointment' className='w-full font-semibold text-lg  ' type='text' placeholder='Nombre de  Cita' value={title} onChange={handleChangeName} /> 
                </div>
                <div className='flex shadow-md mb-3'>
                    <label htmlFor='date' className='flex justify-start w-20 font-semibold text-lg'>Fecha</label>
                    <input type="datetime-local" className=' w-full font-semibold text-lg text-center' value={date} onChange={handleChangeDate} />
                </div>
            </div>
            <div className='shadow-md mb-3'>
                <label htmlFor='text' className=' flex justify-center  font-semibold text-lg'>Texto</label>
                <textarea id='text' className='w-full text-center font-semibold text-lg  placeholder-gray-500 ' placeholder='Describe la cita' value={body} onChange={handleChangeText} />
            </div>

            <input type='submit' className='text-center my-1 px-6 py-1 rounded-sm font-medium border-2 border-cyan-900 hover:text-white text-cyan-900 hover:bg-cyan-900 cursor-pointer ' value='Añadir Cita' />
        </form>
    </>

}

export default AppointmentForm