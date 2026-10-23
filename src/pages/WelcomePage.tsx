import type { CharacterState, ProposalConfig } from '../types';
import ProposalCard from '../components/ProposalCard';

interface Props {
  config: ProposalConfig;
  mood: CharacterState;
  onYes: () => void;
  onRefuse: () => void;
  onDodge: () => void;
  onHoverYes: () => void;
  reducedMotion?: boolean;
}

export default function WelcomePage(props: Props) {
  return <ProposalCard {...props} />;
}