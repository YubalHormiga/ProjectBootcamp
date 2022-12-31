/* eslint-disable import/no-anonymous-default-export */
import log from '../utils/coolog'
import deleteFlow from '../logic/deleteFlow'
import Button from './Button'
import Context from '../components/Context'
import { useContext } from 'react'
import { errors } from 'com'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

export default function ({ flowId, onDeleted, onClose }) {
    log.info('Delete -> render')
    const { showAlert } = useContext(Context)

    const confirmDeleteFlow = event => {
        event.preventDefault()

        try {
            deleteFlow(sessionStorage.token, flowId)
                .then(() => onDeleted())
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

    return <div className="'bg-[#aaaa] absolute  top-0 right-0 h-full w-full flex flex-col justify-center items-center overflow-hidden" onClick={onClose}>
        <div className="bg-cyan-700 text-white font-bold p-5 rounded-sm flex flex-col items-end gap-2 " onClick={event => event.stopPropagation()}>
            <p>Segur@ que quieres eliminar el apunte?</p>
            <div className="flex gap-2" >
                <Button className='border-white bg-sky-900 hover:bg-sky-700 ' onClick={onClose}>Cancel</Button>
                <Button className='border-white bg-sky-900 hover:bg-sky-700 ' onClick={confirmDeleteFlow}>Delete</Button>
            </div>
        </div>
    </div>
}