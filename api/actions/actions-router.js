// Write your "actions" router here!
const express = require('express')

const {validateActionId, validateAction} = require("./actions-middlware")

const Action = require("./actions-model")

const router = express.Router()

router.get("", (req, res) => {
    Action.get()
    .then(actions => {
        res.json(actions)
    })
})
router.get("/:id", validateActionId,(req, res) => {
    Action.get(req.params.id)
    .then(action => {
        res.json(action)
    })
})
router.post("", validateAction, (req, res) => {
    Action.insert({notes: req.notes, description: req.description, completed: req.body.completed, project_id: req.body.project_id})
    .then(newAction => {
        res.json(newAction)
    })
})
router.put("/:id", validateActionId, validateAction,(req, res) => {
    //look at  projects-router  && REMEMBER project_id!!
    Action.update(req.params.id, {notes: req.notes, description: req.description, completed: req.body.completed})
    .then(updatedAction => {
        res.json(updatedAction)
    })
})
router.delete("/:id", validateActionId, async (req, res,) => {
    try{
        const result = await Action.remove(req.params.id)
        res.json(result)
    }catch(err){
        next(err)
    }
})

module.exports = router