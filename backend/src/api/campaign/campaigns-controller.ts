import { ConnectionsManager } from "../../ConnectionsManager";
import { Campaign } from "../../core/models/campaign/campaign-model";
import { normalizeString } from "../../stringNormalizer";

const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");

/**
 * Function to get all campaigns in the database
 * @returns returns a list of all campaign
 */
export async function getAllCampaigns() {
  return await CampaignModel().find({});
}

/**
 * Creates a new campaign
 * @param campaign campaign to create
 * @returns return the created campaign if no other campaign with the same id exists, otherwise throws an error
 */
export async function createCampaign(campaign: Campaign) {
  let id = normalizeString(campaign.name);
  const matchingNames = await CampaignModel().find({ name: campaign.name });
  const matchingId = await CampaignModel().findById(id);
  if (matchingNames.length > 0 || matchingId) return;
  // Set the id and creation_date
  return await CampaignModel().create({ _id: id, ...campaign });
}

/**
 * Get the details of the campaign
 * @param id campaign id to get details of
 * @returns Details of the campaign
 */
export async function getCampaignDetails(id: string) {
  return await CampaignModel().findById(id);
}

/**
 * Update one campaign
 * @param id id of the campaign to update
 * @param campaign new data of the campaign
 * @returns the updated campaign data
 */
export async function updateCampaign(id: string, campaign: Campaign) {
  return await CampaignModel().findByIdAndUpdate(id, campaign, {
    new: true,
  });
}

/**
 * delete one campaign by id
 * @param id id of the campaign to delete
 */
export async function deleteCampaign(id: string) {
  return await CampaignModel().findByIdAndDelete(id);
}

/**
 * Load one campaign database
 * @param id id of the campaign to load
 * @returns the data of the campaign loaded
 */
export async function loadCampaign(id: string) {
  let campaign = (await getCampaignDetails(id)) as Campaign;
  if (!campaign) return campaign;
  let connected = await ConnectionsManager.Instance.connectCampaign(campaign);
  return campaign;
}

export async function getLoadedCampaign() {
  return ConnectionsManager.Instance.campaign;
}
