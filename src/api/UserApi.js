const Application = require("./model/application");
/**
 * Route to create a new applications.
 */
app.post('/createNewApplication', async (req, res) => {
    if(req.user.role !== 2){
      res.status(401).json({ error: 'Unauthorized' });
    }else{
      try {
        const data = await Application.submitApplication(req)
        console.log("server" + data)
        res.json(data)
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });