import { Router, Request, Response } from 'express';
import Mysql from '../mysql/mysql';

const router = Router();

router.get('/heroes/:id', (req: Request, res: Response) => {
    
    let id = req.params.id;
    const escapeId = Mysql.escaparParam(id);
    let query = `SELECT *
                FROM heroes WHERE id = ${ escapeId }`;
    Mysql.ejecutarQuery(query, (err:any, heroe:object[] ) => {
        if (err) {
            return res.status(500).json({
                        ok:false,
                        err
                    })
        }

        res.json({
            ok:true,
            heroe: heroe[0]
        });
    });
});

router.get('/heroes', (req:Request, res:Response) => {
    let query = `SELECT *
                FROM heroes`;
    Mysql.ejecutarQuery(query, (err:any, heroes:object[] ) => {
        if (err) {
            return res.status(500).json({
                        ok:false,
                        err
                    })
        }

        res.json({
            ok:true,
            heroes
        });
    });
});

export default router;