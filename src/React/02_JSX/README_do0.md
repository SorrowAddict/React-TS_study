# 📚 목차

1. [JSX 란?](#jsx-란)
2. [JSX 표현식 포함하기](#jsx-표현식-포함하기)
3. [JSX 속성 정의](#jsx-속성-정의)

# JSX 란?

> JavaScript Extensions 의 줄임말로 확장된 자바스크립트의 문법을 뜻함

컴포넌트 내부에 변수를 설정해 return으로 변수를 렌더링할 수 있게 함

React에서는 본질적으로 렌더링 로직이 UI 로직(이벤트가 처리되는 방식, 시간에 따라 state가 변하는 방식, 화면에 표시하기 위해 데이터가 준비되는 방식 등)과 연결된다는 사실을 받아들입니다.

React는 별도의 파일에 마크업과 로직을 넣어 기술을 인위적으로 분리하는 대신, 둘 다 포함하는 “컴포넌트”라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리합니다. 이후 섹션에서 다시 컴포넌트로 돌아오겠지만, JS에 마크업을 넣는 게 익숙해지지 않는다면 이 이야기가 확신을 줄 것입니다.

React는 JSX 사용이 필수가 아니지만, 대부분의 사람은 JavaScript 코드 안에서 UI 관련 작업을 할 때 시각적으로 더 도움이 된다고 생각합니다. 또한 React가 더욱 도움이 되는 에러 및 경고 메시지를 표시할 수 있게 해줍니다.

### JSX 표현식 포함하기

```JS
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

```JS
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

와 같이 JS 표현식 사용이 가능하며,

### JSX 속성 정의

```JS
const element = <a href="https://www.reactjs.org"> link </a>;
```
와 같이 속성에 문자열 리터럴을 정의할 수 있음

> ### **경고**
>> JSX는 HTML보다는 JS에 가깝기 때문에, React DOM은 HTML 어트리뷰트 이름 대신 camelCase 프로퍼티 명명 규칙을 사용합니다.
>>
>> 태그는 항상 닫혀있어야 함.
>>
>> 최상위 태그는 반드시 하나여야만 함.

```JS
const Main = () => {
  const user = {
    name: "DY",
    isLogin: false,
  }

  if (user.isLogin) {
    return <div style={{
      backgroundColor: "red",          // camelCase 로 적어야 함
      borderBottom: "5px solid blue",
    }}>로그아웃</div>
  } else {
    return <div>로그인</div>
  }
}
```