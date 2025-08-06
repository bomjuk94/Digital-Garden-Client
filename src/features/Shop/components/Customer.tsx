import CustomerDialogBox from './CustomerDialogBox'
import type { CustomerProps } from '../types'

const Customer = ({ customer }: CustomerProps) => {

    return (
        <section
            className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 z-10 flex flex-col gap-2.5 items-center"
        >
            <CustomerDialogBox customer={customer} />

            <div
                className='h-three-fifty-four overflow-hidden'
            >
                <img
                    src={customer.image}
                    alt={customer.name}
                    className='w-two-hundred-ten'
                />
            </div>
        </section>
    )
}

export default Customer