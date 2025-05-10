import { Lp } from "../../types/lp";

import { datesFromNow } from "../../utils/datesFromNow";

interface ItemThumbnailProps {
  lp: Lp;
}

const ItemThumbnail: React.FC<ItemThumbnailProps> = ({ lp }) => {
  return (
    <button
      className="group flex flex-col justify-end relative p-4 w-full bg-white aspect-square bg-cover bg-no-repeat bg-center hover:scale-110 transition-transform duration-300 ease-in-out"
      style={{ backgroundImage: `url(${lp.thumbnail})` }}
    >
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>

      <div className="text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
        <h4 className="w-3/4 font-bold">{lp.title}</h4>
        <div className="flex justify-between">
          <p>{datesFromNow(lp.updatedAt)}</p>
          <p>♥ {lp.likes.length}</p>
        </div>
      </div>
    </button>
  );
};

export default ItemThumbnail;
