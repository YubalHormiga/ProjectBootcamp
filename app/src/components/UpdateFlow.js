/* eslint-disable import/no-anonymous-default-export */
import log from '../utils/coolog'
import updateAppointment from '../logic/updateFlow'
import { GrFormClose } from 'react-icons/gr'
import Context from '../components/Context'
import { useContext } from 'react'
import { errors } from 'com'

const { FormatError, AuthError, LengthError, NotFoundError } = errors
export default function UpdateFlow({ onUpdated, onClose, flow }) {
    log.info('UpodateFlow -> render')
    const { showAlert } = useContext(Context)

    const submitUpdateFlow = event => {
        event.preventDefault()
        const { type: { value: type }, kind: { value: kind }, description: { value: description }, amount: { value: amount }, date: { value: date }, } = event.target

        try {
            updateAppointment(sessionStorage.token, flow.id, type, kind, description, Number(amount), new Date(date), error => {
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
        <div className='p-6 rounded-xl flex flex-col items-end bg-white dark:bg-black text-black dark:text-white' onClick={event => event.stopPropagation()}>
            <GrFormClose size='1.5rem' onClick={onClose} className='mb-1 cursor-pointer' />

            <form className='flex flex-col gap-4' onSubmit={submitUpdateFlow}>
                <label htmlFor='type' className='flex justify-start font-semibold text-xl'>Modifique Apunte:</label>
                <select id='type' defaultValue={flow.type} className='font-semibold hover:opacity-100 rounded-sm text-lg flex flex-row bg-blue-100 opacity-40'>
                    <option value=''>--Seleccionar--</option>
                    <option value='income'>Ingreso</option>
                    <option value='expense'>Gasto</option>
                </select>
                <label htmlFor='kind' className='flex justify-start font-semibold text-xl' >Modifique Categoria:</label>
                <select id='kind' defaultValue={flow.kind} className='font-semibold hover:opacity-100 rounded-sm text-lg flex flex-row bg-blue-100 opacity-40' >
                    <option value=''>--Seleccionar--</option>
                    <option value='food'>Comida</option>
                    <option value='supply'>Suministros</option>
                    <option value='medicine'>Medicamentos</option>
                    <option value='services'>Servicios</option>
                    <option value='gift'>Regalo</option>
                    <option value='donation'>Donation</option>
                    <option value='other'>Otros</option>
                </select>

                <div className=''>
                    <label htmlFor='description' className='flex justify-start font-semibold text-xl'>Modifique Descripción:</label>
                    <input
                        name='description'
                        className='font-semibold hover:opacity-100 rounded-sm text-lg flex flex-row bg-blue-100 opacity-40'
                        defaultValue={flow.description}
                        id='description'
                    />
                </div>

                <div className='' >
                    <label htmlFor='description' className='flex justify-start font-semibold text-xl'>Modifique Cantidad:</label>
                    <input
                        name='amount'
                        type='number'
                        className='font-semibold hover:opacity-100 rounded-sm text-lg flex flex-row bg-blue-100 opacity-40 text-center '
                        defaultValue={flow.amount}
                        id='amount'
                    />
                </div>

                <div>
                    <input
                        name='date'
                        type='datetime-local'
                        className=' font-semibold hover:opacity-100 rounded-sm text-lg flex flex-row bg-blue-100 opacity-40 text-center '
                        defaultValue={flow.date.toISOString().substring(0, 23)}
                        id='date'
                    />
                </div>

                <button
                    className="text-center my-1 px-6 py-1 rounded-sm font-medium border-2 border-cyan-900 text-white hover:text-cyan-900 bg-cyan-900 hover:bg-white cursor-pointer"
                    type="submit"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    </div>
}

// type, kind, description, amount, date