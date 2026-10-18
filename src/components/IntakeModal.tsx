import React, { useState } from 'react';
import { User, Mail, Phone, ArrowRight, ShieldCheck, Sparkles, X, AlertCircle } from 'lucide-react';
import { AssessmentType } from '../types/quiz';

interface IntakeModalProps {
  isOpen: boolean;
  assessmentType: AssessmentType;
  onClose: () => void;
  onSubmit: (userData: { name: string; email: string; whatsapp: string }) => void;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({
  isOpen,
  assessmentType,
  onClose,
  onSubmit
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const validatePhone = (val: string) => {
    // Allows country codes, plus signs, dashes, spaces, min 7 digits
    const digitsOnly = val.replace(/\D/g, '');
    return digitsOnly.length >= 7;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your full legal name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please provide a valid email address (e.g., yourname@domain.com).');
      return;
    }

    if (!validatePhone(whatsapp)) {
      setError('Please enter a valid WhatsApp phone number with country code.');
      return;
    }

    setIsSubmitting(true);

    try {
      // POST data to the server endpoint to append to participants.csv
      const response = await fetch('/api/register-participant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          whatsapp: whatsapp.trim(),
          assessmentType
        })
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || 'Server error saving data');
      }

      // Also cache in localStorage for recovery
      localStorage.setItem('iqpassport_participant', JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim()
      }));

      onSubmit({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim()
      });
    } catch (err: any) {
      // Fallback: still let the user proceed if offline or on purely static host, but cache locally
      console.warn('Logging server error, caching locally:', err);
      localStorage.setItem('iqpassport_participant', JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim()
      }));
      onSubmit({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testTitle = assessmentType === 'ai-quotient'
    ? 'Artificial IQ (AIQ) Assessment'
    : 'Standard Fluid IQ Test';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.78)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 100
    }}>
      <div 
        className="glass-panel"
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '36px',
          position: 'relative',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-glow)',
          background: 'var(--bg-card-solid)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Sparkles size={13} />
            {testTitle}
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1.65rem',
            fontWeight: 800,
            color: 'var(--heading-color)',
            marginBottom: '6px'
          }}>
            Candidate Registration
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Please provide your details before entering the timed exam room. Your official digital certificate and verification report will be linked to this identity.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--accent-rose)',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '0.86rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Name Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--heading-color)', marginBottom: '6px' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }}>
                <User size={18} />
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Alexander Vance"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-quiz-box)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '11px 14px 11px 42px',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--heading-color)', marginBottom: '6px' }}>
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-quiz-box)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '11px 14px 11px 42px',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px', display: 'block' }}>
              Your certified score report and PDF will be dispatched to this email.
            </span>
          </div>

          {/* WhatsApp Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--heading-color)', marginBottom: '6px' }}>
              WhatsApp Phone Number *
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }}>
                <Phone size={18} />
              </div>
              <input
                type="tel"
                required
                placeholder="+1 555 123 4567"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-quiz-box)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '11px 14px 11px 42px',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px', display: 'block' }}>
              Include international country code (e.g. +1, +44, +880).
            </span>
          </div>

          {/* Privacy Notice */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            color: 'var(--text-subtle)',
            marginTop: '4px'
          }}>
            <ShieldCheck size={16} color="var(--accent-emerald)" />
            <span>Encrypted transmission. Saved directly to verified participant record.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{
              padding: '13px',
              fontSize: '1rem',
              fontWeight: 700,
              marginTop: '10px',
              borderRadius: '12px'
            }}
          >
            {isSubmitting ? 'Registering Candidate...' : 'Proceed to Timed Exam Room'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
