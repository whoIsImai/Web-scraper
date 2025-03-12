import axios from 'axios'
import * as cheerio from 'cheerio'
import express from 'express'
const router = express.Router()

router.get('/data', async (req, res) => {

    const url = 'https://www.saps.gov.za/crimestop/missing/list.php'
    const baseURL = 'https://www.saps.gov.za/crimestop/missing/' 
    const { data } = await axios.get(url)

    //load the HTML data
    const $ = cheerio.load(data)

    const articles = []
    let article = {
        name: '',
        image: '',
        more: ''
    }

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
    })
   
    res.json(articles)
})

export default router