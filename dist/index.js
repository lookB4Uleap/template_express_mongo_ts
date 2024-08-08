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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config"); // remember
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;
DATABASE_URL && mongoose_1.default.connect(DATABASE_URL).then(() => console.log(`[OrderMS ${process.pid}] : Database Found`)).catch(err => console.log(err));
const db = mongoose_1.default.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log(`[OrderMS ${process.pid}] : Connected to database`));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    // console.log(`Request processed at ${process.pid}`);
    res.send('Express + TypeScript Server');
});
app.get('/ip', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get('https://curlmyip.org/');
    console.log('[server] IP : ', data);
    res.json({ ip: data });
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
