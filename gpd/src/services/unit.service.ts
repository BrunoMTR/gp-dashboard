import axiosInstance from '@/lib/axios'
import type { Unit} from '../api/units/types'

const UNIT_PATH = '/units'

export async function getAllUnits(): Promise<Unit[]> {
  const response = await axiosInstance.get(UNIT_PATH)
  return response.data
}

export async function createUnit(data: Unit): Promise<Unit> {
  const response = await axiosInstance.post(UNIT_PATH, data)
  return response.data
}

