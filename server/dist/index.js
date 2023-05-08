"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("./DB");
const auth_1 = require("./auth");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, DB_1.waitForMongoConnection)();
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
        (0, auth_1.setupPassportSession)(app);
    });
}
startServer().catch((err) => console.error(err));
