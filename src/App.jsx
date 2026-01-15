import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import felixaImg from './assets/felixaa.png';
import './ContactForm.css';

// 🔹 Your local FastAPI backend URL
const API_BASE = 'https://mean-dollars-matthew-aurora.trycloudflare.com';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 This will send data to FastAPI: POST /save-lead
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    setError('');
    setIsSubmitted(false);

    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Please fill Full Name, Email and Phone.');
      return;
    }

    const payload = {
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      message: `Company: ${formData.company || '-'}\nMessage: ${formData.message || ''}`,
      source: 'website',
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/save-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('save-lead response:', data);

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || 'Failed to save lead');
      }

      // ✅ Success
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };




return (
    <div className="custom-form-container">
        <div className="custom-form-wrapper">
          {/* Left Side - Image */}
          <div className="image-section">
            <img src={felixaImg} alt="Felixa" />
          </div>

          {/* Right Side - Form */}
          <div className="form-section">
            <h1 className="form-title">Get in Touch</h1>
            <p className="form-subtitle">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="custom-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="custom-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="custom-label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="custom-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="custom-label">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="custom-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="custom-label">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="custom-input"
                />
              </div>

              <div className="form-group">
                <label className="custom-label">
                  Message
                </label>
                <div className="textarea-wrapper">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    className="custom-textarea"
                  />
                </div>
              </div>

              {error && <p className="error-text">{error}</p>}

              {isSubmitted && (
                <div className="custom-success-alert">
                  <CheckCircle size={20} color="#16a34a" style={{ flexShrink: 0 }} />
                  <p className="success-text">
                    Thank you! Your message has been submitted successfully. We'll be in touch soon.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="custom-submit-btn"
                disabled={loading}
              >
                <Send size={20} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}