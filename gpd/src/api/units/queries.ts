import { queryOptions } from '@tanstack/react-query'
import { getAllUnits } from '../../services/unit.service'

export function useGetUnitsOptions(){
  return queryOptions({
    queryKey:['units'],
    queryFn: () => getAllUnits(),
    staleTime: 5 * 60 * 1000
  })
}