const Button = ({ text, color, children }) => {
  const onClickButton = (e) => {
    console.log(e)
  }

  return (
    <button onClick={onClickButton} style={{ color: color }}>
      {text} - {color.toUpperCase()}
      {children}
    </button>
  )
}

Button.defaultProps = {
  color: "black",
}

export default Button
