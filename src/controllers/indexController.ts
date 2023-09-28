import {request, response } from 'express'

class IndexController{
    
    public index (req: Request, res: any)    {
        res.send('Hola_ inicio');
    }
}

export const indexController = new IndexController();