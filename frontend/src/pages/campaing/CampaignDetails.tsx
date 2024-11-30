import { useNavigate } from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';
import { BREAKPOINTS } from '../../components/Layout';

export default function CampaignDetails() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return <></>;
}
