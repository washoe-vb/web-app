import { useSearchParams } from "react-router-dom";

export function useSyncInputWithQueryString (queryKey: string): [ string, React.ChangeEventHandler ] {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldParams = Object.fromEntries(searchParams);
    const updatedParam = { [queryKey]: event.currentTarget.value };
    const newParams = { ...oldParams, ...updatedParam };
    setSearchParams(newParams, { replace: true });
  };

  return [ searchParams.get(queryKey) || "", handleChange ];
}
