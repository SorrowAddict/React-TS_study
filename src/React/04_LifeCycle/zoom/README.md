# 04_LifeCycle


| 개념 | 설명 |
|------|------|
| 라이프사이클 | 컴포넌트의 생성, 업데이트, 제거 과정을 나타내는 단계 |
| useEffect | 함수형 컴포넌트에서 side effects를 수행하기 위한 Hook |
| React 개발자 도구 | React 애플리케이션을 디버깅하고 분석하는 브라우저 확장 프로그램 |

<br>

## 라이프사이클 주요 단계

| 단계 | 설명 |
|------|------|
| 마운팅 | 컴포넌트가 DOM에 삽입될 때 |
| 업데이트 | props나 state가 변경될 때 |
| 언마운팅 | 컴포넌트가 DOM에서 제거될 때 |

<br>

## useEffect 사용
```jsx
useEffect(() => {
  // 실행할 부수 효과
  return () => {
    // 정리(cleanup) 함수
  };
}, [의존성 배열]);
```
- 첫 번째 인자: 실행할 부수 효과를 포함하는 함수
- 두 번째 인자: 의존성 배열 (이 값들이 변경될 때마다 효과가 실행됨)
- 반환 함수: 컴포넌트가 언마운트되거나 다음 효과가 실행되기 전에 호출되는 정리 함수

<br>

## useEffect 실행 시점

1. **컴포넌트 마운트 후**: 첫 렌더링 이후에 실행
2. **의존성 배열의 값이 변경될 때**: 지정된 의존성이 업데이트될 때마다 실행
3. **컴포넌트 언마운트 전**: 클린업 함수가 실행

<br>


## 주의사항

- 의존성 배열을 빈 배열(`[]`)로 설정하면 컴포넌트 마운트 시 한 번만 실행
- 의존성 배열을 생략하면 모든 렌더링 후에 실행
- 클린업 함수는 메모리 누수를 방지하기 위해 중요

useEffect를 올바르게 사용하면 컴포넌트의 생명주기를 효과적으로 관리하고, 부수 효과를 안전하게 처리

<br>

## React 개발자 도구 주요 기능
- 컴포넌트 트리 검사
- props와 state 확인 및 수정
- 성능 프로파일링

<br>

## Vue랑 React의 차이

| 단계 | Vue | React |
|------|-----|-------|
| 생성 전 | beforeCreate | - |
| 생성 | created | constructor |
| 마운트 전 | beforeMount | - |
| 마운트 | mounted |  useEffect (훅) |
| 업데이트 전 | beforeUpdate |   |
| 업데이트 | updated |  useEffect (훅) |
| 언마운트 전 | beforeUnmount | - |
| 언마운트 | unmounted |useEffect (훅) |

1. Vue는 더 세분화된 라이프사이클 훅을 제공
2. React는 클래스 컴포넌트와 함수형 컴포넌트(훅)에서 다른 방식으로 라이프사이클을 다룸
3. Vue의 라이프사이클 훅은 모든 컴포넌트에서 일관되게 사용되지만, React는 클래스와 훅에서 다른 방식을 사용
4. React의 useEffect 훅은 여러 라이프사이클 단계를 하나의 API로 통합
