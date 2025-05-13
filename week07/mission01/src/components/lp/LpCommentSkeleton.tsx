import Skeleton from "react-loading-skeleton";

const LpCommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex gap-4">
          <Skeleton width={32} height={32} circle />
          <div className="flex-1">
            <Skeleton width={100} height={20} />
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LpCommentSkeleton;
