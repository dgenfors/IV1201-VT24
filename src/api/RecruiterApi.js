const Application = require("../model/application");
const express = require('express');
const authenticateJWT = require('./authJWT')
const router = express.Router();

/**
 * Everything below this will go through authentication
 */
router.use(authenticateJWT);

router.use((req, res, next)=>{
  if(req.user.role !== 1){
    res.status(401).json({ error: 'Unauthorized' });
  }else{
    next()
  }
})
/**
 * Route for retrieving all applications.
 */
router.get('/allApplications', async (req, res) => {
      try {
        const data = await Application.listAllApplications(req);
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
});
module.exports = router;