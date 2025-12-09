const jwt = require("jsonwebtoken");
const fs = require("fs");
const axios = require("axios");
const args = process.argv.slice(2);

var key = fs.readFileSync("./git.pem");

// Create token
var token = jwt.sign(
  {
    iat: Math.floor(Date.now() / 1000),
    // JWT expiration time (30 minute maximum)
    exp: Math.floor(Date.now() / 1000) + 30 * 60,
    iss: args[0],
  },
  key,
  { algorithm: "RS256" }
);

axios
  .post(
    args[1],
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  )
  .then(
    (response) => {
      console.log(response.data.token);
    },
    (error) => {
      console.error(error.response.status);
      console.error(error.response.data);
    }
  );
