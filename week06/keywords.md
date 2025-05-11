- **Tanstack Query Devtools는 무엇인가요?** 🍠
  React 애플리케이션에서 쿼리 상태와 캐시를 시각적으로 디버깅할 수 있게 도와주는 개발자 도구
  - **주요 기능**
    - 현재 활성화된 쿼리 리스트 확인
    - 각 쿼리의 상태(`idle`, `loading`, `error`, `success`) 확인
    - 캐시된 데이터 바로보기
    - 쿼리 무효화(Invalidate), 리패치(Refetch) 등의 조작
- **Tanstack Query Devtools는** 어떻게 세팅하나요?

  1. `QueryClientProvider` 내부에 `ReactQueryDevtools` 추가
  2. 환경 변수 사용

     ```tsx
     import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
     import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

     const queryClient = new QueryClient();

     function App() {
       return (
         <QueryClientProvider client={queryClient}>
           {/* Your application components */}

           {/* 개발 환경에서만 Devtools 표시 */}
           {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
           )}
         </QueryClientProvider>
       );
     }

     export default App;

     ```

  https://tanstack.com/query/v5/docs/framework/react/devtools

- `useCustomFetch` 커스텀 훅과 비교했을 떄 `useQuery`는 어떤 장점이 있나요? 🍠
  - 자동 캐싱(Caching)
  - 백그라운드 리패칭(Background Refetching)
  - 로딩·에러 상태 관리
  - 중복 요청 방지
  - 자동 재시도(Retry)
  - 의존성 기반 쿼리(Infinite / Pagination)
  - 쿼리 무효화(Invalidate) & 갱신 제어
  - 서버 상태 동기화(Server State Synchronization)
  - 서버사이드 렌더링(SSR) & 프리패칭 지원
  - 개발자 도구(Devtools) 연동

### `gcTime` vs `staleTime`

<aside>
❓

**gcTime**과 **staleTime**의 개념을 다시 정리해주시고, 두 값을 어떤 식으로 설정하면 캐싱 전략에 유리한지 설명해주세요!

</aside>

- `gcTime`은 무엇인가요? 🍠
  Tanstack Query에서 **캐시된 데이터가 "활성 상태를 벗어난 후” 얼마 동안 메모리에 남아 있을 지를 결정**하는 설정, 명칭: `cacheTime`
- `staleTime`은 무엇인가요? 🍠
  **쿼리 데이터가 “fresh”하다고 간주될 기간**을 정의하는 설정
- 두 값을 어떤 식으로 설정하여야 `캐싱 전략에 유리`한가요? 🍠

  - 데이터 변경 빈도
    - 사용자 프로필·설정처럼 자주 변경되지 않는 데이터
      - `staleTime = Infinity`, `cacheTime`은 충분히 길게
    - 실시간 주가·채팅 메시지처럼 자주 바뀌는 데이터
      - `staleTime = 0` (즉시 stale), `cacheTime`은 짧게(예: 1~2분)
  - 메모리 vs 네트워크 트레이드오프
    - 자주 같은 데이터를 반복 조회한다면 `cacheTime`을 길게 잡아 메모리에 오래 유지
    - 메모리가 부담된다면 `cacheTime`을 짧게, `staleTime`을 상황에 맞춰 조절
  - UX 최적화
    - 화면 전환 시 즉시 보여줘야 할 데이터는 `staleTime`을 충분히 길게
    - 배경에서만 최신화를 원한다면 `staleTime` > 0, `cacheTime` ≥ `staleTime` + α

- **`오프셋 기반 페이지네이션`**과 **`커서 기반 페이지네이션`**에 대해 정리해보세요! 🍠

  - `오프셋 기반 페이지네이션`의 장/단점 (`offset-based pagination`) 🍠
    - `오프셋 기반 페이지네이션`은 무엇인가요? 🍠
      요청 시 `?limit=10&offset=20` 와 같이 “처음부터 건너뛸 갯수(offset)”과 “가져올 갯수(limit)”를 지정하는 방식
    - `오프셋 기반 페이지네이션`의 장점? 🍠
      - 구현이 단순하고 이해하기 쉬움
      - 특정 페이지(예: 5페이지)로 바로 이동 가능 (`offset = (page-1) * limit`)
    - `오프셋 기반 페이지네이션`의 단점? 🍠
      - `offset` 값이 커질수록 DB의 스캔 비용이 증가 → 성능 저하
      - 데이터 삽입/삭제가 발생하면 페이지별 항목이 밀려 일관성 없는 결과 발생 가능
      - 대용량 테이블에서 부하가 큼
  - `커서 기반 페이지네이션`의 장/단점 (`cursor-based pagination`) 🍠
    - `커서 기반 페이지네이션`은 무엇인가요? 🍠
      - 응답에 포함된 “마지막 레코드의 고유 키(cursor)”를 다음 요청에 넘겨주는 방식
      - e.g. 첫 요청 `?limit=10` → 응답에 `{ data: […], nextCursor: "abc123" }` → 다음 요청 `?limit=10&cursor=abc123`
    - `커서 기반 페이지네이션`의 장점 🍠
      - 대규모 데이터에서도 일정한 성능(인덱스만 탐색)
      - 데이터 변경(삽입/삭제) 시에도 페이징 일관성 유지
      - 무한 스크롤 구현에 적합
    - `커서 기반 페이지네이션`의 단점 🍠
      - “특정 페이지로 점프”가 어려움(앞으로만 탐색)
      - 복합 정렬이나 필터링 시 커서 생성 로직이 복잡해질 수 있음
      - 커서 자체가 노출되면 보안상 민감할 수 있어 인코딩/암호화 필요

- `Skeleton UI`는 무엇인가요? 🍠
  - Skeleton UI는 무엇인가요? 🍠
    데이터 로딩 중에 실제 콘텐츠 자리에 “뼈대” 모양의 회색 블록이나 애니메이션 플레이스를 보여주는 UI 패턴
    - 로딩 중 페이지가 빈 화면이나 스피너만 뜨는 대신, 제목·문단·이미지 영역 등의 형태를 미리 시각적으로 배치
  - Skeleton UI를 활용했을 때 장점에 대해 정리해주세요 🍠
    - 체감 성능 개선
    - 레이아웃 Shift 최소화
    - 일관된 UX 유지

---
