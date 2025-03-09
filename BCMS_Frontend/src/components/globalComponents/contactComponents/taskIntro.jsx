import "../../styles/globalStyles/contact.css";
export default function TalkIntro(props) {
  return (
    <>
      <div className="lets_talk_para">
        <h2>Let's Talk</h2>
        <p>{props.infoText}</p>
      </div>
    </>
  );
}
