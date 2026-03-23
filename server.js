import app from './src/app.js';
import config from './src/config/config.js'
import connectdb from './src/config/db.js'


connectdb().then(()=>{
    app.listen(config.port,()=>{
        try {
            console.log(`server up! http://localhost:${config.port}`)
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    })
});