import express = require('express');
import path = require('path');
export default class Server{

    // Paquete de compatibilidad de node con ts "npm i @types/express --save-dev"
    public app: express.Application;
    public port:number;

    constructor(puerto: number){
        this.port = puerto;
        this.app = express();
    }
    static init(puerto: number){
        return new Server(puerto);
    }

    start(callback: () => void){
        this.app.listen(this.port, callback);
        this.publicFolder();
    }

    private publicFolder(){
    let pathPublic = path.resolve(__dirname,'../public');
    this.app.use( express.static(pathPublic));
    }

}