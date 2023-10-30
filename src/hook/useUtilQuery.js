import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useQueryHelper from "./useQueryHelper";

const useUtilQuery = ({
  endpoint = null,
  method = "GET",
  contentType = null,
  body = null,
  token = null,
  pageParam = null,
  resourceIdentifier = null
}, { queryKey = ["users"], enabled = true, refetchOnWindowFocus = false, mutations, invalidateQueries = false }) => {

  const queryClient = useQueryClient();
  const newMutation = useQueryHelper

  const { isLoading, data, error, isError, isFetching, ...restQuery } = useQuery({
    queryKey,
    queryFn: () => newMutation({
      endpoint,
      method,
      contentType,
      body,
      token,
      pageParam,
      resourceIdentifier,
    }),
    enabled: enabled,
    refetchOnWindowFocus,
  });



  const handleMutation = ({ ...rest }) => {
    const { type, data } = rest;
    if (mutations?.[type]?.(data) && data) return mutations?.[type]?.(data);
    if (data) return newMutation({ ...data });
    return newMutation({ ...rest });

  }

  const { mutate, data: dataMutate, isLoading: isLoadingMutate, isError: isErrorMutate, isPending: isPendingMutate, isSuccess: isSuccessMutate, error: errorMutate, ...restMutate } = useMutation({
    mutationFn: handleMutation,
    onSuccess: (data) => {
      invalidateQueries && queryClient.invalidateQueries(queryKey);
      console.log({ data });
    },
    onError: (e) => {
      console.log(e);
    },
  });


  return {
    query: {
      isLoading, isFetching, data, error, isError, ...restQuery
    },
    mutate: {
      mutate, dataMutate, isLoadingMutate, isErrorMutate, isPendingMutate, isSuccessMutate, errorMutate, ...restMutate
    }
  }

}

export default useUtilQuery