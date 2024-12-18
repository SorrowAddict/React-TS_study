import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { DiaryDispatchContext } from "../App"
import usePageTitle from "../hooks/usePageTitle"

const New = () => {
  const {onCreate} = useContext(DiaryDispatchContext)
  const nav = useNavigate()
  usePageTitle("새 일기 쓰기")
  
  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content)
    // 새로운 일기 작성 후 일기 리스트 페이지로 이동, 뒤로가기(방금 작성한 페이지로 이동) 방지
    nav("/", {replace: true}) // replace: 뒤로가기 방지하면서 페이지 이동하는 옵션
  }
  return (
    <div>
      <Header title={"새 일기 쓰기"}
        leftChild={<Button
        onClick={()=>nav(-1)} // 뒤로가기 : -1
        text={"< 뒤로가기"} />}
      />
      <Editor onSubmit={onSubmit}/>
    </div>
  ) 
};

export default New;
