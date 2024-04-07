import { Express } from "express"
import * as dotenv from 'dotenv';
dotenv.config();
const envPort = process.env.PORT || 3000;

const setupPort = (app: Express, customPort: number|null = null) => {
    const port = customPort || envPort;
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`)
    })
}

export default setupPort