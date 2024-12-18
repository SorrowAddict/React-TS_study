# 감정 일기장 만들기
### 🙃[바키의 감정 일기장 체험하기](https://emotion-diary-beta-seven.vercel.app/)

</br>

## 12.2 페이지 라우팅

- 페이지 라우팅 : 경로에 따라 알맞은 페이지를 렌더링 하는 과정

![페이지 라우팅](./image.png)

![페이지 라우팅 원리1](./image-2.png)

1. 서버가 사용자에게 제공해야할 모든 html 페이지 가지고 있음
2. 브라우저에서 페이지 요청
3. 서버는 해당 요청에 맞는 페이지 찾아서 반환

- Multi Page Application(MPA) : 전통적인 방식. 애초에 서버가 여러개의 페이지를 가지고 있음
- Server Side Rendering : 서버측에서 페이지를 미리 렌더링. 완성되어있는 페이지를 응답해줌

  ![페이지 라우팅 원리2](./image-3.png)!
  => **쾌적한 페이지 이동 제공이 어렵기 때문에 React.js는 이 방식을 따르지 않음**

  이전 페이지를 제거하고 새로운 페이지를 렌더링하는 과정에서 화면 깜빡임(새로고침)

* MPA 단점

- 페이지 이동이 매끄럽지 않고 비효율적
- 다수의 사용자 접속 시 서버의 부하 심해짐

* SPA(Single Page Application)

- 페이지 이동이 매끄럽고 효율적
- 다수의 사용자가 접속해도 크게 상관 없음 

* SPA의 페이지 이동

- 새로운 페이지를 매번 서버에 요청하는 MPA방식과는 달리 서버에 아무요청도 보내지 않음
- 서버로부터 받았던 React App 이용해 새로운 페이지에 필요한 컴포넌트들로 화면 교체
- React App에 모든 페이지, 컴포넌트 정보 포함되어있음
- MPA는 모든 요소를 교체하지만 **SPA는 필요한 요소만** 교체

- 무조건 index.html 반환 + Bundle JS File (React App///Vite가 Bundling)
- 브라우저가 직접 JS File 실행
- main.jsx가 가장먼저 실행 -> render함수 실행되면서 App 컴포넌트 렌더링 -> 모든 컴포넌트 렌더링

* 클라이언트 사이드 렌더링(Client Side Rendering) : 브라우저(클라이언트)에서 JS 실행해서 화면을 직접 렌더링

</br>

## 12.3 라우팅 설정하기

- React Router : 대다수의 리액트 앱이 사용하고 있는 대표적 라이브러리(npmjs.com)

1. react-router-dom 설치 : 버전 6이상
   ```bash
   npm i react-router-dom
   ```
2. main.jsx

   ```javascript
   import { BrowserRouter } from "react-router-dom";

   createRoot(document.getElementById("root")).render(
     <BrowserRouter>
       <App />
     </BrowserRouter>
   );
   ```

3. Home, New, Diary.jsx 생성
4. App.jsx에 import

</br>

## 12.4 페이지 이동

- 실습 코드 및 주석 참고
- Link 컴포넌트 : 링크 필요할 때
- useNavigate : 특정조건에 따라 페이지 이동할 때

## 12.5 페이지 라우팅 - 동적경로

- URL Parameter : '/' 뒤에 아이템의 id를 명시

  - ~/product/1, ~/product/2, ~/product/3
  - 아이템 id 등의 변경되지 않는 값을 주소로 명시하기 위해 사용

    ```javascript
    // App.jsx
    <Route path="/diary/:id" element={<Diary />} />;

    // Diary.jsx
    // useParams : 현재 브라우저에 명시한 URL Parameter의 값을 가져오는 커스텀 훅
    import { useParams } from "react-router-dom";

    const Diary = () => {
      const params = useParams();

      return <div>{params.id}번 일기</div>;
    };

    export default Diary;
    ```

- Query String : ? 뒤에 변수명과 값 명시

  - ~/search?q=검색어
  - 검색어 등의 자주 변경되는 값을 주소로 명시하기 위해 사용

  </br>

  ## 12.6 폰트, 이미지, 레이아웃 설정하기

  - public 폴더에 글꼴 넣기 -> index.css 설정
  - assets 폴더에 이미지 넣기 -> App.jsx에 import, 렌더링

  - public이나 assets 둘다 정적 파일 보관 가능

    - Vite의 이미지 최적화 설정 때문에 감정 이미지 파일은 assets에 넣음
      ```javascript
      <img src={emotion1} />
      ```
    - public에 보관할 경우 url로 불러올 수 있음

      ```javascript
      <img src={"/emtion1.png"} />
      ```

      - 리액트 앱 빌드 -> 빌드된 결과물을 배포모드로 실행 -> 이미지 최적화 확인

        ```
        npm run build
        ```

        -> 빌드 후 dist 폴더 생성 : 리액트 앱 빌드 결과

        - 빌드된 결과물 실행

        ```
        npm run preview
        ```

      - assets에서 불러온 이미지들의 주소는 DATA URI(외부데이터를 문자열 형태로 브라우저 메모리에 캐싱하기 위해 사용되는 포멧)
      - 이렇게 불러온 이미지들은 자동으로 브라우저에 캐싱(저장)되어서 새로고침 하더라도 다시 불러오지 않도록 최적화
      - 일반 주소로 불러온 이미지는 새로고침 할 때마다 매번 새롭게 불러옴
        ![Network 확인](./image-4.png)

      - 이미지 파일이 너무 많을 경우 캐싱해두면 브라우저 용량 과부하 발생할수도 있음 -> 이 경우 public폴더에 보관하는게 나을 수도
      - 실습처럼 소수의 이미지일 경우 assets에 보관하는 것이 적합

</br>

## 12.7 공통 컴포넌트 구현하기

- 버튼(긍정, 부정, 일반)
  - type에 따라 다르게 설정정
- 헤더

</br>

## 12.9 일기 관리 기능 구현하기2

- DiaryStateContext.Provider와 DiaryDispatchContext.Provider 순서 바뀌면 안되나?
  - ```javascript
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <Routes>{/* 페이지 라우팅 */}</Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
    ```

</br>

## 12.12 프로젝트 회고

- 정리

  - data state에 보관될 일기 데이터들을 모든 페이지에서 이용할 수 있어야 하기 때문에 App 컴포넌트 안에 배치치
    - 리액트에서 컴포넌트간 데이터를 주고 받으려면 props거나 context. 부모에서 자식방향으로만 전달 가능
  - props drilling 방지를 위해 context 사용

  </br>

  1. Home

  - Header, DiaryList
  - Home : 이번달에 작성한 일기만 렌더링해서 DiaryList에 넘겨줌

  2. Header

  - leftChild("<"), text, rightChild(">")
  - 버튼 클릭 시 이전, 다음 달 이동

  3. DiaryList

  - menu_bar, DiaryItem
  - menu_bar : 최신순/오래된순 정렬 옵션, 새 일기 쓰기 버튼
  - DiartItem : 작성날짜, 일기내용, 수정 버튼
  - 버튼 : 컴포넌트 활용
  - 새 일기 작성, 작성된 일기 내용 확인, 수정하기 클릭 시 이동 : useNavigate

</br>

## 12.13 New 페이지 구현 (UI)

1. New

- Header
- Editor : 4가지 섹션

2. Editor

- 흰색 부분을 전부 쓸 수 없는 이유
  => body 영역 설정 문제 => body를 flex로 설정해 전체 페이지를 다 감싸도록 수정하면 해결

  ```css
  /* index.css */
  html,
  body {
    margin: 0px;
    width: 100%;
    background-color: rgb(236, 233, 233);
    display: flex;
  }
  ```

</br>

## 12.14 New 페이지 구현 (기능)

- 새 일기 쓰기 페이지(New, Editor)에서 작성완료 버튼 누르면 새로운 일기 생성

  - Editor : 사용자 입력을 input state에 보관
  - 작성 완료 버튼 클릭되면 onSubmitButtonClick 실행 -> 부모(New) 컴포넌트로 부터 받은 onSubmit 실행
  - onSubmit 함수는 App에서 받은 DiartDispatchContext에서 공급받은 onCreate 함수가 호출되면서 새로운 일기 생성

- 새 일기 작성완료 후 일기 리스트 페이지로 이동 및및 뒤로가기 방지

  - replace 옵션 true

- 새 일기 작성 취소하기

  ```javascript
  <Button onClick={() => nav(-1)} text={"취소하기"} />
  ```

- 새로고침하면 작성한 일기 사라짐
  - 저장하지 않고 있기 때문

</br>

## 12.15 Edit 페이지 구현하기

- Header 버튼 구성 : 뒤로가기, 삭제하기
- 기존에 작성한(수정하려고 하는 일기) 데이터를 수정하기 페이지 기본값으로 설정

  - App의 data state를 전부 가져와서 createdDate, emotionId 등을 Editor에 Props로 제공하기

- cf. 수정하기 페이지 삭제하기 버튼 눌렀을 때 confirm창이 의도와 다르게 동작 (Edit.jsx)
  - '24. 11. 22 React router 버전 업데이트(v6->v7)로 인해 오류 발생(기존 navigate함수 동작 방식 변경)
  - 기존 nav 함수는 동기적으로 동작
    - 일기 삭제 이벤트 실행 -> nav함수 호출 즉시 페이지 이동. nav 함수 호출 이후 기존 페이지에 Hook들이 동작하지 않았음
  - v7 : nav 함수 비동기적으로 동작
    - nav 호출 이후에도 기존 페이지의 useEffect 등의 코드들이 실행
      ![삭제 팝업](./image-5.png)
      ![존재하지 않는 일기입니다.](./image-6.png)

</br>

## 12.16 Diary 페이지 구현

- Diary: Header, Viewer
- Diary에서 params에 저장된 일기 데이터 불러옴

  - 12.15 Edit 페이지에서 동일한 기능 구현
    -> url 파라미터를 통해서 하나의 일기 데이터를 context로부터 꺼내오는 로직을 함수로 구성.
    - React Hook은 일반js 함수로 구성 불가
      -> 커스텀 훅으로 분리

- 반복 사용되는 코드 모듈화

  - 커스텀 훅 : useDiary
  - 함수 분리 : get-stringed-date

  </br>

  ## 12.17 웹 스토리지 이용하기

  ### 1. 웹 스토리지(Web Storage)

  - 웹 브라우저에 기본적으로 내장되어 있는 데이터베이스
  - 우리가 추가한 일기 데이터는 실제로는 React State에 보관됨(js 변수에 저장된 값)
  - 새로고침하면 state 다시 생성됨(초기화)
  - cf. SessionStorage와 LocalStorage 차이
    ![세션, 로컬 스토리지](./image-7.png)

  - ```javascript
    // 데이터 저장
    // setItem(key, value) 키값은 원시데이터(숫자, 문자)만 가능
    localStorage.setItem("test", "hello");
    // 객체를 저장하고 싶다면 JSON.stringify 사용용
    localStorage.setItem("person", JSON.stringify({ name: "바키" }));

    // 값 불러오기
    console.log(localStorage.getItem("test"));
    // 객체가 아닌 객체처럼 생긴 문자열 출력(localStorage는 기본적으로 문자열로 저장됨)
    console.log(localStorage.getItem("person"));

    // JSON.parse 사용해서 객체로 만들기
    // JSON.parse는 인수가 undifined일 경우 오류 발생
    console.log(JSON.parse(localStorage.getItem("person")));

    // 데이터 삭제
    localStorage.removeItem("test");
    // 혹은 브라우저 로컬스토리지에서 직접 지우기
    ```
  - useEffect를 통해서 App컴포넌트가 마운트 된 이후에 localStorage에서 데이터 불러오고, 불러온 데이터 dispatch 호출해서 data state 세팅
  - useEffect가 호출되기 전에(dispatch함수가 data state에 일기 데이터를 저장하기 전에) 다른 페이지 컴포넌트들이 미리 렌더링 된다면
  - 아래와 같이 오류 발생(수정하기, 작성 일기 확인인 페이지에서 새로고침)
  - useEffect가 완료되기 전에 dispatch가 완료되지 않아서 data state 초기값이 설정되지 않았을 때 Diary에서 하나의 일기 데이터를 불러오는 useDiary 커스텀 훅이 먼저 실행되었기 때문에 오류 발생(useDiary에서 data state가 초기값인 빈배열로 불러와졌기 때문)
  ![새로고침 오류-edit](./image-8.png)
  ![새로고침 오류-diary](./image-9.png)

  `=> 로딩 기능 만들기`

</br>

## 12.18
### 2. 배포 준비하기
#### (1) 페이지 타이틀 : 웹 브라우저 탭에 표시되는 페이지의 제목
  - index.html의 title 수정
  - React는 SPA 방식으로 동작하기 때문에 페이지가 바뀌어도 타이틀 동일
  - 페이지별로 타이틀을 바꾸고 싶다면 js로 설정
#### (2) Favicon : 브라우저 탭에 표시되는 작은 아이콘
  - index.html link 수정, public 폴더에 해당 이미지 저장
    ```html
    <link rel="icon" type="image/svg+xml" href="/favicon.jpg" />
    ```
#### (3) 오픈 그래프 : 웹사이트 링크 공유 시 썸네일, 제목 등의 정보를 노출 하는 것
  - index.html meta 수정, public 폴더에 해당 이미지 저장
    ```html
    <meta property="og:title" content="바키의 감정 일기장" />
    <meta property="og:description" content="나만의 작은 감정 일기장" />
    <meta property="og:image" content="/thumbnail.png" />
    ```
#### (4) 프로젝트 빌드
  ![빌드](./image-10.png)

</br>

## 12.19
### 3. 배포하기
- [vercel](https://vercel.com/) : 프론트엔드 개발자를 위한 클라우드 서비스
- 회원가입
- VSCode 터미널에 명령어 입력
  - 설치
    ```bash
    npm install -g vercel
    ```
  - 로그인
    ```bash
    vercel login
    ```
    ![vercel login](./image-11.png)
  
    ![with github](./image-12.png)

    ![result](./image-13.png)


    ### 트러블 슈팅(미해결)
    - 배포 후 링크에 따라 썸네일이 보이거나 안보임
    - 기본 도메인에서는 썸네일 안보임, 커스텀 도메인에서는 썸네일 보임
    ![카톡 썸네일 안보임](./image-14.png)
    ![vercel 대쉬보드](./image-15.png)

    - 이미지 경로를 절대경로로 변경했으나 해결되지 않음
