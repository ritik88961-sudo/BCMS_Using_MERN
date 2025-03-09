import "../../styles/globalStyles/contact.css";
import TalkIntro from "./taskIntro";
export default function ContactForm() {
  return (
    <>
      <div className="lets_talk">
        <TalkIntro
          infoText="We’re here to help you build stronger collaborations, streamline workflows, and achieve business success. 
            Whether you have questions about our system, need a demo, or want to explore how we can work together, let’s connect!
            Share your details, and we’ll get back to you as soon as possible."
        />
        <div className="lets_talk_form">
          <p>Fields marked with an * are mandatory</p>
          <form action="" method="POST">
            <label htmlFor="fname">
              First Name: <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              className="form_input"
              placeholder="Enter your first name"
              required
            />

            <label htmlFor="lname">
              Last Name: <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              className="form_input"
              placeholder="Enter your last name"
              required
            />

            <label htmlFor="email">
              Business Email: <span className="mandatory">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form_input"
              placeholder="Enter your business email"
              required
            />

            <label htmlFor="phone">
              Phone: <span className="mandatory">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form_input"
              placeholder="Enter your phone number"
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              wrap="hard"
              placeholder="Let us know how we can help you"
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
