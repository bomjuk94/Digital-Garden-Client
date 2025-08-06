import type { UserModeType } from '@/shared/types';

export const isUserModeType = (value: string | null): value is UserModeType => {
    return value === "guest" || value === "registered";
};