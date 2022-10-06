
export default function Clock(){
  let today = new Date();
  let hours =  today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let time =  hours + ":" + minutes + ":" + seconds

  return (<p>{time}</p>)

}