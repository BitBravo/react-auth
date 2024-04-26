import LoadingSpinner from "../components/LoadingSpinner";
import { useInfo } from "../hooks/useInfo";

const InfoPage = () => {
  const { loading, info } = useInfo();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="py-4">
      <h1 className="text-3xl font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: info }} />
    </div>
  );
};

export default InfoPage;
