import { useModalStore } from "@/shared/stores/useModalStore"
import type { ReceiptModalProps } from "@/shared/types"
import { capitalizeName } from "@/shared/utils.ts/capitalizeName"
import { convertUnix } from "@/shared/utils.ts/convertUnixToHumanReadable"

const ReceiptModal = ({ receipts }: ReceiptModalProps) => {

    const { closeModal } = useModalStore()

    const handleCloseReceiptsList = () => {
        closeModal()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 max-w-lg w-[90%] space-y-4 text-[var(--text-primary)] text-sm leading-relaxed overflow-y-auto max-h-[90vh] hide-scrollbar relative flex flex-col gap-7">
                <h2 className="text-2xl font-semibold text-center">📜 Receipts</h2>

                <div className="space-y-4 text-left h-desktop-height overflow-y-auto hide-scrollbar">
                    {
                        receipts.length !== 0 ?
                            <ul className="flex flex-col gap-5">
                                {
                                    receipts.map((purchase) => (
                                        <li
                                            className={`flex flex-col gap-2 py-4 px-4 rounded-xl shadow-sm ${purchase.method === "passive"
                                                ? "bg-[var(--bg-secondary)]"
                                                : "bg-[var(--accent-green)]/90"
                                                }`}
                                        >
                                            <div className="flex gap-1.5 mb-3.5 items-center">
                                                <img
                                                    src={purchase.customer.image} alt={purchase.customer.name}
                                                    className="w-10 h-10 rounded-full object-contain"
                                                />
                                                <p>{capitalizeName(purchase.customer.name)}</p>
                                            </div>
                                            <div>
                                                <p>Plant: {purchase.plant.label}</p>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <p>Method: {capitalizeName(purchase.method)} </p> |
                                                <p>Price: ${purchase.purchasePrice}</p>
                                            </div>
                                            <div>
                                                <p>Date and time sold: {convertUnix(purchase.timestamp, true)}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            :
                            <p>
                                No purchases yet...
                            </p>
                    }
                </div>

                <button
                    onClick={handleCloseReceiptsList}
                    aria-label='Close receipt log'
                    className="absolute top-2 right-2.5 text-2xl cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default ReceiptModal
