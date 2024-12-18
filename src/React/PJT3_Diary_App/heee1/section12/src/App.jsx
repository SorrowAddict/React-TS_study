import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom"; // Link: a태그와 유사
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from './pages/Edit'

import Notfound from "./pages/Notfound";
import Button from "./components/Button";
import Header from "./components/Header";

import { useReducer, useRef, createContext, useEffect, useState } from 'react'

// 이미지 파일 import 모듈화
import { getEmotionImage } from "./util/get-emotion-image";


function reducer(state, action) {
  let nextState
  // action의 type이 CREATE일때
  switch(action.type) {
    case "INIT":
      return action.data  // action.data는 방금 localStorage에서 불러온 값이므로 바로 return
    case "CREATE": {
      nextState = [action.data, ...state]
      break
    }
    // item의 id값이 현재 action.data.id와 일치하다면 action.data 반환
    // id 형태가 서로 다를 수 있으므로 방지차원에서 String
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item)
        break
    }
    case "DELETE": {
      nextState = state.filter((item)=>String(item.id) !== String(action.id))
      break
    }
    default: return state
  }
  localStorage.setItem("diary", JSON.stringify(nextState))
  return nextState
}

// Home에서 App의 context 사용용
export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

// 1. "/" : 모든 일기를 조회하는 Home
// 2. "/new" : 새로운 일기를 작성하는 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4. "/edit" : 일기 수정
// 리액트에서는 모든 요소가 컴포넌트로 나뉨 -> 페이지도 컴포넌트로 이루어짐
function App() {
  const [isLoading, setIsLoading] = useState(true)  // 로딩
  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0) // 생성될 일기의 id 저장

  // App컴포넌트가 마운트될 때 로컬스토리지에서 데이터 불러오기(data state 초기값으로 설정)
  useEffect(()=>{
    const storedData = localStorage.getItem("diary")
    if(!storedData) {
      setIsLoading(false)
      return
    }
    const parsedData = JSON.parse(storedData)
    // parsedData가 배열이 아닐 경우를 염두한 예외처리
    if (!Array.isArray(parsedData)) {
      return
    }

    let maxId = 0
    parsedData.forEach((item)=>{
      if(Number(item.id) > maxId) {
        maxId = Number(item.id)
      }
    })
    
    idRef.current = maxId + 1 // 새로운 일기 생성될 때 기존 저장되어있던 일기 id와 겹치지 않도록 +1

    dispatch({
      type:"INIT",
      data: parsedData,
    })
    setIsLoading(false)
  },[])


  // 새로운 일기를 추가하는 기능
  const onCreate = (createdDate, emotionId, content) => {
    // 새로운 일기 data를 객체 형태로 넘겨줌
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })
  }

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch(
      {
        type: "UPDATE",
        data: {
          id, createdDate, emotionId, content
        },
      }
    )
  }

  // 기존 일기 삭제(id 필요)
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })
  }

  const nav = useNavigate();
  // a태그처럼 링크가 필요하면 Link 사용
  // 특정 조건에 따라 페이지 이동해야하는 경우 useNavigate
  const onClickButton = () => {
    nav("/new");
  };

  // 로딩이 끝나지 않았을 때 페이지 로딩 안되게 조건 설정
  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>
  }

  return (
    <>
    {/* <button onClick={()=>{
      // 현재시간, 감정번호, 내용
      onCreate(new Date().getTime(), 1,"Hello")
    }}>일기 추가 테스트</button>

    <button onClick={()=>{
      onUpdate(1, new Date().getTime(), 3, "수정된 일기입니다.")
    }}>
      일기 수정 테스트
    </button>

    <button onClick={()=>{
      onDelete(1)
    }}>
      일기 삭제 테스트
    </button> */}

      {/* Routes 외부에 있는 요소는 페이지 경로와 상관없이 모든 화면에 렌더링 */}
      {/* <Header
        title={"Header"}
        leftChild={<Button text={"left"} />}
        rightChild={<Button text={"right"} />}
      />

      <Button
        text={123}
        // type={"DEFAULT"} // 생략해도 Button_undifined로 되기때문에 기본 버튼으로 설정됨
        onClick={() => {
          console.log("버튼 클릭");
        }}
      />
      <Button
        text={123}
        type={"POSITIVE"}
        onClick={() => {
          console.log("버튼 클릭");
        }}
      />
      <Button
        text={123}
        type={"NEGATIVE"}
        onClick={() => {
          console.log("버튼 클릭");
        }}
      /> */}

      {/* <div> */}
      {/* public 폴더에서 불러올 경우 */}
      {/* Vite의 이미지 최적화 X */}
      {/* <img src={"/emotion1.png"} />
        <img src={"/emotion2.png"} />
        <img src={"/emotion3.png"} />
        <img src={"/emotion4.png"} />
        <img src={"/emotion5.png"} /> */}
      {/* </div> */}
      {/* <div> */}
      {/* assets 폴더에서 불러올 경우 */}
      {/* get-emotion-image.js 모듈화 한 후 수정 */}
      {/* <img src={getEmotionImage(1)} />
        <img src={getEmotionImage(2)} />
        <img src={getEmotionImage(3)} />
        <img src={getEmotionImage(4)} />
        <img src={getEmotionImage(5)} />
      </div> */}
      {/* <div> */}
      {/* Link 컴포넌트는 클라이언트 사이드 렌더링으로 페이지를 이동시키기 때문에
        이전 페이지를 날리고 새로운 페이지를 렌더링하는 것이 아니라 필요한 컴포넌트만 교체 */}
      {/* <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link> */}

      {/* a태그 사용하면 화면 깜빡이면서 페이지 이동 */}
      {/* <a href="/">Home</a>
        <a href="/new">New</a>
        <a href="/diary">Diary</a> */}
      {/* <button onClick={onClickButton}>New 페이지로 이동</button>
      </div> */}
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            {/* Routes 컴포넌트 내부에는 Route 컴포넌트만 가능 */}
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            {/* 와일드카드(*)
            마지막에 이 경로에 매칭되어서 Notfound 렌더링 */}
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
