export const RedAlert = (props) => {
  return(
    <div className={`alert-popup alert alert-danger ${props.className}`} role="alert">
      {props.alertText}
    </div>
  )
}