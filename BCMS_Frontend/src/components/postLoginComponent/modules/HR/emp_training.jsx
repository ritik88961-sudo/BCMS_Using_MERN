import "../../../styles/post_login_styles/modules/hr.css";
import CourseCard from "./course_card";
import course from "../../../../assets/images/course.jpeg";
export default function EmpTraining() {
  return (
    <>
      <div className="emp_training">
        <h1>Courses</h1>
        <div className="emp_training_modules">
          <select required>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Purchase">Purchase</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div className="emp_training_course_list">
          <CourseCard
            about_course="Digital marketing is the use of electronic technologies and digital channels to promote products and services to consumers."
            image={course}
            course_module="Marketing"
            course_name="Digital Marketing"
          />
        </div>
      </div>
    </>
  );
}
