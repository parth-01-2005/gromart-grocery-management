import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Email is not valid';
    if (!message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/contact', { name, email, message });
      target.success('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (err) {
      console.error(err);
      setSuccess('');
      toast.error({ form: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      {success && <div className="text-green-600 mb-4">{success}</div>}
      {errors.form && <div className="text-red-600 mb-4">{errors.form}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            className="w-full border px-4 py-2 rounded"
            rows="4"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dull"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
