import "./DiaryList.css"
import Button from "./Button"
import DiaryItem from "./DiaryItem"
import {useNavigate} from "react-router-dom"
import {useState} from "react"


const DiaryList = ({data}) => {
  const nav = useNavigate()
  // 브라우저에서 정렬옵션 변경하면(최신순, 오래된순) sortType에 보관
  const [sortType, setSortType] = useState("latest")

  const onChangeSortType = (e) => {
    setSortType(e.target.value)
  }
  const getSortedData = () => {
    return data.toSorted((a,b)=>{ // todSorted : 원본배열 그대로 두고, 정렬된 새로운 배열 반환
      // 자바스크립트 정렬함수는 객체값 비교할 때 제대로 작동X -> 콜백함수로 비교함수(a, b 비교)
      if (sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate)
      } else {
        return Number(b.createdDate) -  Number(a.createdDate)
      }
    }) 
  }

  // 리렌더링 될때마다 정렬 결과 저장
  const sortedData = getSortedData()

  return (
    <div className="DiaryList">
      {/* 메뉴바 */}
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          {/* option 설정에 value 별도로 설정해주는 이유 : 어떤 옵션이 선택되어 있는지 state이용해서 저장해야함*/}
          {/* state값에 한국어나 공백 입력하는 것 보다는 영어로 작업하는 것이 나아서 */}
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된순</option>          
        </select>
        <Button onClick={()=>nav(`/new`)} text={"새 일기 쓰기"} type={"POSITIVE"} />
      </div>
      {/* 다이어리 리스트 */}
      <div className="list_wrapper">
        {/* 리액트에서는 컴포넌트를 리스트형태로 렌더링할 때 각각의 모든 아이템에 반드시 고유한 키값을 설정해야한다. */}
        {sortedData.map((item)=><DiaryItem key={item.id} {...item}/>)}
      </div>
    </div>
  )
}

export default DiaryList