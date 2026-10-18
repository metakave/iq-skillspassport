import { Question } from '../types/quiz';

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    category: 'pattern-recognition',
    categoryLabel: 'Pattern Recognition',
    prompt: 'Identify the missing element in this 3×3 matrix sequence.',
    subPrompt: 'Look at the progression across rows and columns. What completes the bottom-right cell?',
    type: 'matrix-puzzle',
    matrixSvg: `
      <svg viewBox="0 0 300 300" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" rx="12" fill="#0f172a" stroke="#334155" stroke-width="3"/>
        <line x1="100" y1="0" x2="100" y2="300" stroke="#334155" stroke-width="2"/>
        <line x1="200" y1="0" x2="200" y2="300" stroke="#334155" stroke-width="2"/>
        <line x1="0" y1="100" x2="300" y2="100" stroke="#334155" stroke-width="2"/>
        <line x1="0" y1="200" x2="300" y2="200" stroke="#334155" stroke-width="2"/>
        
        <!-- Row 1: 1 circle, 2 circles, 3 circles -->
        <circle cx="50" cy="50" r="14" fill="#6366f1"/>
        
        <circle cx="140" cy="50" r="14" fill="#6366f1"/>
        <circle cx="160" cy="50" r="14" fill="#6366f1"/>

        <circle cx="230" cy="50" r="12" fill="#6366f1"/>
        <circle cx="250" cy="50" r="12" fill="#6366f1"/>
        <circle cx="270" cy="50" r="12" fill="#6366f1"/>

        <!-- Row 2: 1 square, 2 squares, 3 squares -->
        <rect x="36" y="136" width="28" height="28" rx="4" fill="#06b6d4"/>

        <rect x="126" y="136" width="22" height="22" rx="3" fill="#06b6d4"/>
        <rect x="152" y="136" width="22" height="22" rx="3" fill="#06b6d4"/>

        <rect x="220" y="138" width="18" height="18" rx="2" fill="#06b6d4"/>
        <rect x="242" y="138" width="18" height="18" rx="2" fill="#06b6d4"/>
        <rect x="264" y="138" width="18" height="18" rx="2" fill="#06b6d4"/>

        <!-- Row 3: 1 triangle, 2 triangles, ? -->
        <polygon points="50,132 35,160 65,160" transform="translate(0, 80)" fill="#a855f7"/>

        <polygon points="135,132 122,158 148,158" transform="translate(0, 80)" fill="#a855f7"/>
        <polygon points="165,132 152,158 178,158" transform="translate(0, 80)" fill="#a855f7"/>

        <!-- Target Question Mark -->
        <rect x="204" y="204" width="92" height="92" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-dasharray="6,4" stroke-width="2"/>
        <text x="250" y="260" font-family="Space Grotesk, sans-serif" font-size="44" font-weight="700" fill="#a5b4fc" text-anchor="middle">?</text>
      </svg>
    `,
    options: [
      {
        id: 1,
        text: '3 Triangles',
        svgContent: `
          <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="25,32 12,58 38,58" fill="#a855f7"/>
            <polygon points="50,32 37,58 63,58" fill="#a855f7"/>
            <polygon points="75,32 62,58 88,58" fill="#a855f7"/>
          </svg>
        `
      },
      {
        id: 2,
        text: '2 Triangles & 1 Circle',
        svgContent: `
          <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,32 17,58 43,58" fill="#a855f7"/>
            <circle cx="55" cy="46" r="12" fill="#6366f1"/>
            <polygon points="80,32 67,58 93,58" fill="#a855f7"/>
          </svg>
        `
      },
      {
        id: 3,
        text: '3 Squares',
        svgContent: `
          <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="38" width="20" height="20" rx="3" fill="#06b6d4"/>
            <rect x="40" y="38" width="20" height="20" rx="3" fill="#06b6d4"/>
            <rect x="65" y="38" width="20" height="20" rx="3" fill="#06b6d4"/>
          </svg>
        `
      },
      {
        id: 4,
        text: '4 Triangles',
        svgContent: `
          <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="20,36 10,54 30,54" fill="#a855f7"/>
            <polygon points="40,36 30,54 50,54" fill="#a855f7"/>
            <polygon points="60,36 50,54 70,54" fill="#a855f7"/>
            <polygon points="80,36 70,54 90,54" fill="#a855f7"/>
          </svg>
        `
      }
    ],
    correctOptionId: 1,
    difficulty: 1,
    explanation: 'Each row maintains the same geometric polygon shape while incrementing the count from 1 to 2 to 3.'
  },
  {
    id: 2,
    category: 'spatial-reasoning',
    categoryLabel: 'Spatial Reasoning',
    prompt: 'Which 3D unfolded cube net correctly matches the folded dice cube shown on the left?',
    subPrompt: 'Notice the relative orientation of adjacent faces (Star, Circle, Diamond).',
    type: 'spatial-rotation',
    matrixSvg: `
      <svg viewBox="0 0 300 240" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <!-- Isometric 3D Cube -->
        <g transform="translate(60, 40) scale(1.1)">
          <!-- Top face -->
          <polygon points="80,10 140,40 80,70 20,40" fill="#312e81" stroke="#818cf8" stroke-width="2"/>
          <circle cx="80" cy="40" r="12" fill="#67e8f9"/>

          <!-- Left face -->
          <polygon points="20,40 80,70 80,140 20,110" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
          <!-- Star on Left -->
          <polygon points="50,80 54,90 64,91 56,98 59,108 50,102 41,108 44,98 36,91 46,90" fill="#fbbf24"/>

          <!-- Right face -->
          <polygon points="80,70 140,40 140,110 80,140" fill="#172554" stroke="#818cf8" stroke-width="2"/>
          <!-- Diamond on Right -->
          <polygon points="110,80 122,92 110,104 98,92" fill="#f43f5e"/>
        </g>
      </svg>
    `,
    options: [
      {
        id: 1,
        text: 'Pattern A (Adjacent Circle top, Star left, Diamond right)',
        svgContent: `
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="45" y="10" width="30" height="30" fill="#312e81" stroke="#818cf8"/>
            <circle cx="60" cy="25" r="7" fill="#67e8f9"/>
            
            <rect x="15" y="40" width="30" height="30" fill="#1e1b4b" stroke="#818cf8"/>
            <polygon points="30,47 32,54 39,55 33,60 35,67 30,62 25,67 27,60 21,55 28,54" fill="#fbbf24" transform="scale(0.8) translate(8, 8)"/>

            <rect x="45" y="40" width="30" height="30" fill="#0f172a" stroke="#818cf8"/>

            <rect x="75" y="40" width="30" height="30" fill="#172554" stroke="#818cf8"/>
            <polygon points="90,47 98,55 90,63 82,55" fill="#f43f5e"/>

            <rect x="45" y="70" width="30" height="30" fill="#0f172a" stroke="#818cf8"/>
          </svg>
        `
      },
      {
        id: 2,
        text: 'Pattern B (Opposite Star & Diamond)',
        svgContent: `
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="45" y="10" width="30" height="30" fill="#1e1b4b" stroke="#818cf8"/>
            <polygon points="60,17 62,24 69,25 63,30 65,37 60,32 55,37 57,30 51,25 58,24" fill="#fbbf24" transform="scale(0.8) translate(15, 2)"/>
            
            <rect x="45" y="40" width="30" height="30" fill="#312e81" stroke="#818cf8"/>
            <circle cx="60" cy="55" r="7" fill="#67e8f9"/>

            <rect x="45" y="70" width="30" height="30" fill="#172554" stroke="#818cf8"/>
            <polygon points="60,77 68,85 60,93 52,85" fill="#f43f5e"/>
          </svg>
        `
      },
      {
        id: 3,
        text: 'Pattern C (Inverted positions)',
        svgContent: `
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="40" width="30" height="30" fill="#172554" stroke="#818cf8"/>
            <polygon points="30,47 38,55 30,63 22,55" fill="#f43f5e"/>
            
            <rect x="45" y="40" width="30" height="30" fill="#312e81" stroke="#818cf8"/>
            <polygon points="60,47 62,54 69,55 63,60 65,67 60,62 55,67 57,60 51,55 58,54" fill="#fbbf24" transform="scale(0.8) translate(15, 8)"/>

            <rect x="75" y="40" width="30" height="30" fill="#1e1b4b" stroke="#818cf8"/>
            <circle cx="90" cy="55" r="7" fill="#67e8f9"/>
          </svg>
        `
      },
      {
        id: 4,
        text: 'Pattern D (Disconnected vertices)',
        svgContent: `
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="10" width="30" height="30" fill="#312e81" stroke="#818cf8"/>
            <circle cx="30" cy="25" r="7" fill="#67e8f9"/>
            <rect x="75" y="70" width="30" height="30" fill="#f43f5e" stroke="#818cf8"/>
          </svg>
        `
      }
    ],
    correctOptionId: 1,
    difficulty: 2,
    explanation: 'When Pattern A is folded upward along the center cross, the Star folds to the left lateral face and the Diamond folds to the right lateral face, perfectly aligning with the top circle.'
  },
  {
    id: 3,
    category: 'numerical-logic',
    categoryLabel: 'Numerical Aptitude',
    prompt: 'What number replaces the question mark in this sequence?',
    subPrompt: '3  →  7  →  15  →  31  →  63  →  ?',
    type: 'number-sequence',
    options: [
      { id: 1, text: '95' },
      { id: 2, text: '127' },
      { id: 3, text: '128' },
      { id: 4, text: '144' }
    ],
    correctOptionId: 2,
    difficulty: 2,
    explanation: 'Each step follows the mathematical progression: (n × 2) + 1. Specifically: (63 × 2) + 1 = 127. Alternatively, adding powers of 2 (+4, +8, +16, +32, +64) yields 63 + 64 = 127.'
  },
  {
    id: 4,
    category: 'pattern-recognition',
    categoryLabel: 'Pattern Recognition',
    prompt: 'Determine the missing quadrant based on rotation and overlay rules.',
    subPrompt: 'Each clockwise step rotates the inner arrow 90° while inverting outer corner dots.',
    type: 'matrix-puzzle',
    matrixSvg: `
      <svg viewBox="0 0 300 300" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" rx="14" fill="#0a0f1d" stroke="#334155" stroke-width="3"/>
        <line x1="150" y1="0" x2="150" y2="300" stroke="#334155" stroke-width="2"/>
        <line x1="0" y1="150" x2="300" y2="150" stroke="#334155" stroke-width="2"/>
        
        <!-- Q1 (Top-Left): Arrow pointing Up (0 deg), 1 dot -->
        <g transform="translate(75, 75)">
          <circle cx="-45" cy="-45" r="8" fill="#f59e0b"/>
          <line x1="0" y1="35" x2="0" y2="-30" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/>
          <polygon points="0,-45 -18,-20 18,-20" fill="#6366f1"/>
        </g>

        <!-- Q2 (Top-Right): Arrow pointing Right (90 deg), 2 dots -->
        <g transform="translate(225, 75)">
          <circle cx="45" cy="-45" r="8" fill="#f59e0b"/>
          <circle cx="-45" cy="-45" r="8" fill="#f59e0b"/>
          <line x1="-35" y1="0" x2="30" y2="0" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/>
          <polygon points="45,0 20,-18 20,18" fill="#6366f1"/>
        </g>

        <!-- Q3 (Bottom-Left): Arrow pointing Left (270 deg), 4 dots -->
        <g transform="translate(75, 225)">
          <circle cx="-45" cy="-45" r="8" fill="#f59e0b"/>
          <circle cx="45" cy="-45" r="8" fill="#f59e0b"/>
          <circle cx="-45" cy="45" r="8" fill="#f59e0b"/>
          <circle cx="45" cy="45" r="8" fill="#f59e0b"/>
          <line x1="35" y1="0" x2="-30" y2="0" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/>
          <polygon points="-45,0 -20,-18 -20,18" fill="#6366f1"/>
        </g>

        <!-- Q4 (Bottom-Right Target): Arrow pointing Down (180 deg) with 3 dots -->
        <rect x="156" y="156" width="138" height="138" rx="8" fill="#1e1b4b" stroke="#06b6d4" stroke-dasharray="8,6" stroke-width="2"/>
        <text x="225" y="240" font-family="Space Grotesk, sans-serif" font-size="54" font-weight="700" fill="#67e8f9" text-anchor="middle">?</text>
      </svg>
    `,
    options: [
      {
        id: 1,
        text: 'Arrow Down with 3 Corner Dots',
        svgContent: `
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="5" fill="#f59e0b"/>
            <circle cx="80" cy="20" r="5" fill="#f59e0b"/>
            <circle cx="20" cy="80" r="5" fill="#f59e0b"/>
            <line x1="50" y1="25" x2="50" y2="65" stroke="#6366f1" stroke-width="5" stroke-linecap="round"/>
            <polygon points="50,78 38,62 62,62" fill="#6366f1"/>
          </svg>
        `
      },
      {
        id: 2,
        text: 'Arrow Right with 3 Corner Dots',
        svgContent: `
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="5" fill="#f59e0b"/>
            <circle cx="80" cy="20" r="5" fill="#f59e0b"/>
            <circle cx="80" cy="80" r="5" fill="#f59e0b"/>
            <line x1="25" y1="50" x2="65" y2="50" stroke="#6366f1" stroke-width="5" stroke-linecap="round"/>
            <polygon points="78,50 62,38 62,62" fill="#6366f1"/>
          </svg>
        `
      },
      {
        id: 3,
        text: 'Arrow Up with 2 Dots',
        svgContent: `
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="5" fill="#f59e0b"/>
            <circle cx="80" cy="80" r="5" fill="#f59e0b"/>
            <line x1="50" y1="75" x2="50" y2="35" stroke="#6366f1" stroke-width="5" stroke-linecap="round"/>
            <polygon points="50,22 38,38 62,38" fill="#6366f1"/>
          </svg>
        `
      },
      {
        id: 4,
        text: 'Arrow Diagonal with 4 Dots',
        svgContent: `
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="25" y1="25" x2="65" y2="65" stroke="#6366f1" stroke-width="5" stroke-linecap="round"/>
            <polygon points="75,75 58,72 72,58" fill="#6366f1"/>
          </svg>
        `
      }
    ],
    correctOptionId: 1,
    difficulty: 3,
    explanation: 'The progression cycles through 0° (Up), 90° (Right), 180° (Down), and 270° (Left). The count of corner yellow dots sequentially increments: 1, 2, 3, 4.'
  },
  {
    id: 5,
    category: 'deductive-analysis',
    categoryLabel: 'Deductive Logic',
    prompt: 'Solve the deductive rule equation:',
    subPrompt: 'If ⬡ + ⬡ = 16, and ⬡ + ▲ = 13, and ▲ × ■ = 15, then: ■ + (⬡ × ▲) = ?',
    type: 'logic-grid',
    options: [
      { id: 1, text: '43' },
      { id: 2, text: '41' },
      { id: 3, text: '48' },
      { id: 4, text: '35' }
    ],
    correctOptionId: 1,
    difficulty: 3,
    explanation: '1) 2⬡ = 16 ⇒ ⬡ = 8. 2) 8 + ▲ = 13 ⇒ ▲ = 5. 3) 5 × ■ = 15 ⇒ ■ = 3. 4) ■ + (⬡ × ▲) = 3 + (8 × 5) = 3 + 40 = 43.'
  },
  {
    id: 6,
    category: 'working-memory',
    categoryLabel: 'Working Memory',
    prompt: 'Dual Cognitive Matrix: Which shape combination preserves both the column-sum rule and the color symmetry?',
    subPrompt: 'Each column sums to 12 total vertices. Each row maintains 1 Blue, 1 Cyan, and 1 Violet element.',
    type: 'matrix-puzzle',
    matrixSvg: `
      <svg viewBox="0 0 300 300" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" rx="14" fill="#0d1322" stroke="#334155" stroke-width="3"/>
        <line x1="100" y1="0" x2="100" y2="300" stroke="#334155" stroke-width="2"/>
        <line x1="200" y1="0" x2="200" y2="300" stroke="#334155" stroke-width="2"/>
        <line x1="0" y1="100" x2="300" y2="100" stroke="#334155" stroke-width="2"/>
        <line x1="0" y1="200" x2="300" y2="200" stroke="#334155" stroke-width="2"/>

        <!-- Row 1: Triangle(3, Blue), Square(4, Cyan), Pentagon(5, Violet) -> sum=12 -->
        <polygon points="50,30 30,70 70,70" fill="#6366f1"/>
        <rect x="135" y="35" width="30" height="30" rx="3" fill="#06b6d4"/>
        <polygon points="250,30 268,46 261,70 239,70 232,46" fill="#a855f7"/>

        <!-- Row 2: Hexagon(6, Cyan), Triangle(3, Violet), Triangle(3, Blue) -->
        <polygon points="50,130 68,140 68,160 50,170 32,160 32,140" fill="#06b6d4"/>
        <polygon points="150,130 130,170 170,170" fill="#a855f7"/>
        <polygon points="250,130 230,170 270,170" fill="#6366f1"/>

        <!-- Row 3: Triangle(3, Violet), Pentagon(5, Blue), ? -->
        <polygon points="50,230 30,270 70,270" fill="#a855f7"/>
        <polygon points="150,230 168,246 161,270 139,270 132,246" fill="#6366f1"/>

        <!-- Col 3: Row1=5, Row2=3. Total needed=12 -> 12 - 8 = 4 vertices (Square) -->
        <!-- Row 3 colors: Violet, Blue, needed = Cyan -->
        <rect x="204" y="204" width="92" height="92" rx="8" fill="#1e1b4b" stroke="#a855f7" stroke-dasharray="6,4" stroke-width="2"/>
        <text x="250" y="260" font-family="Space Grotesk, sans-serif" font-size="44" font-weight="700" fill="#c084fc" text-anchor="middle">?</text>
      </svg>
    `,
    options: [
      {
        id: 1,
        text: 'Cyan Square (4 vertices)',
        svgContent: `
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="35" width="30" height="30" rx="3" fill="#06b6d4"/>
          </svg>
        `
      },
      {
        id: 2,
        text: 'Blue Hexagon (6 vertices)',
        svgContent: `
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,30 68,40 68,60 50,70 32,60 32,40" fill="#6366f1"/>
          </svg>
        `
      },
      {
        id: 3,
        text: 'Violet Square (4 vertices)',
        svgContent: `
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="35" width="30" height="30" rx="3" fill="#a855f7"/>
          </svg>
        `
      },
      {
        id: 4,
        text: 'Cyan Pentagon (5 vertices)',
        svgContent: `
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,30 68,46 61,70 39,70 32,46" fill="#06b6d4"/>
          </svg>
        `
      }
    ],
    correctOptionId: 1,
    difficulty: 4,
    explanation: 'Column 3 vertices: Row 1 is a Pentagon (5) + Row 2 is a Triangle (3) = 8. To reach the required column sum of 12 vertices, 4 vertices (Square) are required. In Row 3, Violet and Blue are present, so Cyan completes the color Latin square.'
  },
  {
    id: 7,
    category: 'spatial-reasoning',
    categoryLabel: 'Spatial Reasoning',
    prompt: 'Topological Venn Deduction: Which region contains elements that are inside the Circle and Triangle, but outside the Square?',
    subPrompt: 'Identify the exact zone marked by intersecting geometric perimeters.',
    type: 'logic-grid',
    matrixSvg: `
      <svg viewBox="0 0 300 240" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="240" rx="12" fill="#0b1120" stroke="#334155" stroke-width="2"/>
        
        <!-- Circle -->
        <circle cx="120" cy="120" r="75" fill="none" stroke="#6366f1" stroke-width="4"/>
        
        <!-- Triangle -->
        <polygon points="170,40 80,190 260,190" fill="none" stroke="#06b6d4" stroke-width="4"/>

        <!-- Square -->
        <rect x="130" y="80" width="80" height="80" fill="none" stroke="#f43f5e" stroke-width="4"/>

        <!-- Labels -->
        <text x="110" y="70" fill="#a5b4fc" font-size="16" font-weight="700">A</text>
        <text x="120" y="145" fill="#67e8f9" font-size="18" font-weight="700">Zone X</text>
        <text x="170" y="125" fill="#fca5a5" font-size="16" font-weight="700">B</text>
        <text x="210" y="175" fill="#fca5a5" font-size="16" font-weight="700">C</text>
      </svg>
    `,
    options: [
      { id: 1, text: 'Zone X' },
      { id: 2, text: 'Region A' },
      { id: 3, text: 'Region B' },
      { id: 4, text: 'Region C' }
    ],
    correctOptionId: 1,
    difficulty: 3,
    explanation: 'Zone X lies inside the perimeter of the blue circle, inside the cyan triangle, and completely to the left exterior of the red square.'
  },
  {
    id: 8,
    category: 'deductive-analysis',
    categoryLabel: 'Deductive Logic',
    prompt: 'Logical Syllogism: Which conclusion must be true without exception?',
    subPrompt: 'Premise 1: All quantum processors are non-linear systems. Premise 2: Some cryptographic engines are quantum processors. Premise 3: No mechanical clock is a non-linear system.',
    type: 'logic-grid',
    options: [
      { id: 1, text: 'Some cryptographic engines are non-linear systems.' },
      { id: 2, text: 'All cryptographic engines are non-linear systems.' },
      { id: 3, text: 'No cryptographic engine is a mechanical clock.' },
      { id: 4, text: 'All non-linear systems are quantum processors.' }
    ],
    correctOptionId: 1,
    difficulty: 4,
    explanation: 'Since some cryptographic engines are quantum processors, and all quantum processors are non-linear systems, those cryptographic engines must also be non-linear systems (Darii syllogistic form).'
  }
];
