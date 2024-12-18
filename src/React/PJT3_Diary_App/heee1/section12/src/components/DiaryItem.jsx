import {getEmotionImage} from "../util/get-emotion-image"
import Button from "./Button"
import "./DiaryItem.css"
import { useNavigate } from "react-router-dom"; // 일기 내용, 수정하기 버튼 클릭 시 이동하기 위함함

const DiaryItem = ({id, emotionId, createdDate, content}) => {
  const nav = useNavigate()

  return (
    <div className="DiaryItem">
      {/* 동적으로 감정 이미지 변경 */}
      <div
        // id값에 맞는 일기 페이지로 이동
        onClick={()=>nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div
        onClick={()=>nav(`/diary/${id}`)}
        className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button
          onClick={()=>nav(`/edit/${id}`)}
          text={"수정하기"}/>
      </div>
    </div>
  );
};

export default DiaryItem;
