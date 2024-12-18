import { useContext, useState, useEffect } from "react"
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

// 함수 이름 앞에 use를 붙이면 커스텀 훅이 된다
const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  // state 초기값이 undifined로 설정되어 있음
  // curDiaryItem statesms useEffect가 실행된 후에 값이 저장됨
  // useEffect는 컴포넌트 렌더링된 후에 실행되므로
  // Diary 컴포넌트 렌더링 되기 전에 최초 호출됐을 때는 undifined 반환
  const [curDiaryItem, setCurDiaryItem] = useState()
  const nav = useNavigate()

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    // 데이터 존재하지 않으면
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    // 존재한다면
    setCurDiaryItem(currentDiaryItem);
  }, [id]);
  return curDiaryItem
}

export default useDiary