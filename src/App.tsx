import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Butterflies from './components/Butterflies';
import CelebrationEffect from './components/CelebrationEffect';
import FloatingHearts from './components/FloatingHearts';
import FloatingPetals from './components/FloatingPetals';
import { proposalConfig } from './config/proposalConfig';
import { useCharacterState } from './hooks/useCharacterState';
import { useReducedMotion } from './hooks/useReducedMotion';
import DateActivityPage from './pages/DateActivityPage';
import DateTimePage from './pages/DateTimePage';
import FinalMessagePage from './pages/FinalMessagePage';
import ProposalPage from './pages/ProposalPage';
import ResponsePage from './pages/ResponsePage';
import WelcomePage from './pages/WelcomePage';
import type { ProposalAnswers, Step } from './types';

export default function App() {
  const config = proposalConfig;
  const reducedMotion = useReducedMotion();

  const [step, setStep] = useState<Step>('welcome');
  const [answers, setAnswers] = useState<ProposalAnswers>({ activityId: null, timeId: null });
  const [celebrating, setCelebrating] = useState(false);

  const { state: mood, flash, setBaseState } = useCharacterState('idle');

  useEffect(() => {
    setBaseState(step === 'welcome' ? 'idle' : 'happy');
  }, [step, setBaseState]);

  useEffect(() => {
    if (!celebrating) return;
    const t = setTimeout(() => setCelebrating(false), 5200);
    return () => clearTimeout(t);
  }, [celebrating]);

  const handleYes = useCallback(() => {
    setCelebrating(true);
    flash('celebration', 6000);
    setStep('proposal');
  }, [flash]);

  const handleRefuse = useCallback(() => {
    setStep('refusal');
    setBaseState('happy');
  }, [setBaseState]);

  const handleRestart = useCallback(() => {
    setAnswers({ activityId: null, timeId: null });
    setCelebrating(false);
    setStep('welcome');
    setBaseState('idle');
  }, [setBaseState]);

  const activity = config.activity.options.find((o) => o.id === answers.activityId) ?? null;
  const time = config.time.options.find((o) => o.id === answers.timeId) ?? null;

  return (
    <main className="anim-bg relative flex min-h-screen w-full items-center justify-center overflow-x-hidden px-3.5 py-8">
      <FloatingHearts count={config.animation.heartCount} />
      <FloatingPetals count={config.animation.petalCount} />
      <Butterflies />
      <CelebrationEffect active={celebrating} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.98 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full justify-center"
        >
          {step === 'welcome' && (
            <WelcomePage
              config={config}
              mood={mood}
              onYes={handleYes}
              onRefuse={handleRefuse}
              onDodge={() => flash('nervous', 1100)}
              onHoverYes={() => flash('hopeful', 900)}
              reducedMotion={reducedMotion}
            />
          )}

          {step === 'proposal' && (
            <ProposalPage config={config} celebrating={celebrating} onContinue={() => setStep('activity')} />
          )}

          {step === 'activity' && (
            <DateActivityPage
              config={config}
              mood={mood}
              selectedId={answers.activityId}
              onSelect={(id) => {
                setAnswers((a) => ({ ...a, activityId: id }));
                flash('excited', 1400);
              }}
              onContinue={() => setStep('time')}
              onHover={() => flash('curious', 800)}
            />
          )}

          {step === 'time' && (
            <DateTimePage
              config={config}
              mood={mood}
              activity={activity}
              selectedId={answers.timeId}
              onSelect={(id) => {
                setAnswers((a) => ({ ...a, timeId: id }));
                flash('hopeful', 1400);
              }}
              onContinue={() => setStep('final')}
              onHover={() => flash('shy', 900)}
            />
          )}

          {step === 'final' && (
            <FinalMessagePage config={config} activity={activity} time={time} onRestart={handleRestart} />
          )}

          {step === 'refusal' && (
            <ResponsePage config={config} onRestart={handleRestart} onReread={() => setStep('welcome')} />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
