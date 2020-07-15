import mysql from 'mysql';

export default class Mysql{
    private static _instance:Mysql;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node_db'
        });

        this.conectarDB()
      
    }

    public static get instance(){
        return this._instance || ( this._instance = new this());
    }

    public static ejecutarQuery(query: string, callback: Function){
        this.instance.cnn.query(query, (err, result: object[], fields) =>{
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if (result.length === 0) {
                return callback('No se encontraron registros');
            }else{
                callback(null, result);
            }           

        });

    }

    private conectarDB(){
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('Conectado a la DB');
        });
    }

    public static  escaparParam(data:any){
        return this.instance.cnn.escape(data);
    }

}
