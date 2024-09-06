import express from "express";
import {getAllConcepts, getConceptByID, createConceptByID, deleteConceptByID, updateConceptByID} from '../controllers/controller'
const router = express.Router();

router.route("/")
// GET all the concepts
.get(getAllConcepts)
// Create a new concept: only allowed with header(x-role: admin)
.post(createConceptByID)
// Update concept: only allowed with header(x-role: admin)
.put(updateConceptByID)

router.route("/:id")
// GET a specific concept based on `id`
.get(getConceptByID)
// Delete concept: only allowed with header(x-role: admin)
.delete(deleteConceptByID)



module.exports = router;