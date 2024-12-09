# 📚 목차

1. [Props with Component](#props-with-component)
2. [State](#state)
3. [Hooks](#hooks)

# Props with Component

> React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달합니다. 이 객체를 “props”라고 합니다.

```JS
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
이 함수는 데이터를 가진 하나의 props 객체 인자를 받아 React 엘리먼트를 반환함

또한 [ES6 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 를 사용해 컴포넌트를 정의할 수도 있음

```JS
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

다음은 페이지에 "Hello, Sara"를 렌더링하는 예시
```JS
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;
root.render(element);
```

이 예시에서는 다음과 같은 일들이 일어납니다.

1. `<Welcome name="Sara" />` 엘리먼트로 root.render()를 호출합니다.
2. React는 {name: 'Sara'}를 props로 하여 Welcome 컴포넌트를 호출합니다.
3. Welcome 컴포넌트는 결과적으로 `<h1>Hello, Sara</h1>` 엘리먼트를 반환합니다.
4. React DOM은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트합니다.

```JS
function App() {
  const buttonProps = {
    text: "메일",
    color: "red",
    a: 1,
    b: 2,
    c: 3,
  }

  return (
    <>
      <Button {...buttonProps} />
      <Button text={"카페"} />
      <Button text={"블로그"}>
        <div>자식요소</div>
      </Button>
    </>
  )
}
```
와 같이 스프레드 연산자와 객체를 이용해서도 Props를 전달할 수 있음<br>
또 **컴포넌트 하위에 html, 컴포넌트** 등을 작성하여도 props.children 으로 props를 전달받을 수 있음

### Props Drilling 이란?

- Props Drilling, Context API, react-query (Data Fetching Hook Library), useResource에 관련한 내용이 담긴 토스 유튜브

[토스 SSR 관련 유튜브](https://youtu.be/IKyA8BKxpXc)

<br><br>

---

# State



<br><br>

---

# Hooks

