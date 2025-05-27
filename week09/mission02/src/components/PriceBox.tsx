import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import type { RootState } from "../store/store";

const PriceBox = () => {
  const { total } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="flex justify-between p-12">
      <button
        className="p-4 border rounded-md cursor-pointer"
        onClick={handleClearCart}
      >
        장바구니 초기화
      </button>
      <div className="">가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
