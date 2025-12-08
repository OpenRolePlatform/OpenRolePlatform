export interface Token {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface MapType {
  _id: string;
  name: string;
  width: number;
  height: number;
  tokens: Token[];
  campaignId?: string;
}
