import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_KEY = "1";
const API_URL = "https://www.thecocktaildb.com/api/json/v1/"+API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function feedGenerator(dLength){
    let indexArr = [];
    while (indexArr.length < 3) {
        let index = Math.floor(Math.random() * dLength);
        if (!indexArr.includes(index)) {
            indexArr.push(index);
        }
    }
    return indexArr;
}

app.get("/drink/:id", async (req,res) => {
    try {
        const result = await axios.get(API_URL+"/search.php?s=margarita");
        // const drinks = result.data.drinks;
        res.render("details.ejs", {content: result.data, feedIndexArr:req.params.id});
    } catch (error) {
        console.log(error.response);
        res.status(500);
    }
})

app.get("/", async (req,res) => {
    try{
        const result = await axios.get(API_URL+"/search.php?s=margarita");
        const drinks = result.data.drinks;
        console.log(drinks)
        let returnValue = feedGenerator(drinks.length);
        res.render("index.ejs", {content: result.data, feedIndexArr:returnValue} );
    }catch(error){
        console.log(error.response);
        res.status(500);
    }
});

app.listen(port,() => {
    console.log(`The server is running on port ${port}`);
});