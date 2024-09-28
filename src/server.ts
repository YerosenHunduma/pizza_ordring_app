import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import rootRoute from './routes/index';

dotenv.config();
const PORT = process.env.PORT || 5959;

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true
    })
);
app.use('/api', rootRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
