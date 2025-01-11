import React, { useRef, useState } from 'react';
import './ContactUs.css';
import emailjs from 'emailjs-com'; // Updated import

const ContactUs = () => {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const userName = form.current.user_name.value;
    const userEmail = form.current.user_email.value;
    const userMessage = form.current.message.value;
    const regex = /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/;

    if (!userName || !userEmail || !userMessage) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!regex.test(userEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");

    emailjs
      .sendForm(
        'service_g0zbdtm', // Your service ID
        'template_nid9r2a', // Your template ID
        form.current, 
        'cZ263R-BKLX5meEdu' // Your user ID
      )
      .then((result) => {
        console.log(result);
        console.log("Viesti on lähetetty");
        setIsSubmitted(true);
        form.current.reset();
        // setSuccessMessage(('SUCCESS'));
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>

      <form ref={form} onSubmit={sendEmail} className="form-section">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <label>Name</label>
        <input type="text" name="to_name" />

        <label>Email</label>
        <input type="email" name="from_name" />

        <label>Message</label>
        <textarea name="message" />

        <input type="submit" value={isSubmitted ? "Sent" : "Send"} className={isSubmitted ? 'green-button' : ''} />
      </form>
    </div>
  );
};

export default ContactUs;
