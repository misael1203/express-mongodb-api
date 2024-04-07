import { Request, Response } from 'express';
import client from '../config/database';

export const getHome = async (req: Request, res: Response) => {
    try {
        // Connect the client to the server
        await client.connect();

        // Obtener referencia a la colección de películas
        const database = client.db('sample_mflix');
        const collection = database.collection('movies');

        // Obtener todas las películas como un array de objetos
        const movies = await collection.find().limit(10).toArray();

        // Extraer solo los datos relevantes de las películas
        const moviesData = movies.map(movie => ({
            title: movie.title,
            year: movie.year,
            // Agrega más propiedades si es necesario
        }));

        res.json({ movies: moviesData });
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to server', error });
    } finally {
        // Cerrar la conexión con la base de datos
        await client.close();
    }    
};

export const getAbout = (req: Request, res: Response) => {
    res.send('About Page');
};
