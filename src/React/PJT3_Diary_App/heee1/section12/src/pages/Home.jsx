// import { useSearchParams } from "react-router-dom"
import { useState, useContext } from "react";
// Home에서 App의 context 사용
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle"


// data에 저장된 일기 데이터를 필터링
const getMonthlyData = (pivotDate, data) => {
  // createdDate가 이번달의 시작시간 ~ 끝시간 사이에 있는지 확인
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(),1,0,0,0).getTime() // 연, 월, 1일, 0시, 0분, 0초
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1,0,23,59,59).getTime() // 일을 0으로 설정하면 이전달의 마지막날로 설정됨
  return data.filter((item)=> beginTime <= item.createdDate && item.createdDate <= endTime)
}

const Home = () => {
  const data = useContext(DiaryStateContext)
  // const [params, setParams] = useSearchParams()
  // 상단 좌우 버튼 누르면 날짜 변경
  const [pivotDate, setPivotDate] = useState(new Date());
  usePageTitle("바키의 감정 일기장")

  const monthlyData = getMonthlyData(pivotDate, data)

  const onIncreaseMonth = () => {
    // Date 객체가 현재 pivotDate로부터 한달 뒤에 해당하는 날짜 저장하도록 설정
    // 연도는 그대로, 월만 변경
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1))
  }
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
  }

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        // leftChild로 전달한 "<"버튼 클릭하면 pivotDate state에 저장된 Date 객체를 한달 이전으로
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        // ">" 버튼 클릭시 한달 이후로로
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data={monthlyData}/>
    </div>
  );
};

export default Home;
