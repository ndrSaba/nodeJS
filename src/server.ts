import 'dotenv/config';
import config  from './config';
import app from './app';

const port = config.PORT;

app.listen(port, () =>{
    console.log(`[server]: Server is running att https://localhost:${port}`);
})
