const Application = require("../model/application");
const express = require('express');
const authenticateJWT = require('./authJWT')
const router = express.Router();
/**
 * Everything below this will go through authentication
 */
router.use(authenticateJWT)

router.use((req,res,next) =>{
  if(req.user.role !== 2){
    res.status(401).json({ error: 'Unauthorized' });
  }else{
    next()
  }
})
/**
 * Route to create a new applications.
 */
router.post('/createNewApplication', async (req, res) => {
      try {
        const data = await Application.submitApplication(req)
        console.log("server" + data)
        res.json(data)
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });
module.exports = router