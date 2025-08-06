export interface CheckTargetReadyProps {
    disableCutout: boolean
    setHasTargetReady: React.Dispatch<React.SetStateAction<boolean>>
    targetId: string
}