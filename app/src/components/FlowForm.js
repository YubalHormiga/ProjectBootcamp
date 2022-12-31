import log from "../utils/coolog"
function FlowForm({ pension, setPension, setIsValidPension }) {
    log.info('FlowForm -> render')

    //*Eventos
    const handlePension = event => setPension(Number(event.target.value))

    const submitCreatePension = (e) => {
        e.preventDefault()

        setIsValidPension(true)
    }

    return <div>
        <form onSubmit={submitCreatePension}>
            <div>
                <label htmlFor="pension" className="mr-2 font-semibold text-lg">Presupuesto</label>
                <input className="font-semibold text-lg text-center"
                    id="pension"
                    type='number'
                    placeholder="Introduce Presupuesto"
                    value={pension}
                    onChange={handlePension}
                />
            </div>
            <input type='submit' className='text-center my-1 px-6 py-1 rounded-sm font-medium border-2 border-cyan-900 hover:text-white text-cyan-900 hover:bg-cyan-900 cursor-pointer' value='Añadir' />

        </form>
    </div>
}

export default FlowForm