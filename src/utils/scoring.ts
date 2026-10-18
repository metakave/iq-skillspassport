import { Question, UserAnswer, CognitiveScoreResult, AssessmentType } from '../types/quiz';

export function calculateCognitiveScore(
  questions: Question[],
  answers: UserAnswer[],
  completionTimeSeconds: number,
  userName: string = 'Candidate',
  assessmentType: AssessmentType = 'standard-iq'
): CognitiveScoreResult {
  let weightedPoints = 0;
  let maxPossiblePoints = 0;
  let correctCount = 0;

  // Track dynamic category accuracy
  const categoryStats: Record<string, { total: number; correct: number; label: string }> = {};

  questions.forEach(q => {
    const cat = String(q.category);
    if (!categoryStats[cat]) {
      categoryStats[cat] = { total: 0, correct: 0, label: q.categoryLabel };
    }

    const userAnswer = answers.find(a => a.questionId === q.id);
    const weight = q.difficulty * 1.5;
    maxPossiblePoints += weight;

    categoryStats[cat].total += 1;

    if (userAnswer && userAnswer.selectedOptionId === q.correctOptionId) {
      weightedPoints += weight;
      correctCount += 1;
      categoryStats[cat].correct += 1;
    }
  });

  const accuracyRatio = maxPossiblePoints > 0 ? weightedPoints / maxPossiblePoints : 0;

  // Standardized psychometric index formula (Mean: 100, SD: 15)
  // Base raw score scaled between 85 (low) to 146 (Top Tier)
  let calculatedScore = Math.round(85 + (accuracyRatio * 58));

  // Time agility bonus
  const averageTimePerQuestion = completionTimeSeconds / Math.max(1, questions.length);
  if (averageTimePerQuestion < 45 && accuracyRatio >= 0.75) {
    calculatedScore = Math.min(148, calculatedScore + 3);
  }

  // Gaussian percentile distribution
  const zScore = (calculatedScore - 100) / 15;
  const percentile = Math.min(99.9, Math.max(1, Number((100 / (1 + Math.exp(-1.702 * zScore))).toFixed(1))));

  let statusTitle = 'Competent Baseline';
  if (assessmentType === 'ai-quotient') {
    if (calculatedScore >= 135) {
      statusTitle = 'Frontier AI Architect (Top 1% AIQ)';
    } else if (calculatedScore >= 125) {
      statusTitle = 'Advanced Agentic Orchestrator';
    } else if (calculatedScore >= 115) {
      statusTitle = 'Proficient AI Synthesizer';
    } else if (calculatedScore >= 105) {
      statusTitle = 'Practicing AI Practitioner';
    } else {
      statusTitle = 'Foundational AI Literacy';
    }
  } else {
    if (calculatedScore >= 135) {
      statusTitle = 'Very Superior (Top 1% Tier)';
    } else if (calculatedScore >= 125) {
      statusTitle = 'Superior Cognitive Agility';
    } else if (calculatedScore >= 115) {
      statusTitle = 'High Intellectual Potential';
    } else if (calculatedScore >= 105) {
      statusTitle = 'Above Average Aptitude';
    } else {
      statusTitle = 'Average Cognitive Ability';
    }
  }

  const categoryBreakdown = Object.entries(categoryStats).map(([catKey, stats]) => {
    const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    let rating = 'Developing';
    let description = 'Baseline comprehension demonstrated.';

    if (pct >= 85) {
      rating = 'Mastery';
      description = 'Top tier agility, high fidelity edge case synthesis.';
    } else if (pct >= 60) {
      rating = 'Strong';
      description = 'High competency with consistent deduction and low hallucination susceptibility.';
    } else if (pct >= 40) {
      rating = 'Competent';
      description = 'Solid foundational grasping with opportunity for prompt & verification tuning.';
    }

    return {
      category: catKey,
      label: stats.label,
      score: pct,
      rating,
      description
    };
  });

  const prefix = assessmentType === 'ai-quotient' ? 'AIQ' : 'MYIQ';
  const hash = Math.random().toString(36).substring(2, 6).toUpperCase();
  const certSuffix = Math.floor(1000 + Math.random() * 9000);
  const certificateId = `${prefix}-${hash}-${certSuffix}`;

  return {
    assessmentType,
    iqScore: calculatedScore,
    percentile,
    statusTitle,
    correctCount,
    totalQuestions: questions.length,
    completionTimeSeconds,
    categoryBreakdown,
    certificateId,
    completedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    userName: userName.trim() || 'Verified Candidate'
  };
}
