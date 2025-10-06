import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllProcesses } from '../../services/processes.service';
import type { ProcessesApiResponse } from '../../api/processes/types';

interface Filters {
  pageIndex: number;
  pageSize: number;
  search: string;
  applicationId: number;
  dateFilter: string;
  
}


export function useProcesses(filters: Filters) {
  return useQuery<ProcessesApiResponse, Error>({
    queryKey: ["processes", filters],
    queryFn: () => getAllProcesses(filters),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}
