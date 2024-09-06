import {Request, Response, NextFunction} from 'express';
import {connection} from '../config/db';
import {OntologyConcept} from '../models/concept-interface'

//  GET all concepts in the database on-man
export const getAllConcepts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`INFO: get all concepts in the database`);
        const sql: string = "SELECT ID, parent, child, alternateName, concept FROM `clinical-concept`;"
        connection.connect(function(err) {
            if (err) next(err);
                connection.query(sql, function (err, result, fields) {
                    if (err) next(err);
                    res.json(result);
            });
        });
    } catch (error) {
        next(error);
    }
  };



//  GET a specific concept in the database on-man
export const getConceptByID = async (req: Request, res: Response, next: NextFunction) => {
try {
    console.log(`INFO: get concept: ${req.params.id} in the database`);
    const sql: string = "SELECT ID, parent, child, alternateName, concept FROM `clinical-concept` where ID = " + req.params.id + ";"
    connection.connect(function(err) {
        if (err) next(err);
            connection.query(sql, function (err, result, fields) {
                if (err) next(err);
                if (JSON.stringify(result) == "[]") {
                    res.json({
                        "description": "No records found for the ID: " + req.params.id + " specified in the database"
                    })
                }
                else res.json(result);
        });
    });
} catch (error) {
    next(error);
}
};

//   createConcept: POST
export const createConceptByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const concept:OntologyConcept = {
            id: req.body.ID,
            concept: req.body.concept,
            parent: req.body.parent,
            child: req.body.child,
            alternateName: req.body.alternateName
        }
        console.log(`INFO: create concept ${concept.id} in the database`);
        // const concept: Concept = new Concept(conceptObj);
        const sql: string = "INSERT INTO `clinical-concept` (ID, concept, parent, child, alternateName) VALUES(" + `'${concept.id}', '${concept.concept}', '${concept.parent}', '${concept.child}', '${concept.alternateName}');`
        
        connection.connect(function(err) {
            if (err) next(err);
                connection.query(sql, function (err, result, fields) {
                    if (err) next(err);
                    else res.json(result);
            });
        });
    } catch (error) {
        next(error);
    }
};


//   updateConcept: PUT
//   deleteConcept: DELETE
