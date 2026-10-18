import React from 'react';
import { 
  Brain, 
  Award, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';

interface HeroLandingProps {
  onStartTest: () => void;
  onStartAiTest?: () => void;
  onExploreTraining: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartTest,
  onStartAiTest,
  onExploreTraining
}) => {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Top Notice Pill */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div 
          className="badge badge-brand animate-glow"
          style={{
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            gap: '8px',
            cursor: 'pointer'
          }}
          onClick={onStartTest}
        >
          <Sparkles size={14} color="#a5b4fc" />
          <span>New 2026 Psychometric Matrix Calibration Standard</span>
          <ChevronRight size={14} />
        </div>
      </div>

      {/* Main Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 48px' }}>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '20px'
        }}>
          Discover Your True <br />
          <span className="text-gradient">Cognitive Potential</span> & IQ
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          maxWidth: '680px',
          margin: '0 auto 36px'
        }}>
          Take the standardized 15-minute diagnostic assessment measuring pattern deduction, spatial rotation, working memory, and numerical logic. Receive instant certified metrics.
        </p>

        {/* CTA Group */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <button 
            className="btn btn-primary"
            onClick={onStartTest}
            style={{
              fontSize: '1.05rem',
              padding: '16px 32px',
              borderRadius: '14px',
              fontWeight: 700
            }}
          >
            <Brain size={22} />
            Start Standard IQ Test
            <ChevronRight size={20} />
          </button>

          <button 
            className="btn btn-accent"
            onClick={() => onStartAiTest ? onStartAiTest() : onStartTest()}
            style={{
              fontSize: '1.05rem',
              padding: '16px 32px',
              borderRadius: '14px',
              fontWeight: 700
            }}
          >
            <Sparkles size={22} />
            Take Artificial IQ (AIQ) Test
            <ChevronRight size={20} />
          </button>

          <button 
            className="btn btn-secondary"
            onClick={onExploreTraining}
            style={{
              fontSize: '1.02rem',
              padding: '16px 24px',
              borderRadius: '14px'
            }}
          >
            <Zap size={20} color="var(--accent-amber)" />
            Brain Gym
          </button>
        </div>

        {/* Test Attributes Meta */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          fontSize: '0.88rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} color="#06b6d4" />
            <span>15-Minute Adaptive Timed Run</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>Scientifically Calibrated Matrix Items</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} color="#fbbf24" />
            <span>Instant Verifiable Digital Certificate</span>
          </div>
        </div>
      </div>

      {/* Visual Assessment Interactive Teaser Card */}
      <div 
        className="glass-panel"
        style={{
          padding: '36px',
          marginBottom: '70px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>
              Sample Matrix Challenge
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.8rem',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              Dynamic Visual Pattern Deductions
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
              Unlike outdated text tests, IQ Passport uses non-verbal culture-fair matrices and AIQ reasoning challenges. Puzzles assess pure fluid intelligence ($G_f$) and machine collaboration capabilities.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>3D Spatial Projections & Origami Folding Net</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Combinatorial Algebra & Symbolic Equivalence</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Dual Working Memory & Sequential Logic</span>
              </li>
            </ul>

            <button
              className="btn btn-primary"
              onClick={onStartTest}
              style={{ padding: '12px 24px' }}
            >
              Test Your Fluid Intelligence Now
            </button>
          </div>

          {/* Interactive Matrix Demo Graphic */}
          <div style={{
            background: 'var(--bg-quiz-box)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '14px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              <span>Question 04 / 30</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>Time Left: 14:12</span>
            </div>

            {/* Matrix Visual */}
            <div style={{
              width: '240px',
              height: '240px',
              marginBottom: '18px'
            }}>
              <svg viewBox="0 0 240 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect width="240" height="240" rx="10" fill="#090d16" stroke="#334155" stroke-width="2"/>
                <line x1="80" y1="0" x2="80" y2="240" stroke="#334155" stroke-width="2"/>
                <line x1="160" y1="0" x2="160" y2="240" stroke="#334155" stroke-width="2"/>
                <line x1="0" y1="80" x2="240" y2="80" stroke="#334155" stroke-width="2"/>
                <line x1="0" y1="160" x2="240" y2="160" stroke="#334155" stroke-width="2"/>
                
                {/* Visual shapes */}
                <circle cx="40" cy="40" r="14" fill="#6366f1"/>
                <circle cx="120" cy="40" r="20" fill="#6366f1"/>
                <circle cx="200" cy="40" r="26" fill="#6366f1"/>

                <rect x="28" y="108" width="24" height="24" rx="3" fill="#06b6d4"/>
                <rect x="106" y="106" width="28" height="28" rx="4" fill="#06b6d4"/>
                <rect x="184" y="104" width="32" height="32" rx="5" fill="#06b6d4"/>

                <polygon points="40,185 25,215 55,215" fill="#a855f7"/>
                <polygon points="120,180 100,220 140,220" fill="#a855f7"/>
                
                {/* Target */}
                <rect x="164" y="164" width="72" height="72" rx="6" fill="#1e1b4b" stroke="#6366f1" stroke-dasharray="4,4"/>
                <text x="200" y="210" font-family="Space Grotesk, sans-serif" font-size="34" font-weight="700" fill="#a5b4fc" text-anchor="middle">?</text>
              </svg>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              width: '100%'
            }}>
              {['A', 'B', 'C', 'D'].map((opt, idx) => (
                <div 
                  key={opt}
                  style={{
                    background: idx === 0 ? 'var(--primary-light)' : 'var(--bg-card)',
                    border: idx === 0 ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: idx === 0 ? 'var(--primary)' : 'var(--text-main)'
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid: What MyIQ Offers */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '2.2rem',
            fontWeight: 800,
            marginBottom: '12px',
            color: 'var(--heading-color)'
          }}>
            The Complete Cognitive Intelligence Ecosystem
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Engineered based on contemporary neuropsychological models for mental agility, working memory capacity, and processing speed.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {/* Card 1 */}
          <div className="glass-panel-interactive" style={{ padding: '30px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'var(--primary-light)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Brain size={26} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: 'var(--heading-color)' }}>
              Standardized Scoring (&mu;=100)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Calculates your IQ using standard standard-deviation bell curve distributions (SD = 15) calibrated with tens of thousands of global candidate baselines.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel-interactive" style={{ padding: '30px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <TrendingUp size={26} color="var(--accent-cyan)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: 'var(--heading-color)' }}>
              5-Pillar Cognitive Breakdown
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Deep dive into your strengths: Pattern Recognition, Spatial Net Rotation, Deductive Logic, Working Memory, and Quantitative Synthesis.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel-interactive" style={{ padding: '30px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Award size={26} color="var(--accent-amber)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: 'var(--heading-color)' }}>
              Verifiable Skills Passport
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Download an official certificate with cryptographic credential verification ID and global percentile rank to share with employers or on LinkedIn.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel-interactive" style={{ padding: '30px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Zap size={26} color="var(--accent-purple)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: 'var(--heading-color)' }}>
              Daily Neuro-Training Drills
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Exercise targeted neural pathways with micro brain training routines designed to build neuroplasticity, memory span, and fast spatial deduction.
            </p>
          </div>
        </div>
      </div>

      {/* Community Testimonials & Stats Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '40px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          textAlign: 'center'
        }}
      >
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            1.2M+
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px', fontWeight: 600 }}>
            Assessments Completed
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            99.4%
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px', fontWeight: 600 }}>
            Calibration Precision
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
            15 Min
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px', fontWeight: 600 }}>
            Average Test Duration
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
            #1
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px', fontWeight: 600 }}>
            Rated Cognitive Platform
          </div>
        </div>
      </div>
    </div>
  );
};
