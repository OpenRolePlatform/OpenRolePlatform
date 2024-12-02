import { useParams } from 'react-router-dom';
import CampaignDetails from './CampaignDetails';

export default function CampaignDetailsPage() {
  const { campaignID } = useParams();

  return (
    <>{campaignID && <CampaignDetails id={campaignID}></CampaignDetails>}</>
  );
}
