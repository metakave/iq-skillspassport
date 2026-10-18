import React, { useState } from 'react';
import { 
  Dumbbell, 
  Brain, 
  Sparkles, 
  Zap, 
  RotateCw, 
  CheckCircle2, 
  Play, 
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface GameExercise {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  duration: string;
  description: string;
}

export const TrainingHub: React.FC<{ onStartTest: () => void }> = ({ onStartTest }) => {
  // Mini interactive brain game state: Visual Sequence Memory
  const [activeTab, setActiveTab] = useState<'drills' | 'speed-matrix'>('speed-matrix');
  const [gridTiles, setGridTiles] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [activeFlash, setActiveFlash] = useState<number | null>(null);
  const [sequence, setSequence] = useState<number[]>([2, 5, 8]);
  const [userClicks, setUserClicks] = useState<number[]>([]);
  const [gameScore, setGameScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('Press Start to test your immediate working memory span.');

  const exercises: GameExercise[] = [
    {
      id: 'matrix-reflex',
      title: 'Raven Matrix Reflex',
      category: 'Fluid Intelligence',
      difficulty: 'Intermediate',
      duration: '3 mins',
      description: 'Rapid deduction of missing geometry patterns under high-pressure timer constraints.'
    },
    {
      id: 'dual-n-back',
      title: 'Dual N-Back Audio-Spatial',
      category: 'Working Memory',
      difficulty: 'Advanced',
      duration: '5 mins',
      description: 'The proven neuroplasticity protocol tracking simultaneous spatial coordinates and auditory cues.'
    },
    {
      id: 'spatial-net',
      title: '3D Polyhedron Folding',
      category: 'Spatial Reasoning',
      difficulty: 'Master',
      duration: '4 mins',
      description: 'Rotate complex isometric polyhedrons in mental 3D space to identify mirrored vertices.'
    },
    {
      id: 'number-flow',
      title: 'Arithmetic Syllogisms',
      category: 'Quantitative Logic',
      difficulty: 'All Levels',
      duration: '2 mins',
      description: 'Identify polynomial progressions and hidden arithmetic ratios in record time.'
    }
  ];

  const handleStartGame = () => {
    setIsPlaying(true);
    setUserClicks([]);
    setFeedback('Watch the glowing sequence carefully...');
    
    // Generate 3 random tiles
    const newSeq = [
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9)
    ];
    setSequence(newSeq);

    // Playback sequence
    newSeq.forEach((tileIdx, step) => {
      setTimeout(() => {
        setActiveFlash(tileIdx);
        setTimeout(() => setActiveFlash(null), 450);
      }, (step + 1) * 700);
    });

    setTimeout(() => {
      setFeedback('Your turn! Click the 3 tiles in the exact sequence shown.');
    }, 4 * 700);
  };

  const handleTileClick = (index: number) => {
    if (!isPlaying) return;

    const nextClicks = [...userClicks, index];
    setUserClicks(nextClicks);

    // Check if match
    const step = nextClicks.length - 1;
    if (sequence[step] !== index) {
      setFeedback('❌ Incorrect sequence! Tap "Play Again" to sharpen your neural retention.');
      setIsPlaying(false);
      return;
    }

    if (nextClicks.length === sequence.length) {
      setFeedback('✨ Outstanding! Perfect working memory recall (+100 Neural XP).');
      setGameScore(prev => prev + 100);
      setIsPlaying(false);
    }
  };

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '36px 20px 80px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="badge badge-brand" style={{ marginBottom: '12px' }}>
          <Dumbbell size={14} />
          Neuroplasticity Gym
        </div>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
          fontWeight: 800,
          marginBottom: '12px'
        }}>
          Daily Cognitive Workouts
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
          Daily targeted exercises proven to reinforce working memory capacity, spatial rotation, and pattern agility.
        </p>
      </div>

      {/* Interactive Micro-Game Feature Box */}
      <div 
        className="glass-panel"
        style={{
          padding: '36px',
          marginBottom: '50px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-glow)'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
              Live Neuro Drill: Working Memory Span
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px', color: 'var(--heading-color)' }}>
              Spatial Sequence Matrix
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.6 }}>
              Working memory is the engine of fluid intelligence. Memorize the 3-step tile activation and reproduce the pattern without lapse.
            </p>

            <div style={{
              background: 'var(--bg-quiz-box)',
              border: '1px solid var(--border-subtle)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Status</div>
              <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--primary)' }}>{feedback}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                className="btn btn-primary"
                onClick={handleStartGame}
                disabled={isPlaying}
              >
                <Play size={18} />
                {isPlaying ? 'Sequence in Progress...' : 'Start Memory Drill'}
              </button>

              <div style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 700 }}>
                Score: {gameScore} XP
              </div>
            </div>
          </div>

          {/* 3x3 Interactive Grid */}
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 80px)',
              gap: '12px',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '18px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {gridTiles.map(idx => {
                const isFlashing = activeFlash === idx;
                const isUserClicked = userClicks.includes(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => handleTileClick(idx)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '14px',
                      background: isFlashing 
                        ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' 
                        : isUserClicked 
                          ? 'rgba(99, 102, 241, 0.5)' 
                          : 'rgba(255, 255, 255, 0.06)',
                      border: isFlashing 
                        ? '2px solid #67e8f9' 
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: isFlashing ? '0 0 25px rgba(6, 182, 212, 0.8)' : 'none',
                      cursor: isPlaying ? 'pointer' : 'default',
                      transition: 'all 0.15s ease',
                      outline: 'none'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Catalog of Daily Drills */}
      <h3 style={{
        fontFamily: 'Space Grotesk',
        fontSize: '1.6rem',
        fontWeight: 700,
        marginBottom: '20px'
      }}>
        Recommended Daily Workouts
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {exercises.map(item => (
          <div key={item.id} className="glass-panel-interactive" style={{ padding: '24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '14px'
            }}>
              <span className="badge badge-brand">{item.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.duration}</span>
            </div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '18px' }}>
              {item.description}
            </p>
            <button
              className="btn btn-secondary"
              onClick={onStartTest}
              style={{ width: '100%', fontSize: '0.85rem', padding: '8px 14px' }}
            >
              Start Session
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
