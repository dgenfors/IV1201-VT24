const Application = require("./model/application");
/**
 * Route for retrieving all applications.
 */
app.get('/allApplications', async (req, res) => {
    if(req.user.role !== 1){
      res.status(401).json({ error: 'Unauthorized' });
    }else{
      try {
        const data = await Application.listAllApplications(req);
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
   
  });