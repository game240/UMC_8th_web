- Props-Drilling은 무엇인가요?
  부모 component에서 자식 component로 props를 전달하는 과정에서, 그 데이터를 실제로 필요로 하지 않는 중간 components가 해당 props를 **단순히 자식 component로 전달하기 위한** 목적으로 포함하는 패턴
- **`useReducer`** 에 대하여 정리해주세요!

  - `useState`처럼 `State`를 관리하고 업데이트 할 수 있는 Hook
  - 컴포넌트 내에서 `State`를 업데이트하는 로직 부분을 그 컴포넌트로부터 분리할 수 있게 함
  - 여러 개의 `State`가 서로 연관되어 있고 하나의 액션으로 여러 상태를 변경해야 할 때도 유용

- redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)
  |                        | Redux                                                   | Redux Toolkit                                 |
  | ---------------------- | ------------------------------------------------------- | --------------------------------------------- |
  | **설정 Boilerplate**   | 액션 타입, 액션 생성 함수, 리듀서 작성 등 코드가 장황함 | `createSlice`, `configureStore`로 설정 간소화 |
  | **Immutable 업데이트** | 직접 `...state` 전개 연산자나 `immer` 사용 필요         | 기본 내장 `immer` 덕분에 불변성 관리 자동화   |
  | **미들웨어 설정**      | `applyMiddleware(thunk, saga...)` 직접 구성             | `configureStore`가 `redux-thunk` 기본 탑재    |
- redux-toolkit 사용법 (자세하게)
  - Provider
    `App`최상단을 `Provider`로 감싸서 `store` 삽입 - `store`: `Redux`가 모든 state 값을 저장하는 장소
        ```tsx
        // index.tsx
        <Provider store={store}>
          <App />
        </Provider>,
        ```
  - configureStore
    스토어 생성 시 미들웨어와 DevTools 자동 설정
        ```tsx
        // store.ts
        const store = configureStore({
          reducer: { cart: cartReducer },
        });
        ```
  - createSlice
    Action type, Action Creator, Reducer를 동시에 정의
    ```tsx
    // cartSlice.ts
    const cartSlice = createSlice({
      name: "cart",
      initialState,
      reducers: {
        incrementAmount: (state, action: PayloadAction<{ id: string }>) => {
          const itemId = action.payload.id;
          const item = state.cartItems.find((item) => item.id === itemId);

          if (item) {
            item.amount += 1;
          }
        },
    // -----(후략)------

    export const { incrementAmount, /* ...(생략)... */ } = cartSlice.actions;

    const cartReducer = cartSlice.reducer;
    ```
  - useSelector
    Store의 state를 읽을 때 사용
    ```tsx
    // store.ts
    export type RootState = ReturnType<typeof store.getState>;

    // SomeComponent.tsx
    const {
      cartItems,
      /* ...(생략)... */
    } = useSelector((state: RootState) => state.cart);
    ```
  - useDispatch
    액션을 dispatch할 때 사용
    - dispatch: 액션 객체(Action object)를 Redux Store로 보내 state 업데이트를 요청하는 것
    ```tsx
    // store.ts
    export type AppDispatch = typeof store.dispatch;

    // SomeComponent.tsx
    // (예시)
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(incrementAmount());
    }, [dispatch, cartItems]);
    ```
- **`Zustand`**에 대하여 정리해주세요! 🍠
  ```tsx
  // useCartStore.ts
  interface CartState {
    cartItems: Item[];
    amount: number;
    total: number;

    actions: CartActions;
  }

  interface CartActions {
    increase: (id: string) => void;
    // ...(생략)...
  }

  // create()로 store 정의
  export const useCartStore = create<CartState>()(
  	// immer middleware: 불변성 보장
    immer((set, _) => ({
      cartItems: cartItems,
      amount: 0,
      total: 0,
      actions: {
        increase: (id: string) => {
          set((state) => {
            const item = state.cartItems.find((item) => item.id === id);
            if (item) {
              item.amount += 1;

        // ...(생략)...

  // export const useCartInfo = () =>
  //  useCartStore((state) => ({
  //    cartItems: state.cartItems,
  //    amount: state.amount,
  //   total: state.total,
  //  }));
  // useShallow: shallow(얕은) 비교로 불필요한 re-rendering 방지
  export const useCartInfo = () =>
    useCartStore(
      useShallow((state) => ({
        cartItems: state.cartItems,
        amount: state.amount,
        total: state.total,
      }))
    );

  export const useCartActions = () =>
    useCartStore(useShallow((state) => state.actions));
  ```
  ```tsx
  // SomeComponent.tsx
  const { amount, cartItems } = useCartInfo();
  const { increase } = useCartActions();

  increase(item.id);
  ```
