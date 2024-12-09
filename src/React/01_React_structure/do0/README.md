# React

## React의 특징

1. Component 구조

    컴포넌트를 사용하면서 반복적으로 사용되는 구조에 대한 재사용이 가능해 유지 보수, 관리가 쉬워짐

2. Virtual DOM

    Document Object Model 트리 구조를 가상으로 가짐으로써 다시 그릴 때마다 Virual DOM에 그려보고 최소한의 변경 사항만 실제 DOM에 반영해 속도를 개선함

<br><br>

---

# React 시작하기

`npm create vite@latest`

React를 선택, `cd vite-project` `npm i` `npm run dev` 를 실행

<br><br>

---

# React Structure

![alt text](/src/React/01_React_structure//do0/assets/image/image.png)

### /public/ 폴더

svg, png, font, mp4 등 정적 파일들을 저장하는 공간

### /src/ 폴더

- src/assets/

  정적 파일들을 저장하는 공간
- Main.jsx
  - .render method를 이용해 App.jsx 컴포넌트를 불러옴
- App.jsx
  - React의 루트 컴포넌트인 App 컴포넌트 파일

### 기타 파일

- .eslintrc.cjs
  - eslint 설정 파일
- .gitignore
- index.html
  - react 앱의 기본 틀을 가지는 html 파일
  - Main.jsx 컴포넌트를 불러옴
- package.json
  - node module의 script나 dependencies 등이 저장되어있는 파일
- package-lock.json
  - package.json의 의존성 모듈의 상세 정보가 담긴 파일
- vite.config.js
  - vite 설정 파일