const express = require('express');
const Account = require("../model/account");

const router = express.Router();

/**
 * Route for logging in.
 */
router.post('/login', async (req, res) => {
  try {
    const data = await Account.login(req);
    if(!data){
      res.json({state: false});
    }else{
      res.cookie('jwt', data.token, { httpOnly: true, domain: 'localhost' });
      res.json({state : true, role_id: data.user.role});
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Could not login' });
  }
});
  
  /**
   * Route for creating a new account.
   */
  router.post('/createAccount', async (req, res) => {
    try {
      const data = await Account.createAccount(req);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;