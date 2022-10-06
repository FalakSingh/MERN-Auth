export const RedAlert = (props) => {
  return(
    <div className=" alert-popup alert alert-danger" role="alert">
      {props.alertText}
    </div>
  )
}