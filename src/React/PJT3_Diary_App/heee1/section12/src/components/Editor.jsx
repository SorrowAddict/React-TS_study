import "./Editor.css"
import EmotionItem from "./EmotionItem"
import Button from "./Button"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { emotionList } from "../util/constants"
import { getStringedDate } from "../util/get-stringed-date"

// constants.js로 모듈화(Viewer.jsx에서도 사용)
// const emotionList = [
//   {
//     emotionId: 1,
//     emotionName: "완전 좋음"
//   },
//   {
//     emotionId: 2,
//     emotionName: "좋음"
//   },
//   {
//     emotionId: 3,
//     emotionName: "그럭저럭"
//   },
//   {
//     emotionId: 4,
//     emotionName: "나쁨"
//   },
//   {
//     emotionId: 5,
//     emotionName: "끔찍함"
//   },
// ]

// get-stringed-data.js로 모듈화
// 날짜를 YYYY-MM-DD 형태로 변경
// const getStringedDate = (targetDate) => {
//   let year = targetDate.getFullYear()
//   let month = targetDate.getMonth() + 1
//   let date = targetDate.getDate()

//   if (month < 10) {
//     month = `0${month}`
//   }
//   if (date < 10) {
//     date = `0${date}`
//   }
//   return `${year}-${month}-${date}`
// }


const Editor = ({initData, onSubmit}) => {
  // input state에 날짜, 감정, 일기 저장 -> 여러값을 저장/관리할 때는 객체형태로
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  })

  const nav = useNavigate() // 취소하기 버튼에서 쓸 거

  useEffect(()=>{
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)), // 이부분 없이 ...initData로만 작성하면 Date객체가 아닌 타임스탬프(숫자)로 인식?
      })
    }
  },[initData])
  
  const onChangeInput = (e) => {    
    let name = e.target.name
    let value  = e.target.value
    
    if (name === "createdDate") {
      value = new Date(value)
    }
    setInput({
      ...input,
      [name]: value, // Date 겍체가 아니라 문자열로 저장됨
    })
  }
  
  const onClickSubmitButton = () => {
    onSubmit(input) // 버튼 클릭되면 Editor함수가 가지고 있는 사용자 입력값인 input state 넘겨줌
  }
  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        {/* input태그는 Date 객체를 이해하지 못하므로 문자열로 변경해주어야 함 */}
        <input
          name="createdDate"
          onChange={onChangeInput}
          type="date"
          value={getStringedDate(input.createdDate)}/>
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {/* React에서 Virtual DOM 효율적으로 관리, 업데이트하기 위해 반드시 key 필요 */}
          {emotionList.map((item)=>(
            // EmotionItem 컴포넌트들이 클릭되었을 때 입력이 발생한 것 처럼 이벤트 직접 발생
            // EmotionItem은 컴포넌트이기 때문에 이벤트가 자동으로 전달되지 않음. 별도의 이벤트 객체 필요
            // 감정 아이템(EmotionItem)을 클릭하면 emotionId라는 요소가 클릭되었다는 이벤트 발생 -> EmotionItem.jsx onClick 전달
            <EmotionItem
              onClick={()=>onChangeInput({
                target: {
                  name: "emotionId",
                  value: item.emotionId,
                },
              })}
              key={item.emotionId} {...item}
              isSelected={item.emotionId === input.emotionId}
            />
            ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?" />
      </section>
      <section className="button_section">
        <Button onClick={()=>nav(-1)} text={"취소하기"}/>
        <Button onClick={onClickSubmitButton} text={"작성완료"} type={"POSITIVE"}/>
        {/* Editor 컴포넌트는 공통 컴포넌트임(새 일기 작성 New, 수정 Edit에 다 쓰임)
        어떤 페이지에서 작성완료 버튼을 눌렀느냐 다른 동작해야함 */}
        {/* App 컴포넌트의 data state에 새로운 값 추가하는 기능 -> onCreate
        DiaryDispatchContext로 공급받으면 ->  Edit에서도 create됨. 0but New에서는 create Edit에서는 update되어야함.*/}
        {/* => 작성완료 버튼이 클릭되었을 때 실행되어야 하는 함수를 Props로 전달받기 */}
      </section>
    </div>
  )
}

export default Editor