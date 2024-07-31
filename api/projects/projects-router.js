// Write your "projects" router here!
const express = require('express')


const {validateProjectId, validateProject} = require("./projects-middleware")

const Project = require("./projects-model")

const router = express.Router()



router.get("/", (req, res) => {
    Project.get()
    .then(projects => {
        res.json(projects)
    })
})
router.get("/:id", validateProjectId, (req, res) => {
    res.json(req.project)
})
router.post("/", validateProject, (req, res) => {
    Project.insert({name: req.name, description: req.description, completed: true})
    .then(newProject => {
        res.json(newProject)
    })
})
router.put("/:id", validateProjectId, validateProject,  (req, res) => {
    if(!req.body.completed){
        res.status(400)
    }
    try{
      Project.update(req.params.id, {name: req.name, description: req.description, completed: req.body.completed})
        .then(updatedProject => {
         return Project.get(req.params.id)
         })
         .then(project => {
            res.json(project)
         })
    }catch(err){

    }
})
router.delete("/:id", validateProjectId, async(req, res) => {
    try{
        const result = await Project.remove(req.params.id)
        res.json(result)
    }catch(err){

    }
    
})
router.get("/:id/actions", validateProjectId, async(req, res) => {
    console.log(req.project)
    try{
        const result = await Project.getProjectActions(req.params.id)
        res.json(result)
    }catch(err){

    }
})

module.exports = router