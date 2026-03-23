import app from './src/app.js';
import {port} from './src/config/config.js'
import connectdb from './src/config/db.js'


connectdb().then(()=>{
    app.listen(port,()=>{
        try {
            console.log(`server up! http://localhost:${port}`)
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    })
});