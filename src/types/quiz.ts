export interface QuestionOption {
  id: number;
  label?: string;
  svgContent?: string;
  text?: string;
}

export type AssessmentType = 'standard-iq' | 'ai-quotient';

export type CognitiveCategory = 
  | 'pattern-recognition' 
  | 'spatial-reasoning' 
  | 'numerical-logic' 
  | 'deductive-analysis' 
  | 'working-memory';

export type AIQCategory =
  | 'prompt-engineering'      // Prompt crafting, few-shot, system steering
  | 'critical-evaluation'    // Hallucination detection, fact verification, bias identification
  | 'agentic-delegation'     // Autonomous loops, tool use, human-in-the-loop task splitting
  | 'context-synthesis'      // Context window mechanics, retrieval, token reasoning
  | 'ethical-alignment';     // Safety, privacy, adversarial injection defense

export interface Question {
  id: number;
  assessmentType?: AssessmentType; // Defaults to standard-iq if omitted
  category: CognitiveCategory | AIQCategory;
  categoryLabel: string;
  prompt: string;
  subPrompt?: string;
  type: 'matrix-puzzle' | 'number-sequence' | 'logic-grid' | 'spatial-rotation' | 'scenario-analysis';
  matrixSvg?: string;
  options: QuestionOption[];
  correctOptionId: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  explanation: string;
}

export interface UserAnswer {
  questionId: number;
  selectedOptionId: number | null;
  timeSpentSeconds: number;
  isFlagged?: boolean;
}

export interface CognitiveScoreResult {
  assessmentType: AssessmentType;
  iqScore: number; // For Standard IQ or AIQ index (mean 100, SD 15, range 85 - 150)
  percentile: number;
  statusTitle: string; // e.g. "Frontier AI Orchestrator", "Superior Cognitive Agility"
  correctCount: number;
  totalQuestions: number;
  completionTimeSeconds: number;
  categoryBreakdown: {
    category: string;
    label: string;
    score: number;
    rating: string;
    description: string;
  }[];
  certificateId: string;
  completedAt: string;
  userName: string;
}
