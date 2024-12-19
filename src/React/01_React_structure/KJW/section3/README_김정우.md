# section3_Node.js기초

## 3.1 Node.js를 소개합니다

- 웹브라우저가 아닌 환경에서도 범용적으로 실행할 수 있게 도와주는 JS실행환경(Run Time) 이라 생각 = 구동기
- Node.js 기반
  - React.js
  - Next.js
  - Vue.js
  - Svelte
  - etc
- 이거 왜 만들었을까?
  - js는 웹 페이지 내부에 필요한 아주 단순한 기능만을 개발하기 위해 만들어졌다.
  - 동시대에 존재했던 c언어나 java에 비해 매우 유연하고 생산성이 높게 설계가 되었다.
  - 이제 js로 웹페이지 내부의 기능을 만드는 것을 넘어 웹브라우저 밖에서도 웹서버(모바일 앱, 데스크톱 앱…)를 만들고싶다는 요구가 발생

## 3.3 Node.js 사용하기

- Node.js에서는 프로젝트를 부르는 다른말이 패키지이다.
- 프로젝트: 특정 목적을 갖는 프로그램의 단위
- 패키지: Node.js에서 사용하는 프로그램의 단위
- npm init: 새로운패키지 초기화, 생성해달라
  - 완료하면 package.json 파일생성
  - js파일 실행명령어 node <파일이름>
  - 경로 주의할 것
  - package.json 파일에 scripts에 start 부분을 추가하면 콘솔명령어에 node src/index.js를 할 필요 없이 npm run start를 하면 js파일이 실행됨
  ```json
  {
    "name": "section3",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node src/index.js"
    }, // start 부분 추가
    "author": "",
    "license": "ISC",
    "description": ""
  }
  ```

## 3.4 Node.js 모듈 시스템 이해하기

- 모듈 시스템이란 말 그대로 모듈을 다루는 시스템
- 모듈이란?
  - 예를들어 온라인쇼핑몰에 회원관리기능, 장바구니기능, 결제기능과같은 많은 기능을 function.js파일 하나에 다 만들어버리면 유지보수가 매우힘듦
  - 그래서 보통 여러가지 기능을 구현해야한다면 기능별로 파일을 여러개 만들어서 구현
  - user.js, cart.js, payment.js과 같은 파일로 나눠서 관리하는데 기능별로 나뉘어진 각각의 이 파일들을 모듈이라함
- 다시 말하면 모듈시스템은 모듈을 생성하고, 불러오고, 사용하는 등의 모듈을 다루는 다양한 기능을 제공하는 시스템
- JS의 모듈시스템
  - Common JS(CJS)
  - ES Module(ESM)
  - 위 두가지만 강의에서 다룰 것
  - AMD
  - UMD
  - etc…
- package.json
  - ESM을 사용하려면 type속성을 넣어줘야 함
  - CJS와 동시에 사용은 불가능

```json
{
  "name": "section3",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/index.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "type": "module"
}
```

- index.js

```jsx
// index.js
// CJS방식
// const moduleData = require("./math");
// const { add, sub } = require("./math"); // 구조분해할당

// ESM방식, 훨씬간편함
// 대표함수를 작성했다면 아래와같이 불러올 수 있다.
// multiply 대신 아무이름으로 설정하는 것도 가능함 ex)mul

import multiply, { add, sub } from "./math.js"; // 주의할점은 여기는 js확장자 붙여야함
console.log(add(1, 2));
console.log(sub(1, 2));
console.log(multiply(2, 3));
```

- math.js(모듈예시)

```jsx
// math 모듈
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// CJS (Common JS 시스템)
// module.exports = {
//   // add: add,
//   // sub: sub,
//   add,
//   sub,
// };

// ESM
export { add, sub };
// 함수 앞에 export function으로 하고 윗줄을 굳이 안써도 되는 방법도 있다.

// default를 붙이면 이 모듈을 대표하는 함수가 된다.
export default function multiply(a, b) {
  return a * b;
}
```

## 3.5 Node.js 라이브러리 사용하기

- 라이브러리란?
  - 프로그램을 개발할 때 필요한 다양한 기능들을 미리 만들어 모듈화 해 놓은 것
  - ex) 날짜 라이브러리, 수학 라이브러리, 그래픽 라이브러리 etc…
- [https://www.npmjs.com/](https://www.npmjs.com/)를 들어가면 모든 라이브러리가 다 등록되어있다.
- 라이브러리를 설치하면 package.json에 dependencies항목이 추가됨
  - node_modules폴더 생성 (설치한 라이브러리가 실제로 저장되는 곳)
  - package-lock.json 생성(이 패키지에서 사용하고있는 라이브러리의 버전과 정보를 더 엄밀하게 표현해주는 파일)

```json
// package.json
{
  "name": "section3",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/index.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "type": "module",
  "dependencies": {
    "randomcolor": "^0.6.2"
  } // ^표시는 대략적인 버전이라는 뜻
}
```

- 만약 node_modules와 package-lock.json파일이 삭제가 됐다면
  - 그 상태에서 package.json의 dependencies항목에 있는 라이브러리를 그대로 다시 설치할 수 있다. 설치하는 명령어는 그냥 npm i 하면 끝!
  - 그래서 누군가한테 패키지를 공유할때 굳이 용량이 크고 무거운 node_modules폴더를 공유하지 않는다. 과감하게 제외하고 압축할 것
