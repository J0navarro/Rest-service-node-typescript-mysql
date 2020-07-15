"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var Mysql = /** @class */ (function () {
    function Mysql() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node_db'
        });
        this.conectarDB();
    }
    Object.defineProperty(Mysql, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Mysql.ejecutarQuery = function (query, callback) {
        this.instance.cnn.query(query, function (err, result, fields) {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (result.length === 0) {
                return callback('No se encontraron registros');
            }
            else {
                callback(null, result);
            }
        });
    };
    Mysql.prototype.conectarDB = function () {
        var _this = this;
        this.cnn.connect(function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            _this.conectado = true;
            console.log('Conectado a la DB');
        });
    };
    Mysql.escaparParam = function (data) {
        return this.instance.cnn.escape(data);
    };
    return Mysql;
}());
exports.default = Mysql;
