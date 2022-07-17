import { useSearchParams } from "react-router-dom";

export function useQueryString(
  queryKey: string
): [string, (string: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (queryValue: string) => {
    const oldParams = Object.fromEntries(searchParams);
    const updatedParam = { [queryKey]: queryValue };
    const newParams = { ...oldParams, ...updatedParam };
    setSearchParams(newParams, { replace: true });
  };

  return [searchParams.get(queryKey) || "", handleChange];
}
