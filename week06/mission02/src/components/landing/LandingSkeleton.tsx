import Skeleton from "react-loading-skeleton";

const LandingSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, idx) => (
        <div key={idx} className="w-full aspect-square">
          <Skeleton width="100%" height="100%" style={{ borderRadius: "0" }} />
        </div>
      ))}
    </section>
  );
};

export default LandingSkeleton;
