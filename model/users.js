const mongooose = require("mongoose");
const awsuserSchema = new mongooose.Schema({
  username: {
    type: String,

  },
  name: {
    type: String,

  },
  email: {
    type: String

  },
  role: {
    type: String

  }

});
const AWSUser = mongooose.model("aws", awsuserSchema);
module.exports = AWSUser;
