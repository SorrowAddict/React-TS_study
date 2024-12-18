import './Button.css'
const Button = ({ text, type, onClick }) => {
  return (
  // 버튼 type 따라 다른
  <button onClick={onClick} className={ `Button Button_${type}` }>
    {text}
  </button>

  )
}
export default Button