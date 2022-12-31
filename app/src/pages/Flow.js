import { useState } from 'react'
import FlowHeader from '../components/FlowHeader'
import FlowModal from '../components/FlowModal'
import FlowList from '../components/FlowList'

function Flow() {
  const [flowsChange, setFlowsChange] = useState([])//*Gastos
  const [totalFlows, setTotalFlows] = useState()
  const [isValidPension, setIsValidPension] = useState(false)
  const [modal, setModal] = useState(false)

  const handleNewExpense = () => {
    setModal(true)
  }

  const handleNewFlow = () => {
    // console.log(flow) //*Comprobamos que reocoge los datos
    setFlowsChange(Date.now())

  }
  //*Recogemos los datos de FlowList
  const handleOnRefreshedFlows = (flows) => {
    let spent = 0
    let income = 0

    flows.forEach(flow => {
      if (flow.type === "expense") {
        spent += flow.amount
      } else {
        income += flow.amount
      }
    })

    setTotalFlows({ spent, income })
  }

  return <>
    <div>
      <FlowHeader
        flowsChange={flowsChange}
        totalFlows={totalFlows}
        isValidPension={isValidPension}
        setIsValidPension={setIsValidPension}
      />

      {isValidPension && (
        <>
          <main>
            <div className='my-1 hover:shadow-white  shadow-[#219ebc] p-1 rounded-sm shadow-md'>
              <button className='text-center my-1 px-6 py-1 rounded-sm font-medium border-2 border-cyan-900 hover:text-white text-cyan-900 hover:bg-cyan-900 cursor-pointer r' type='button' onClick={handleNewExpense}>Agregar un nuevo apunte</button>
              
            </div>
          </main>
        </>
      )}

      {modal && <FlowModal
        setModal={setModal}
        onNewFlow={handleNewFlow}
      />}
      <FlowList
        flowsChange={flowsChange}
        onRefresh={handleOnRefreshedFlows}
      />
    </div>
  </>
}

export default Flow