const jobs = require('../models/jobModel')

exports.addJobs = async (req, res) => {
    console.log("Inside addJobController");
    const { title, location, jobType, salary, qualification, experience, description } = req.body

    

    console.log(req.body);

    try {
        const existingJob = await jobs.findOne({ title, location })
        console.log(existingJob);
        
        if (existingJob) {
            res.status(401).json("Job already existing...")
        }
        else {
            const newJob = new jobs({
                title, location, jobType, salary, qualification, experience, description
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
    }
    catch (err) {
        res.status(500).json("Err" + err)
    }
}

exports.getAllJobs = async(req, res)=>{
    try {
    const getjobs = await jobs.find()
    res.status(200).json(getjobs);
  } catch (err) {
    res.status(500).json("Err" + err)
  }       
}

exports.deleteJobs = async(req, res)=>{
    const {id} = req.params
    try {
    await jobs.findByIdAndDelete({id})
    res.status(200).json("Jobs Deleted...");
  } catch (err) {
    res.status(500).json("Err" + err)
  }       
}