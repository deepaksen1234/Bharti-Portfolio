// Form.jsx
import React from 'react';

const Form = () => {
  return (
    <div class="contact-form-container">
    <h5 class="contact-form-title">Get In Touch</h5>
    <form action="https://formspree.io/f/mnndnwjb" method="POST" class="contact-form">
      <div class="contact-form-field">
        <label htmlFor="name" class="contact-form-label">Name</label>
        <input type="text" name="username" placeholder="Your Name" autoComplete="off" required class="contact-form-input" id="name" />
      </div>
      <div class="contact-form-field">
        <label htmlFor="email" class="contact-form-label">Email</label>
        <input type="email" name="Email" placeholder="Your Email" autoComplete="off" required class="contact-form-input" id="email" />
      </div>
      <div class="contact-form-field">
        <label htmlFor="message" class="contact-form-label">Message</label>
        <textarea name="message" cols="30" rows="6" autoComplete="off" required class="contact-form-input" id="message"></textarea>
      </div>
      <button type="submit" value="send" class="contact-form-btn">Submit</button>
    </form>
  </div>
  
  );
};

export default Form;
