const Account = require("../model/account");

/**
 * Route for logging in.
 */
app.post('/login', async (req, res) => {
    try {
      const data = await Account.login(req);
      if(!data){
        res.json(false);
      }else{
        res.cookie('jwt', data.token, { httpOnly: true, domain: 'localhost' });
        res.json(true);
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Could not login' });
    }
  });
  
  /**
   * Route for creating a new account.
   */
  app.post('/createAccount', async (req, res) => {
    try {
      const data = await Account.createAccount(req);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });