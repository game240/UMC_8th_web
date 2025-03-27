### React의 동작 원리

1. SPA (Single Page Application)

- 정리
  - 한 개의 HTML 페이지로 구성
  - 전체 페이지를 refresh하지 않고 필요한 부분만 동적으로 refresh하는 구

2. User Interface Library

- 정리
  - 쉽게 재사용 가능한 UI 요소로 application을 만들 수 있게 도와주는 라이브러리
  - React, Vue 등

3. Functional Component (함수형 컴포넌트)

- 정리
  - props를 인자로 받아 UI를 rendering
  - React Hooks를 통해 State 등을 저장할 수 있음
  - 클래스 기반 컴포넌트보다 간결하고, 가독성 및 재사용성이 향상됨

4. Virtual DOM (가상 DOM)

- 정리
  - DOM의 경량화된 복사본
  - 변경 사항이 발생 시 먼저 Virtual DOM에서 적용한 후, 실제 DOM과 비교하여 최소한의 업데이트로 실제 DOM에 반영되도록 함
  - 효율적인 변경 사항 업데이트 가능 → 성능 최적화

5. 동시성 렌더링

- 정리
  여러 렌더링 작업을 동시에 처리할 때 우선순위가 높은 작업을 먼저 수행

6. React의 렌더링 조건

- 정리
  - component 내부의 state 변경
  - 부모 component로부터 전달받은 props의 변경
  - React Context의 값 변경
  - 부모 component의 re-rendering
