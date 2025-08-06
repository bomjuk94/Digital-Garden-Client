import type { Customer } from "@/features/Shop/types"

export type CustomerDetails = Pick<Customer, 'id' | 'name' | 'image'>