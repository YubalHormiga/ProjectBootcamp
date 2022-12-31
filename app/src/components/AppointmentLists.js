import log from '../utils/coolog'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import retrieveAppointments from '../logic/retrieveAppointments'
import UpdateAppointment from './UpdateAppointment'
import DeleteAppointment from './DeleteAppointment'
import Context from '../components/Context'
import { useContext } from 'react'
import { errors } from 'com'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

function AppointmentLists({ appointmentsChange }) {
  log.info('AppoimentList -> render')
  const { showAlert } = useContext(Context)

  const [appointments, setAppointments] = useState([])
  const [updateAppointment, setUpdateAppointment] = useState()
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState()

  useEffect(() => {
    log.info('AppoimentLists -> render')

    retrieveAppointmentsHandler()
  }, [appointmentsChange])

  const retrieveAppointmentsHandler = () => {
    try {
      retrieveAppointments(sessionStorage.token)
        .then(appointments => setAppointments(appointments))
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
  }

  const handleUpdateClose = () => {
    setUpdateAppointment()
  }

  const handleUpdated = () => {
    retrieveAppointmentsHandler()

    setUpdateAppointment()
  }

  const openDeleteAppointment = appointmentId => setAppointmentIdToDelete(appointmentId)

  const closeDeleteAppointment = () => setAppointmentIdToDelete()

  const handleAppointmentDeleted = () => {
    try {
      retrieveAppointments(sessionStorage.token)
        .then(appointments => {
          setAppointmentIdToDelete()
          setAppointments(appointments)
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

  return <>
    {appointments.map((appointment) => {
      return (
        <div key={appointment.id} className='hover:bg-[#8ecae6]  hover:shadow-white  shadow-[#8ecae6] transition duration-300 ease-linear p-1 rounded-lg shadow-md flex justify-between gap-5 pb-1 mb-2'>
          <div className=''>
            <p className='font-semibold text-lg flex flex-row'>Cita: {appointment.title}</p>
          </div>
          <div className='' >
            <p className='font-semibold text-lg flex flex-row'>{appointment.date.toGMTString()}</p>
          </div>
          <div>
            <p className='font-semibold text-lg '>{appointment.body}</p>
          </div>
          <div className=''>
            <div className='flex flex-col self-end gap-1'>
              <button onClick={() => setUpdateAppointment(appointment)} className='bg-white rounded-md p-1 m-1' type='button'><AiOutlineEdit size='1.1rem' /></button>
              <button onClick={() => openDeleteAppointment(appointment.id)} className='bg-white rounded-md p-1 m-1' type='button'><AiOutlineDelete size='1.1rem' /></button>
            </div>
          </div>
        </div>

      )
    })}
    {updateAppointment && <UpdateAppointment appointment={updateAppointment} onClose={handleUpdateClose} onUpdated={handleUpdated} />}
    {appointmentIdToDelete && <DeleteAppointment appointmentId={appointmentIdToDelete} onDeleted={handleAppointmentDeleted} onClose={closeDeleteAppointment} />}
  </>

}

export default AppointmentLists