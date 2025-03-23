- **null과 undefined의 차이 점에 대해 직접 작성해주세요!** 🍠

  null: 명시적으로 ‘없다’를 표현할 때 프로그래머가 직접 assign

  undefined:

  - 변수가 선언되었지만 초기화되지 않은 경우
  - 함수에서 값을 return하지 않거나, parameter를 전달하지 않았을 때
    - AJAX를 통한 api response를 다룰 때 종종 확인할 수 있음.
      - 로직 상에서는 문제가 없어보이는데 내가 원하는 값이 할당이 안될 때가 종종 있음
      - console.log를 찍어보면 ‘undefined’로 나올 때가 있음

- 실습 정리 🍠

  - string
    ![image.png](attachment:cb319ad7-e25b-4d1d-b7cd-6cfe2c522b4a:image.png)
  - number
    ![image.png](attachment:84b2086b-d87e-486a-a4d6-f2007ea125f5:image.png)
  - boolean
    ![image.png](attachment:bf42e3af-b6ba-41e1-86e0-c7b2d9eb23d2:image.png)
  - null
    ![image.png](attachment:9e0bf537-a67b-4294-a57a-c0375d5ee996:image.png)
    - Type Inference: 컴파일러의 type 추론
    - 기본적으로는 literal type으로 추론
    - 타입 확장(Type Widening) 규칙을 적용하여, 좀 더 일반적인 type(e.g.: `string`)으로 확장
  - undefined
    ![image.png](attachment:c6e773ac-3638-450a-8307-1675ee2932ff:image.png)
  - symbol
    ![image.png](attachment:c20c9d6b-1af2-497b-81f4-9fd3b33ecbf4:image.png)
  - bigint
    ![image.png](attachment:188984f4-1839-4e50-93af-e82b8df791e0:image.png)
    TS playground에선 버전이 낮아 호환되지 않음.
    vscode:
    ![image.png](attachment:617fe885-0e3a-4645-a143-c7fae6db0f6f:image.png)
  - object
    ![image.png](attachment:009644da-1ea6-4508-88df-78a0bc9daf2f:image.png)

- 함수 선언식의 특징에 대해 정리해주세요! 🍠
  1.  dynamic binding
      호출되는 방식에 따라 `this`의 값이 동적으로 binding됨.
          e.g.

          ```jsx
          const obj = {
            value: 42,
            getValue: function () {
              return this.value;
            }
          };
          console.log(obj.getValue()); // 42 (this: obj)
          ```
  2.  생성자로 사용 가능 (`new` 호출 가능)
  3.  arguments 객체 사용 가능

      parameter로 전달된 값을 받는 arguments 객체 사용 가능함.

      ```jsx
      function logArguments() {
        console.log(arguments);
      }

      logArguments(1, 2, 3); // [1, 2, 3]
      ```
- 화살표 함수의 특징에 대해 정리해주세요! 🍠

  1.  non-dynamic binding
      `this`의 값이 상위 scope의 값으로 binding됨.
          e.g.

          ```jsx
          const obj = {
            value: 42,
            getValue: () => {
              return this.value;
            }
          };
          console.log(obj.getValue());  // undefined (this: 전역 객체 (window, etc.)
          ```
  2.  생성자로 사용 불가 (`new` 호출 불가)
  3.  arguments 객체 사용 불가

      → 대신 spread operator로 비슷하게 사용 가능

      ```jsx
      const logArguments = (...args) => {
        console.log(args);
      };

      logArguments(1, 2, 3); // [1, 2, 3]
      ```

- 타입 스크립트에만 존재하는 타입 🍠
  - any 🍠
    그 어떠한 type 검사도 진행하지 않음
  - unknown 🍠
    - 연산 이전에 타입 체크 필요
    ```jsx
    let value: unknown = "Hello";
    if (typeof value === "string") {
      // 타입 체크 필요
      console.log(value.toUpperCase());
    }
    ```
    - API response의 type을 모를 경우 등에 사용
  - void 🍠
    함수의 return 값이 없을 경우
  - never 🍠
    - 절대 발생하지 않는 값
    - 아래의 경우에도 사용
    ```jsx
    function hello2(): never {
      throw new Error("xxx");
    }
    ```
