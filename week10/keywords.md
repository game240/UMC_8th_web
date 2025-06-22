### 📌 핵심 개념 정리

- **<span style="color: #EB5757">`Referential Equality`</span> (참조 동일성)**
  - 자바스크립트에서 객체 (object), 배열 (array), 함수 (function) 등의 참조형 값은 메모리 주소를 가리킴
    - 두 값이 같은 메모리 주소를 가리킬 때 Referential Equality가 성립하며, <span style="color: #EB5757">`===`</span> 연산자로 비교했을 때 <span style="color: #EB5757">`true`</span> 반환
      ```tsx
      const a = { x: 1 };
      const b = a;
      console.log(a === b); // true (같은 객체를 참조)

      const c = { x: 1 };
      console.log(a === c); // false (내용은 같지만 다른 객체)
      ```
    - React는 기본적으로 부모 컴포넌트가 re-render되면 자식 컴포넌트도 모두 다시 rendering 하는데, <span style="color: #EB5757">`React.memo`</span>는 **얕은 비교(shallow comparison)** 로 props가 참조 동일성(<span style="color: #EB5757">`===`</span>)을 만족하는지 판단하여, 변경되지 않았다면 re-render을 스킵함
    - 따라서 자식에게 넘기는 props(특히 함수나 객체)를 매번 새로 생성하면(참조 불일치) 불필요한 re-render가 발생하므로, Referential Equality로 이를 최적화함
  - **<span style="color: #EB5757">`useCallback`</span>**
    - **목적**
      - 컴포넌트가 리렌더링될 때마다 **새로운 함수 객체**가 생성되는 것을 방지해, 자식 컴포넌트나 의존성 배열에 넘기는 콜백의 참조를 안정적으로 유지합니다.
    - **문법**
      ```tsx
      const memoizedCallback = useCallback(
        () => {
          // 어떤 작업
        },
        [dep1, dep2] // 의존성(dependencies)
      );
      ```
    - **동작 원리**
      - 의존성 배열에 명시된 값들이 변경되지 않으면, 이전에 생성된 같은 함수 객체를 재사용합니다.
      - 배열 내 값 중 하나라도 바뀌면, 새로운 함수 객체를 반환합니다.
    - **언제 사용?**
      - 자식 컴포넌트에게 콜백 함수를 props로 넘길 때
      - <span style="color: #EB5757">`useEffect`</span>, <span style="color: #EB5757">`useMemo`</span> 등의 의존성으로 함수를 사용할 때
    - **주의 사항**
      - 불필요하게 과도하게 사용하면 오히려 코드가 복잡해질 수 있음
      - 내부에서 참조하는 상태(state)나 props가 있으면 꼭 의존성 배열에 포함해야 함
  - **<span style="color: #EB5757">`React.memo`</span>**
    - **목적**
      - 함수형 컴포넌트를 **메모이제이션(memoization)**해, **props가 변경되지 않으면 리렌더링을 건너뜁니다.**
    - **문법**
      ```tsx
      const MyComponent = React.memo(function MyComponent({ value }) {
        /* 렌더링 로직 */
      });
      ```
    - **동작 원리**
      - 기본적으로 props를 얕은 비교(shallow equality)로 검사하여, 모든 키의 값이 `===`로 같으면 이전 결과를 재사용합니다.
      - 두 번째 인자로 비교 함수를 넣어 **커스텀 비교 로직**을 설정할 수도 있습니다.
        ```tsx
        const MyComponent = React.memo(
          function ({ a, b }) {
            /* ... */
          },
          (prevProps, nextProps) => prevProps.a === nextProps.a
        );
        ```
    - **언제 사용?**
      - 렌더 비용이 높은 컴포넌트
      - 자주 바뀌지 않는 props를 받는 경우
    - **주의 사항**
      - 모든 컴포넌트에 남발 시 오히려 성능 저하를 초래
      - 내부에서 계속 생성되는 객체나 함수를 props로 넘기면 `memo` 의미가 퇴색됨
- **<span style="color: #EB5757">`useMemo`</span>**
  - **목적**
    - \*\*비용이 큰 계산의 결과를 memoizaion해, 의존성이 바뀔 때만 재실행하도록 합니다.
  - **문법**
    ```tsx
    const memoizedValue = useMemo(
      () => {
        // 비용이 큰 계산
        return computeExpensiveValue(a, b);
      },
      [a, b] // 의존성
    );
    ```
  - **동작 원리**
    - 컴포넌트가 리렌더링되면, <span style="color: #EB5757">`useMemo`</span> 내부 함수는 **의존성 배열**의 값이 변경되었을 때만 실행됩니다.
    - 변경이 없으면 이전에 계산된 값을 그대로 반환합니다.
  - **언제 사용?**
    - 렌더링 중 반복문, 복잡한 로직 등으로 성능에 부담이 생길 때
    - 자식 컴포넌트에 넘겨야 하는 **객체/배열**을 안정적으로 생성할 때
  - **주의 사항**
    - 과도하게 사용 시 메모리만 차지하고, 오히려 렌더링 비용이 늘어날 수 있음
