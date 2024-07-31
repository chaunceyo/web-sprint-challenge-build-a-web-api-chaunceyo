// add middlewares here related to projects
const Project = require("./projects-model")

async function validateProjectId(req, res, next) {
    try{
        const project = await Project.get(req.params.id)
        if(!project){
            res.status(404).json({message: "project not found"})
        }else{
            req.project = project
            next()
        }
    }catch(err) {
        res.status(500).json({message: "problem finding project"})
    }
}

async function validateProject(req, res, next) {
        const {name, description} = req.body
        if((!name || !name.trim()) || (!description || !description.trim())){
        res.status(400).json({message: "Both name and description are required"})
        }else{
            req.name = name 
            req.description = description
            next()
        }
}

module.exports = {validateProjectId, validateProject}