import { useEffect } from "react"

const usePageTitle = (title) => {
  // 페이지 이동하면 타이틀 변경
  useEffect(()=>{
    // js에서 DOM요소 변수에 저장할할 때 관례상 $ 사용
    const $title = document.getElementsByTagName("title")[0]
    $title.innerText = title
  },[title])
}
export default usePageTitle