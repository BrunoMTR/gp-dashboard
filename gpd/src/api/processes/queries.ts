import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllProcesses, getAllDocs } from '../../services/processes.service';
import type { ProcessesApiResponse, DocsApiResponse } from '../../api/processes/types';

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

export function useDocs(filters: Filters) {
  return useQuery<DocsApiResponse, Error>({
    queryKey: ["docs", filters],
    queryFn: () => getAllDocs(filters),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}


