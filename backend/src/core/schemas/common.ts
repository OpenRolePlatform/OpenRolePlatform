export const ReqName = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

export const ReqOwner = {
  type: String,
  ref: "Character",
  require: true,
  index: true,
  unique: false,
};

export const Owner = {
  type: String,
  ref: "Character",
  require: false,
  unique: false,
};

export const ReqBool = {
  type: Boolean,
  require: true,
  default: false,
};

export const ReqString = {
  type: String,
  require: true,
};

export const ReqNumber = {
  type: Number,
  required: true,
  default: 0,
};
