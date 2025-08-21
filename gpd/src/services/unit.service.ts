import axiosInstance from '@/lib/axios'
import type { Unit} from '../api/units/types'

const UNIT_PATH = '/units'

export async function getAllUnits(): Promise<Unit[]> {
  const response = await axiosInstance.get(UNIT_PATH)
  return response.data
}