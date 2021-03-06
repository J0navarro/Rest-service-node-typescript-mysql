"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var router = express_1.Router();
router.get('/heroes/:id', function (req, res) {
    var id = req.params.id;
    var escapeId = mysql_1.default.escaparParam(id);
    var query = "SELECT *\n                FROM heroes WHERE id = " + escapeId;
    mysql_1.default.ejecutarQuery(query, function (err, heroe) {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            heroe: heroe[0]
        });
    });
});
router.get('/heroes', function (req, res) {
    var query = "SELECT *\n                FROM heroes";
    mysql_1.default.ejecutarQuery(query, function (err, heroes) {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            heroes: heroes
        });
    });
});
exports.default = router;
