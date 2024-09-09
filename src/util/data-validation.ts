import { connectionPool } from "../config/db";
import { Request, Response, NextFunction} from 'express';

// All the data validation is done here before performing database operation
export async function validate(req: Request): Promise<boolean> {
    console.log(`validating concept: ${req.body.id}`)

    if (req.method == 'POST' || req.method == 'PUT') {
        // validation #1: concept cannot be it's own child
        if (req.body.child?.split(",").includes(req.body.id.toString())) {
            console.log(`concept cannot be it's own child`)
            return false;
        }

        // validation #2: concept cannot be it's own parent
        if (req.body.parent?.split(",").includes(req.body.id.toString())) {
            console.log(`concept cannot be it's own parent`)
            return false;
        }

        // validation #3: if parent != '', concept cannot have a non-existing parent
        if (req.body.parent != '') {
            let parentSQL: string = "'" + req.body.parent.split(",").join("','") + "'";
            const sql: string = "SELECT id FROM `clinical-concept` WHERE id IN (" + parentSQL + ");"
            
            let result: any = await connectionPool.execute(sql);
            if (result[0].length != req.body.parent.split(",").length) {
                console.log(`concept cannot claim a non-existent parent`)
                return false;
            }
        }

        // validation #4: if child != '', concept cannot have a non-existing child
        if (req.body.child != '') {
            let childSQL: string = "'" + req.body.child.split(",").join("','") + "'";
            const sql: string = "SELECT id FROM `clinical-concept` WHERE id IN (" + childSQL + ");"
            
            let result: any = await connectionPool.execute(sql);
            if (result[0].length != req.body.child.split(",").length) {
                console.log(`concept cannot claim a non-existent child`)
                return false;
            }
        }
        
    }

    return true;
}