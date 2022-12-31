import Button from './Button'

export default function Alert({ message, level = 'error', onClose }) {
    const color = level === 'fatal' || level === 'error' ? 'red' : level === 'warn' ? 'gold' : level === 'info' ? 'blue' : 'green'

    return <div className="bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden" onClick={onClose}>
        <div className={`p-5 rounded-xl flex flex-col items-end gap-2 ${level === 'fatal' ? 'bg-[red]' : 'bg-white dark:bg-black'} text-black dark:text-white border-4 border-[${color}]`} onClick={event => event.stopPropagation()}>
            <p>{message}</p>
            <div className="flex gap-2" >
                <Button onClick={onClose}>Ok</Button>
            </div>
        </div>
    </div>
}