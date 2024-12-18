import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary"
import usePageTitle from "../hooks/usePageTitle"


const Edit = () => {
  const params = useParams(); // url 파라미터로 몇번 id의 일기인지 나타남
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  usePageTitle(`${params.id}번 일기 수정`)
  
  const curDiaryItem = useDiary(params.id)

  // hooks/useDiary.jsx로 분리해서 주석처리
  // const data = useContext(DiaryStateContext);
  // const [curDiaryItem, setCurDiaryItem] = useState();

  // params의 id나 data state가 변경될 때, 마운트 될 때 실행
  // useEffect(() => {
  //   const currentDiaryItem = data.find(
  //     (item) => String(item.id) === String(params.id)
  //   );
  //   // 데이터 존재하지 않으면
  //   if (!currentDiaryItem) {
  //     window.alert("존재하지 않는 일기입니다.");
  //     nav("/", { replace: true });
  //   }
  //   // 존재한다면
  //   setCurDiaryItem(currentDiaryItem);
  // }, [params.id]);
  // },arams.id[params.id, data]) // react-router v7이후이먄 data 삭제
  // -> params.id 값이 변하지 않으면 다시는 호출 되지 않을 것.


  const onClickDelete = () => {
    // window.confirm : 확인, 취소 버튼 있는 팝업창(확인 클릭 시: true, 취소: false)
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요")) {
    }
    {
      onDelete(params.id); // App의 onDelete가 DiaryDispatchContext로 공급됨
      nav("/", { replace: true }); // 홈페이지로 이동 및 뒤로가기 방지(삭제된 일기 페이지의 수정페이지 보이면 이상하잖아)
    }
  };

  // const getCurrentDiaryItem = () => {
  //   // url 파라미터로 전달된 id와 일치하는 item을 찾아서 반환
  //   // id 타입이 다를수도 있으므로 형변환
  //   const currentDiaryItem = data.find(
  //     (item) => String(item.id) === String(params.id)
  //   )
  //   // 데이터 존재하지 않으면
  //   if (!currentDiaryItem) {
  //     window.alert("존재하지 않는 일기입니다.")
  //     nav("/", {replace: true})

  //   }
  //   // 존재한다면
  //   return currentDiaryItem
  // }

  // const currentDiaryItem = getCurrentDiaryItem()
  // Edit 컴포넌트가 처음 호출되었을때 etCurrentDiaryItem에서 nav 호출
  // 하지만 Edit 컴포넌트가 return한 값이 없는 상태(즉, 컴포넌트가 화면에 그려지기 전. 마운트되기 전)이므로 nav함수 동작 불가
  // 컴포넌트가 렌더링 되자마자 호출하고 싶다면 useEffect 사용해서 마운트된 이후에 nav호출해야함
  // react-router의 nav함수는 컴포넌트가 마운트된 이후에 사용 가능함
  // main.jsx에서 설정한 BrowserRouter에서 공급하고 있는 기능이기 때문임(BrowserRouter 컴포넌트 렌더링 안된 상태이므로 사용불가)

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?"))
      // App 컴포넌트에 작성되어 있는 onUpdate인수와 순서 같게 작성
      // createdDate는 Date객체이므로 타임스탬프 형식으로 전달
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
    nav("/", { replace: true }); // 홈 화면 이동, 뒤로가기 방지
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
