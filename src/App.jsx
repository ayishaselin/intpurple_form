import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import felixaImg from './assets/felixaa.png';

// 🔹 Your local FastAPI backend URL
const API_BASE = 'http://127.0.0.1:8000';

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


  const customStyles = `
    .custom-form-container {
      min-height: 100vh;
      background-color: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .custom-form-wrapper {
      background: white;
      border-radius: 0;
      box-shadow: none;
      width: 100%;
      height: 100vh;
      display: flex;
      overflow: hidden;
    }
    .image-section {
      flex: 1;
      width: 50%;
      
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      min-height: 100vh;
    }
    .image-section img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      object-fit: cover;
    }
    .placeholder-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
      padding: 2rem;
    }
    .form-section {
      flex: 1;
      width: 50%;
      padding: 3rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .company-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 1.5rem;
    }
    .form-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 0.5rem;
    }
    .form-subtitle {
      color: #6b7280;
      margin-bottom: 2rem;
      font-size: 1rem;
    }
    .custom-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #111827;
      margin-bottom: 0.5rem;
    }
    .custom-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s;
      box-sizing: border-box;
    }
    .custom-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    .custom-textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s;
      resize: none;
      min-height: 120px;
      box-sizing: border-box;
    }
    .custom-textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    .textarea-wrapper {
      position: relative;
    }
    
    .custom-success-alert {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .success-text {
      color: #166534;
      font-size: 0.875rem;
      margin: 0;
    }
    .custom-submit-btn {
      width: 100%;
      background-color: #54188cff;
      color: white;
      font-weight: 500;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background-color 0.2s;
    }
    .custom-submit-btn:hover {
      background-color: #a254c4ff;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .text-danger {
      color: #ef4444;
    }

    @media (max-width: 768px) {
      .custom-form-wrapper {
        flex-direction: column;
      }
      .image-section {
        min-height: 300px;
        padding: 2rem;
      }
      .form-section {
        padding: 2rem;
      }
      .form-title {
        font-size: 1.75rem;
      }
    }
  `;

return (
    <>
      <style>{customStyles}</style>
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
    </>
  );
}