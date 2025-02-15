import express from 'express'
import * as taskC from "../controller/taskController.js"

const router = express.Router()

router.get('/tasks',taskC.getAllTask)
router.put('/tasks/:id',taskC.getTaskById)
router.get('/tasks/:id',taskC.getSearchTask)
router.post('/tasks',taskC.postTask)
router.put('/tasks/edit/:id',taskC.editTask)
router.delete('/tasks/:id',taskC.deleteTask)
export default router