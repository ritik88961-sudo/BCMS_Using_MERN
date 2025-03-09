import "../styles/globalStyles/card.css";
export default function Card(props) {
  return (
    <>
      <div className="collaborate overview_items">
        <div className="overview_img">
          <img src={props.image} />
        </div>
        <div className="overview_para">
          <p>{props.text}</p>
        </div>
      </div>
    </>
  );
}
