import React, { useRef } from 'react';
import { Award, ShieldCheck, Download, Printer, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { CognitiveScoreResult } from '../types/quiz';

interface CertificateProps {
  result: CognitiveScoreResult;
  onBack: () => void;
}

export const CertificateView: React.FC<CertificateProps> = ({ result, onBack }) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '30px 20px 80px' }}>
      {/* Top Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <button
          className="btn btn-secondary"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Back to Analysis
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn btn-primary"
            onClick={handlePrint}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff'
            }}
          >
            <Printer size={16} />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Official Certificate Canvas Frame */}
      <div 
        ref={certRef}
        id="printable-certificate"
        style={{
          background: 'linear-gradient(145deg, #0b1120 0%, #080c16 100%)',
          border: '3px solid rgba(245, 158, 11, 0.45)',
          borderRadius: '24px',
          padding: '50px 60px',
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.15)',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Watermark Background */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          opacity: 0.03,
          pointerEvents: 'none'
        }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45"/>
          </svg>
        </div>

        {/* Certificate Outer Border Filigree */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          bottom: '12px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: '16px',
          pointerEvents: 'none'
        }} />

        {/* Certificate Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#fbbf24',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            <Sparkles size={16} />
            {result.assessmentType === 'ai-quotient' 
              ? 'International AI Literacy & Cognitive Collaboration Board' 
              : 'Standardized Cognitive Aptitude Council'}
            <Sparkles size={16} />
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '0.02em',
            color: '#f8fafc',
            marginBottom: '4px'
          }}>
            {result.assessmentType === 'ai-quotient'
              ? 'Artificial Intelligence Quotient (AIQ) Certification'
              : 'Certificate of Cognitive Standing'}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Official Standard Verification under Psychometric Calibration Model v2026.4
          </p>
        </div>

        {/* Presentation Clause */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ color: '#94a3b8', fontSize: '1rem', fontStyle: 'italic', marginBottom: '12px' }}>
            This officially certifies that
          </p>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '2.4rem',
            fontWeight: 800,
            color: '#ffffff',
            borderBottom: '2px solid rgba(245, 158, 11, 0.4)',
            display: 'inline-block',
            padding: '0 30px 6px',
            marginBottom: '16px'
          }}>
            {result.userName}
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            {result.assessmentType === 'ai-quotient'
              ? 'has demonstrated verified proficiency in Human-AI collaborative reasoning, including prompt architecture, critical hallucination auditing, agentic delegation, context retrieval mechanics, and adversarial alignment defense.'
              : 'has successfully undertaken the proctored standard cognitive assessment measuring abstract pattern recognition, spatial net projection, working memory load, and deductive agility.'}
          </p>
        </div>

        {/* Scores & Badge Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '36px'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {result.assessmentType === 'ai-quotient' ? 'Calibrated AIQ Index' : 'Standard IQ Index'}
            </div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '3rem', fontWeight: 800, color: '#fbbf24' }}>
              {result.iqScore}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              {result.assessmentType === 'ai-quotient' ? 'Benchmark: Human-AI Frontier (μ=100)' : 'Scale: Wechsler (σ=15)'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Global Percentile
            </div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '3rem', fontWeight: 800, color: '#67e8f9' }}>
              {result.percentile}%
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              Outperforms 99% Cohort
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Cognitive Classification
            </div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.25rem', fontWeight: 700, color: '#a5b4fc', marginTop: '16px' }}>
              {result.statusTitle}
            </div>
          </div>
        </div>

        {/* Signatures & Seal Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '28px',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          {/* Left Signature */}
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontFamily: 'serif',
              fontSize: '1.4rem',
              color: '#cbd5e1',
              fontStyle: 'italic',
              marginBottom: '4px'
            }}>
              Dr. Marcus Vance, Ph.D.
            </div>
            <div style={{ height: '1px', width: '180px', background: 'rgba(255, 255, 255, 0.2)', marginBottom: '4px' }} />
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Director of Psychometrics
            </div>
          </div>

          {/* Official Gold Seal Graphic */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fbbf24 0%, #b45309 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.5)',
              border: '2px dashed #fef3c7'
            }}>
              <Award size={38} color="#0b1120" />
            </div>
            <span style={{ fontSize: '0.7rem', color: '#fbbf24', marginTop: '6px', fontWeight: 700, letterSpacing: '0.08em' }}>
              VERIFIED AUTHENTIC
            </span>
          </div>

          {/* Right Verification Details */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Issued: <strong>{result.completedAt}</strong></div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Credential ID:</div>
            <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.92rem', color: '#a5b4fc', fontWeight: 700 }}>
              {result.certificateId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
