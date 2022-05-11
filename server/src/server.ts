import express from 'express'
import cors from 'cors'
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json()); //middware,  tipo um plugin indo na requisição e procurando algum json
app.use(routes);



app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!');
});