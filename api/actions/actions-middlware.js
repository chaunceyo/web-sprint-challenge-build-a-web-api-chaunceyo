// add middlewares here related to actions
const Action = require("./actions-model")

async function validateActionId(req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(404).json({message: "action not found"})
        }else{
            req.action= action
            next()
        }
    }catch(err) {
        res.status(500).json({message: "problem finding action"})
    }
}

async function validateAction(req, res, next) {
    const {notes, description} = req.body
    if((!notes || !notes.trim()) || (!description || !description.trim())){
    res.status(400).json({message: "Both notes and description are required"})
    }else{
        req.notes = notes
        req.description = description
        next()
    }
}

module.exports = {validateActionId, validateAction}