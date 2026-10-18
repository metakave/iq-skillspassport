import React, { useState } from 'react';
import { 
  UserCheck, 
  CreditCard, 
  Check, 
  ShieldCheck, 
  Download, 
  Settings, 
  History, 
  Lock, 
  Sparkles,
  Award
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
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'elite'>('pro');
  const [activeTab, setActiveTab] = useState<'membership' | 'history' | 'security'>('membership');

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '36px 20px 80px' }}>
      {/* Top Banner */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '2.4rem',
          fontWeight: 800,
          marginBottom: '8px'
        }}>
          Skills Passport & Member Portal
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Manage your verified credentials, cognitive reports, training streaks, and recurring membership.
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
          onClick={() => setActiveTab('membership')}
          style={{
            background: activeTab === 'membership' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            color: activeTab === 'membership' ? '#a5b4fc' : 'var(--text-muted)',
            border: activeTab === 'membership' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Membership & Plans
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            background: activeTab === 'history' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            color: activeTab === 'history' ? '#a5b4fc' : 'var(--text-muted)',
            border: activeTab === 'history' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Assessment History
        </button>

        <button
          onClick={() => setActiveTab('security')}
          style={{
            background: activeTab === 'security' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            color: activeTab === 'security' ? '#a5b4fc' : 'var(--text-muted)',
            border: activeTab === 'security' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Settings & Security
        </button>
      </div>

      {activeTab === 'membership' && (
        <div>
          {/* Subscription Tier Cards like MyIQ (Trial -> 28-day cycle) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {/* Standard Pass */}
            <div 
              className="glass-panel"
              style={{
                padding: '32px',
                border: selectedPlan === 'pro' ? '2px solid #6366f1' : '1px solid var(--border-subtle)',
                position: 'relative'
              }}
            >
              <div className="badge badge-brand" style={{ marginBottom: '14px' }}>Most Popular</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px' }}>Pro Skills Passport</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
                Full cognitive diagnostics, verified certificates, and unlimited re-calibration.
              </p>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '2.6rem', fontWeight: 800 }}>$1.95</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> for 7-day trial, then $29.90 / 28-days</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" />
                  <span>Instant certified PDF & Credential Verification</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" />
                  <span>Full 5-Pillar Psychometric Breakdown</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" />
                  <span>Unlimited Daily Brain Training Drills</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" />
                  <span>Cancel anytime in 1 click from portal</span>
                </li>
              </ul>

              <button
                className="btn btn-primary"
                onClick={() => setSelectedPlan('pro')}
                style={{ width: '100%' }}
              >
                {selectedPlan === 'pro' ? 'Current Active Tier' : 'Select Pro Passport'}
              </button>
            </div>

            {/* Elite Lifetime */}
            <div 
              className="glass-panel"
              style={{
                padding: '32px',
                border: selectedPlan === 'elite' ? '2px solid #fbbf24' : '1px solid var(--border-subtle)',
                position: 'relative'
              }}
            >
              <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>Lifetime Access</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px' }}>Mensa-Prep Elite Pass</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
                One-time payment for permanent access, advanced non-verbal matrices, and high-IQ community badge.
              </p>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '2.6rem', fontWeight: 800 }}>$79.00</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> one-time purchase</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" />
                  <span>Lifetime cognitive recalibration tests</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" />
                  <span>Hardest Mensa-style 4x4 matrix puzzles</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" />
                  <span>Priority verifiable employer background checks</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" />
                  <span>Zero recurring fees forever</span>
                </li>
              </ul>

              <button
                className="btn btn-secondary"
                onClick={() => setSelectedPlan('elite')}
                style={{
                  width: '100%',
                  background: selectedPlan === 'elite' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  borderColor: selectedPlan === 'elite' ? '#fbbf24' : 'var(--border-subtle)'
                }}
              >
                {selectedPlan === 'elite' ? 'Current Active Tier' : 'Upgrade to Elite'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>
            Logged Test Attempts
          </h3>

          {scoreResult ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: '#a5b4fc',
                  fontFamily: 'Space Grotesk'
                }}>
                  {scoreResult.iqScore}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Official Standardized Assessment</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {scoreResult.completedAt} • Credential ID: {scoreResult.certificateId}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={onViewCertificate}
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  <Award size={14} />
                  View Certificate
                </button>
                <button
                  className="btn btn-primary"
                  onClick={onRetake}
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  Retake
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              No previous tests recorded yet.
              <div style={{ marginTop: '16px' }}>
                <button className="btn btn-primary" onClick={onRetake}>
                  Take First Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>
            Account & Subscription Management
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '500px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Primary Email
              </label>
              <input
                type="text"
                disabled
                value="candidate@myiq-passport.com"
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#94a3b8'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Subscription Status
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-emerald">Active</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Auto-renews every 28 days</span>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <button
                className="btn btn-secondary"
                style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}
                onClick={() => alert('Subscription auto-renew cancelled. Access remains valid until current period ends.')}
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
