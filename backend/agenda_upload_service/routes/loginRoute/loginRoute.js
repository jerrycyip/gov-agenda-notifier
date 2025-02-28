const { Router } = require("express");
const dbClient = require("../../db/dbClient.js");
const { comparePassword } = require("../../utilities/auth.js");

function loginRoute(logger) {
  const router = Router();
  router.post("/login", async function (req, res) {
    const client = await dbClient(logger);
    const { username, password } = req.body;
    try {
      const dbUser = await client.getAccountByEmail(username);
      if (dbUser.rows.length === 0) {
        console.log("Email does not match our records please sign up");
        throw new Error("Email does not match our records please sign up");
      }
      const dbPassword = dbUser.rows[0].password;
      if (!dbPassword) {
        console.log("Sign in with your Google or Microsoft account");
        throw new Error("Sign in with your Google or Microsoft account");
      }
      const isAuthenticated = await comparePassword(password, dbPassword);
      if (!isAuthenticated) {
        console.log("Email and Password do not match");
        throw new Error("Email and Password do not match");
      }
      user = dbUser.rows[0];
    } catch (e) {
      console.log(`Cannot authenticate email and password: ${e}`);
      throw new Error(e);
    }
    // finally end db connection
    finally {
      client.end();
    }
    res.status(200).json({ user });
  });

  return router;
}
module.exports = {
  loginRoute,
};
