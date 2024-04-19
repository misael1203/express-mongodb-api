import { Request, Response } from 'express';
import client from '../config/database';

export const getHome = async (req: Request, res: Response) => {
    // This use mongodb sample_mflix database
    try {
        await client.connect();
        
        const collection = await client.query('SELECT * FROM users');

        res.json({ data: collection });
    } catch (error:any) {
        res.status(500).json({ message: error.message, error });
    } finally {
        if(client) await client.close();
    }    
};

export const getAbout = (req: Request, res: Response) => {
    res.send('About Page');
};
