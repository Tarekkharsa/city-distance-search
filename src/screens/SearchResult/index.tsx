import useSearchResults from "../../hooks/useSearchResults";

export default function SearchResult() {
  const { fetchDataOptions, destinations } = useSearchResults();

  if (!fetchDataOptions) {
    return <div>Failed to parse query parameters</div>;
  }

  return (
    <div>
      SearchResult
      <>{JSON.stringify(destinations)}</>
    </div>
  );
}
