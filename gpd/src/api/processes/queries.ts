import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllProcesses } from '../../services/processes.service';
import type { ProcessFlow } from '../../api/processes/types';

interface Filters {
  pageIndex: number;
  pageSize: number;
  search: string;
  application: string;
  dateFilter: string;
}

export function useProcesses(filters: Filters) {
  return useQuery<ProcessFlow[], Error>({
    queryKey: ['processes', filters],
    queryFn: () => getAllProcesses(filters),
    placeholderData: keepPreviousData, 
    staleTime: 5 * 60 * 1000,
  });
}
