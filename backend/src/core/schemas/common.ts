export const ReqName = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

export const ReqOwner = {
  type: String,
  require: true,
  index: true,
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
