import {Request, Response, NextFunction} from 'express';
import {connectionPool} from '../config/db';
import {OntologyConcept} from '../models/concept-interface'
import { validate } from '../util/data-validation';

//  GET all concepts in the database on-man
export const getAllConcepts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`INFO: get all concepts in the database`);
        const sql: string = "SELECT ID, parent, child, alternateName, concept FROM `clinical-concept`;"
        let result = await connectionPool.execute(sql);
        res.status(200).json(result[0]);
    } catch (error) {
        next(error);
    }
  };



//  GET a specific concept in the database on-man
export const getConceptByID = async (req: Request, res: Response, next: NextFunction) => {
try {
    console.log(`INFO: get concept: ${req.params.id} in the database`);
    const sql: string = "SELECT ID, parent, child, alternateName, concept FROM `clinical-concept` where ID = " + req.params.id + ";"
    let result = await connectionPool.execute(sql);
    
    if (JSON.stringify(result[0]) == "[]") {
        res.status(201).json({
            "description": "No records found for the ID: " + req.params.id + " specified in the database"
        })
    }
    else res.status(200).json(result[0]);
} catch (error) {
    next(error);
}
};

//   POST a concept in the database on-man
export const createConceptByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // only allow admin to perform create
        if (req.headers['x-role'] != 'admin') {
            console.log(`INFO: unauthorized attempt to create concept: ${req.body.ID}`);
            res.status(401).json({
                "message": "User Unauthorized"
            });
            return;
        }
        
        const concept:OntologyConcept = {
            id: req.body.ID,
            concept: req.body.concept,
            parent: req.body.parent,
            child: req.body.child,
            alternateName: req.body.alternateName
        }

        let isValid = await validate(req);
        if ( isValid == false) {
            console.log(`INFO: data validation error for concept: ${req.body.ID}`);
            res.status(501).json({
                "message": "Data validation error"
            });
            return;
        }

        console.log(`INFO: create concept ${concept.id} in the database`);
        // const concept: Concept = new Concept(conceptObj);
        const sql: string = "INSERT INTO `clinical-concept` (ID, concept, parent, child, alternateName) VALUES(" + `'${concept.id}', '${concept.concept}', '${concept.parent}', '${concept.child}', '${concept.alternateName}');`
        let result = await connectionPool.execute(sql);
        res.status(200).json(result[0]);
    } catch (error) {
        next(error);
    }
};


//   PUT an existing concept in the database on-man
export const updateConceptByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // only allow admin to perform update
        if (req.headers['x-role'] != 'admin') {
            console.log(`INFO: unauthorized attempt to update concept: ${req.body.ID}`);
            res.status(401).json({
                "message": "User Unauthorized"
            });
            return;
        }

        let isValid = await validate(req);
        if (isValid == false) {
            console.log(`INFO: data validation error for concept: ${req.body.ID}`);
            res.status(501).json({
                "message": "Data validation error"
            });
            return;
        }
        
        const concept:OntologyConcept = {
            id: req.body.ID,
            concept: req.body.concept,
            parent: req.body.parent,
            child: req.body.child,
            alternateName: req.body.alternateName
        }
        console.log(`INFO: update concept ${concept.id} in the database`);
        const sql: string = "UPDATE `clinical-concept` SET concept = " + `'${concept.concept}'` + ", parent = " + `'${concept.parent}'` + ", child = " + `'${concept.child}'` + ", alternateName = " + `'${concept.alternateName}'` + " WHERE ID = " + `'${concept.id}';`
        let result = await connectionPool.execute(sql);
        res.status(200).json(result[0]);
    } catch (error) {
        next(error);
    }
};


//   DELETE an existing concept in the database on-man
export const deleteConceptByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // only allow admin to perform delete
        if (req.headers['x-role'] != 'admin') {
            console.log(`INFO: unauthorized attempt to delete concept: ${req.params.id}`);
            res.status(401).json({
                "message": "User Unauthorized"
            });
            return;
        }

        console.log(`INFO: delete concept: ${req.params.id} in the database`);
        
        const sql: string = "DELETE FROM `clinical-concept` WHERE ID = " + `'${req.params.id}';`
        let result = await connectionPool.execute(sql);
        res.status(200).json(result[0]);
    } catch (error) {
        next(error);
    }
};
