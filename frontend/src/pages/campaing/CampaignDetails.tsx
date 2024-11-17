import { useNavigate } from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';
const BREAKPOINTS = { mobile: 0, tablet: 576, desktop: 1280 };

export default function CampaignDetails() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return <></>;
}
