import "../../styles/globalStyles/placeModule.css";
export default function PlaceModule(props) {
  return (
    <>
      <div className="modules">
        <img src={props.image} />
        <h3>{props.text}</h3>
      </div>
    </>
  );
}
