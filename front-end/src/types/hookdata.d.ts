interface UseGeneralReturns {
  isPending: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error;
}

interface useMutationReturns extends Partial<UseGeneralReturns> {
  mutate: (data: FormData, id?: string) => Promise;
}

interface usePaginatedReturns<DataType> extends Partial<UseGeneralReturns> {
  data: DataType;
}
