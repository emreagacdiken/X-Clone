import useSwr from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userId: String) => {
  const { data, error, isLoading, mutate } = useSwr(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;