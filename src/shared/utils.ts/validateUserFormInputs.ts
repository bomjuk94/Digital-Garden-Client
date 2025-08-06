import type { ValidateUserFormInputsProps } from "../types/props/ValidateUserFormInputsProps"

export const validateUserFormInputs = ({
    newUsername,
    newPassword,
    newErrors,
    setErrors,
    updatePayload,
}: ValidateUserFormInputsProps) => {
    if (!newUsername) {
        newErrors.push('Enter a username to begin your journey 🌱')
    }

    if (newUsername) {
        if (newUsername.length < 3) {
            newErrors.push('"Username must be at least 3 characters.')
        } else {
            updatePayload.username = newUsername
        }
    }

    if (!newPassword) {
        newErrors.push('Enter a password begin your journey 🌱')
    }

    if (newPassword) {
        if (newPassword.length < 6) {
            newErrors.push('Password must be at least 6 characters.')
        } else {
            updatePayload.password = newPassword
        }
    }

    setErrors(newErrors)
}