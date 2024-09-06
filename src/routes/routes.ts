import express from "express";
import {getAllConcepts, getConceptByID, createConceptByID} from '../controllers/controller'
const router = express.Router();

router.route("/")
// GET all the concepts
.get(getAllConcepts)
// Create a new concept
.post(createConceptByID)

router.route("/:id")
// GET a specific concept based on `id`
.get(getConceptByID)



module.exports = router;