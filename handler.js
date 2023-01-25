
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
mongoose.set('strictQuery', false);
const AWSUser = require('./model/users')
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGODB_CONNECTED 😍😍😍😍😍"))
  .catch((err) => console.log(err));



// Create a posts
module.exports.createPost = async (event, context, callback) => {
  const reqBody = JSON.parse(event.body)
  const name = reqBody.name;
  const username = reqBody.username;
  const email = reqBody.email;
  const role = reqBody.role;
  const NewUser = new AWSUser({
    name,
    username,
    email,
    role
  });
  const UserSaved = await NewUser.save();
  if (UserSaved) {
    const response = {
      "statusCode": 200,
      "message": "USER_SAVED_"

    };
    return response;

  } else {
    const response = {
      "statusCode": 400,
      " message": "USER_NOT_SAVED",
    };
    return response;

  }

};
// Get all posts
module.exports.getAllPosts = async (event, context, callback) => {
  const users = await AWSUser.find({})
  if (users.length === 0) {
    return {
      "statusCode": 404,
      "check": 404,
      "body": []
    }
  } else {
    return {
      "statusCode": 200,
      "check": 200,
      "body": users
    }
  }



};
module.exports.updatePost = async (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  const getUser = await AWSUser.findById({ _id: ObjectId(reqBody.id) });
  getUser.username = reqBody.username;
  getUser.name = reqBody.name;
  getUser.email = reqBody.email;
  getUser.role = reqBody.role;
  const edited = await getUser.save();
  if (edited)
    return {

      "statusCode": 200,
      "message": "USER_EDITED",
    }
  else
    return {
      "statusCode": 400,
      "message": "USER_NOT_EDITED",
    }
}
module.exports.deletePost = async (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const res = await AWSUser.findByIdAndDelete({ _id: ObjectId(reqBody.id) });
  return {
    "statusCode": 200,
    "message": "USER_DELETED",

  }

}

