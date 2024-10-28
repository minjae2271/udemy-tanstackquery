import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils"; 

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  const selectFn = useCallback((data: Staff[], filter: string) => {
    if(filter === 'all') return data
    return filterByTreatment(data, filter)
  }, [filter])

  const fallback: Staff[] = []
  // TODO: get data from server via useQuery
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: (data) => selectFn(data, filter)
  });

  return { staff, filter, setFilter };
}
