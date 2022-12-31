import log from '../utils/coolog'
import AppointmentForm from '../components/AppointmentForm'
import AppointmentLists from '../components/AppointmentLists'
import { useState } from 'react'

function Pension() {
    log.info('Appointment -> render')
    const [appointmentsChange, setAppointmentsChange] = useState() //* Para recoger todos los datos del Formulario
    const [appointment, setAppointment] = useState({})
    const handleOnNewAppointment = () => {
        setAppointmentsChange(Date.now())
    }

    return <>
        <div className='font-mono'>
            < AppointmentForm
                onNewAppointment={handleOnNewAppointment} //*Props
                appointment={appointment}//*Props
            />
            < AppointmentLists
                appointmentsChange={appointmentsChange} //*Props
                setAppointment={setAppointment}
            />
        </div>
    </>

}

export default Pension