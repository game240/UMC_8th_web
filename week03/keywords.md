- useEffect

  - 초기 렌더링 시 / 특정 값이 변경될 때를 감지하여 실행을 하는 hook
  - dependency array에 변경을 감지할 변수를 넣을 수 있음
    - dependency array가 비어있을 경우 초기 렌더링 시에만 실행
  - useEffect 내부에서 cleanup function을 사용하여
    - 해당 component가 사라지거나 (unmount),
    - dependency array에 있는 값이 변경되기 직전에
      실행할 작업을 지정할 수 있다. → 잠재적 error 해결 가능

- `fetch` vs `axios`의 차이점
  - `fetch` ?
    - 기본 내장 API이기 때문에 추가 라이브러리 설치가 필요 없음
    - response 객체에 `.json()` method를 호출하여 response를 얻음
    - HTTP error(예: 404, 500 등)가 발생할 경우 `Promise`가 거부되지 않음 → response 객체의 `ok` property 확인
    - interceptor 등의 추가 설정 및 기능이 내장되어 있지 않아 가벼움.
  - `axios` ?
    - 사용을 위해 별도 설치 필요(npm 등)
    - response 객체 바로 return
    - HTTP error(예: 404, 500 등)가 발생할 경우 `Promise` 거부
    - interceptor 및 요청 취소, timeout 등의 설정 제공
