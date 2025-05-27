import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { closeModal, openModal } from "../slices/modalSlice";
import type { RootState } from "../store/store";
import DeleteDialog from "./DeleteDialog";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const PriceBox = () => {
  const { clearCart } = useCartActions();
  const { total } = useCartInfo();
  const { isModalOpen } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    clearCart();
    dispatch(closeModal());
  };
  return (
    <div className="flex justify-between p-12">
      <DeleteDialog
        open={isModalOpen}
        handleClose={() => {
          dispatch(closeModal());
        }}
        handleClearCart={handleClearCart}
      />

      <button
        className="p-4 border rounded-md cursor-pointer"
        onClick={() => {
          dispatch(openModal());
        }}
      >
        장바구니 초기화
      </button>
      <div className="">가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
