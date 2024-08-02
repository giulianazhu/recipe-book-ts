import { ApiInfiniteResults } from "./apidata";

export interface UseGeneralReturns {
  isPending: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseMutationReturns extends Partial<UseGeneralReturns> {
  mutate: (data: FormData, id?: string) => Promise;
}

export interface UseMultipleDataReturns<DataType>
  extends Partial<UseGeneralReturns> {
  [dataName: string]: DataType | undefined;
}

export interface UsePaginatedReturns<DataType>
  extends Partial<UseGeneralReturns> {
  data: DataType | undefined;
}

export interface UseInfiniteData {
  data: { pageParams: number[]; pages: ApiInfiniteResults[] };
}
