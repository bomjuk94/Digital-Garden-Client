import { toast } from 'react-toastify'
import type { statusType, messageType } from '../types'

export const showToast = (status: statusType, message: messageType) => {
    toast[status](message)
}