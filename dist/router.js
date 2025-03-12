"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/data', async (req, res) => {
    const url = 'https://www.saps.gov.za/crimestop/missing/list.php';
    const baseURL = 'https://www.saps.gov.za/crimestop/missing/';
    const { data } = await axios_1.default.get(url);
    //load the HTML data
    const $ = cheerio.load(data);
    const articles = [];
    let article = {
        name: '',
        image: '',
        more: ''
    };
    $('tr').each((i, elem) => {
        if ($(elem).find('img').attr('src') !== undefined) {
            article = {
                name: $(elem).find('a').text().trim(),
                image: baseURL + $(elem).find('img').attr('src'),
                more: baseURL + $(elem).find('a').attr('href')
            };
        }
        if (article.name && article.more && article.image) {
            articles.push(article);
        }
    });
    res.json(articles);
});
exports.default = router;
//# sourceMappingURL=router.js.map