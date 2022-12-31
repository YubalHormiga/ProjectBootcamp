/* eslint-disable react/jsx-no-comment-textnodes */
import log from '../utils/coolog'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { getLiteralForKind } from '../utils/getLiteralForKind'
import { getLiteralForType } from '../utils/getLiteralForType'
import { useEffect, useState } from 'react'
import retrieveFlows from '../logic/retrieveFlows'
import UpdateFlow from './UpdateFlow'
import DeleteFlow from './DeleteFlow'
import Context from '../components/Context'
import { useContext } from 'react'
import { errors } from 'com'

const { FormatError, AuthError, LengthError, NotFoundError } = errors
function FlowList({ flowsChange, onRefresh }) {
  log.info('FlowList -> render')
  const { showAlert } = useContext(Context)

  const [flows, setFlows] = useState([])
  const [updateFlow, setUpdateFlow] = useState()
  const [flowIdToDelete, setFlowIdToDelete] = useState()

  useEffect(() => {
    retrieveFlowsHandler()
  }, [flowsChange])

  useEffect(() => {
    onRefresh(flows)
  }, [flows])

  const retrieveFlowsHandler = () => {
    try {
      retrieveFlows(sessionStorage.token)
        .then(flows => setFlows(flows))
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
    setUpdateFlow()
  }

  const handleUpdated = () => {
    retrieveFlowsHandler()

    setUpdateFlow()
  }
  const openDeleteFlow = flowId => setFlowIdToDelete(flowId)

  const closeDeleteFlow = () => setFlowIdToDelete()

  const handleFlowDeleted = () => {
    try {
      retrieveFlows(sessionStorage.token)
        .then(appointments => {
          setFlowIdToDelete()
          setFlows(appointments)
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

  return <>
    {flows.map((flow) => {
      const type = getLiteralForType(flow.type)//? PARA PODER CAMBIAR LOS VALUES
      const kind = getLiteralForKind(flow.kind)//? PARA PODER CAMBIAR LOS VALUES

      return (
        <div key={flow.id} className='hover:bg-[#8ecae6] hover:shadow-white  shadow-[#8ecae6] transition duration-300 ease-linear  p-2 rounded-lg shadow-md md:flex md:justify-between gap-5 pb-1 mb-2 mt-3'>
          <div className=' ' >
            <p className='text-center md:text-left font-semibold text-lg'>{type}</p>
          </div>
          <div className=' text-right'>
            <p className='text-center md:text-left font-semibold text-lg'>{kind}</p>
          </div>
          <div className='full'>
            <p className='text-center md:text-left font-semibold text-lg'>{flow.description}</p>
          </div>
          <div className='' >
            <p className='text-center md:text-left font-semibold text-lg'>{flow.amount}€</p>
          </div>
          <div className=''>
            <p className=' font-semibold text-lg '>{flow.date.toLocaleDateString()}</p>
          </div>
          <div className=''>
            <div className='flex justify-center gap-6 md:flex-col md:gap-1 '>
              <button onClick={() => { setUpdateFlow(flow) }} className='bg-white rounded-md p-1 m-1' type='button'><AiOutlineEdit size='1.1rem' /></button>
              <button onClick={() => openDeleteFlow(flow.id)} className=' bg-white rounded-md p-1 m-1' type='button'><AiOutlineDelete size='1.1rem' /></button>
            </div>
          </div>

        </div>
      )
    })}
    {updateFlow && <UpdateFlow flow={updateFlow} onClose={handleUpdateClose} onUpdated={handleUpdated} />}
    {flowIdToDelete && <DeleteFlow flowId={flowIdToDelete} onDeleted={handleFlowDeleted} onClose={closeDeleteFlow} />}

  </>
}

export default FlowList