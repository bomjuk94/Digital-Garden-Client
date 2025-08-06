import { useModalStore } from "@/shared/stores/useModalStore"
import Tabs from "@/features/Store/components/Tabs"
import { tabOptions } from "@/shared/utils.ts/constantsTabOptions"
import TabContent from "@/features/Store/components/TabContent"

const InventoryModal = () => {

    const { closeModal } = useModalStore()

    const handleCloseInventoryModal = () => {
        closeModal()
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 max-w-lg w-[90%] space-y-4 text-[var(--text-primary)] text-sm leading-relaxed relative flex flex-col max-h-[90vh]">

                    <h2 className="text-2xl font-semibold text-center">🧰 Inventory</h2>

                    <Tabs tabOptions={tabOptions.inventory} />
                    <div className="overflow-y-auto pr-1 flex-1 hide-scrollbar">
                        <TabContent />
                    </div>


                    <button
                        onClick={handleCloseInventoryModal}
                        aria-label="Close inventory modal"
                        className="absolute top-2 right-2.5 text-2xl cursor-pointer"
                    >
                        X
                    </button>

                </div>
            </div>
        </>
    )
}

export default InventoryModal