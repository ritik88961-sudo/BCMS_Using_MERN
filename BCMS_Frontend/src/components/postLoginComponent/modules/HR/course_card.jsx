import "../../../styles/post_login_styles/modules/hr.css";
export default function CourseCard(props) {
  return (
    <>
      <div className="card">
        <div className="card_header">
          <div className="course_image">
            <img src={props.image} />
          </div>

          <h2>{props.course_name}</h2>
          <h3>{props.course_module}</h3>
        </div>
        <div className="card_middle">
          <p>{props.about_course}</p>
        </div>
        <div className="card_footer">
          <button>Assign to Employee</button>
          <button>Remove Access</button>
        </div>
      </div>
    </>
  );
}
