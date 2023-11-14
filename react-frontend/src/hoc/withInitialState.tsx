import { ComponentType } from "react";

/**

function DataList({ data }) {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
const DataListWithLoading = withInitialComponent(DataList);
export default DataListWithLoading;

============================================================

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data List</h1>
      <DataListWithLoading data={data} isLoading={isLoading} />
    </div>
  );
}
 */

function withInitialComponent(WrappedComponent: ComponentType) {
  return ({
    isLoading,
    error,
    ...props
  }: {
    error: string;
    isLoading: boolean;
  }) => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return <WrappedComponent {...props} />;
  };
}

export default withInitialComponent;
