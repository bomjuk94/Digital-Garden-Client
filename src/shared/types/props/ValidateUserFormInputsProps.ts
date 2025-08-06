export interface ValidateUserFormInputsProps {
    newUsername: string | undefined,
    newPassword: string | undefined,
    newErrors: string[],
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
    updatePayload: Record<string, string>,
}