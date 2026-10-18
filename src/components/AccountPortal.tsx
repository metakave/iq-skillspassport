import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Award,
  Clock,
  CheckCircle,
  FileText
} from 'lucide-react';
import { CognitiveScoreResult } from '../types/quiz';

interface AccountPortalProps {
  scoreResult: CognitiveScoreResult | null;
  onViewCertificate: () => void;
  onRetake: () => void;
}

export const AccountPortal: React.FC<AccountPortalProps> = ({
  scoreResult,
  onViewCertificate,
  onRetake
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');

  // Load participant profile if available
  const participant = (() => {
    try {
      const saved = localStorage.getItem('iqpassport_participant');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  })();

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '36px 20px 80px' }}>
      {/* Top Banner */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '2.4rem',
          fontWeight: 800,
          color: 'var(--heading-color)',
          marginBottom: '8px'
        }}>
          Candidate Portal & Skills Passport
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Access your verified cognitive metrics, AIQ diagnostic records, and official digital credentials. All assessments are 100% free of charge.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px',
        marginBottom: '32px'
      }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            background: activeTab === 'profile' ? 'var(--primary-light)' : 'transparent',
            color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-muted)',
            border: activeTab === 'profile' ? '1px solid var(--border-subtle)' : '1px solid transparent',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Candidate Profile
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            background: activeTab === 'history' ? 'var(--primary-light)' : 'transparent',
            color: activeTab === 'history' ? 'var(--primary)' : 'var(--text-muted)',
            border: activeTab === 'history' ? '1px solid var(--border-subtle)' : '1px solid transparent',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Assessment History
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--heading-color)', marginBottom: '16px' }}>
            Registered Candidate Information
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.6 }}>
            Your details are stored in the server participant registry and linked to your digital certificates.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '28px'
          }}>
            <div style={{
              background: 'var(--bg-quiz-box)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                Full Name
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                {participant?.name || 'Not registered yet'}
              </div>
            </div>

            <div style={{
              background: 'var(--bg-quiz-box)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                Email Address
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                {participant?.email || 'Not registered yet'}
              </div>
            </div>

            <div style={{
              background: 'var(--bg-quiz-box)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                WhatsApp Number
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                {participant?.whatsapp || 'Not registered yet'}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 18px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '10px',
            color: 'var(--accent-emerald)',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            <CheckCircle size={18} />
            <span>Full Free Access Enabled — No subscription or payment required.</span>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--heading-color)', marginBottom: '20px' }}>
            Completed Assessments
          </h3>

          {scoreResult ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              background: 'var(--bg-quiz-box)',
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  fontSize: '1.3rem',
                  fontFamily: 'Space Grotesk'
                }}>
                  {scoreResult.iqScore}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.08rem', color: 'var(--heading-color)' }}>
                    {scoreResult.assessmentType === 'ai-quotient' ? 'Artificial IQ (AIQ) Certification' : 'Standard Fluid IQ Assessment'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {scoreResult.completedAt} • Credential ID: <strong>{scoreResult.certificateId}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={onViewCertificate}
                  style={{ fontSize: '0.88rem', padding: '8px 16px' }}
                >
                  <Award size={15} />
                  View Certificate
                </button>
                <button
                  className="btn btn-primary"
                  onClick={onRetake}
                  style={{ fontSize: '0.88rem', padding: '8px 16px' }}
                >
                  Retake Test
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <p style={{ marginBottom: '16px' }}>No completed tests logged on this browser yet.</p>
              <button className="btn btn-primary" onClick={onRetake}>
                Start Your First Free Assessment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
