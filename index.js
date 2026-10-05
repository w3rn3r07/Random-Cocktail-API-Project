import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_KEY = "1";
const API_URL = "https://www.thecocktaildb.com/api/json/v1/"+API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res) => {
    try{
        const result = await axios.get(API_URL+"/search.php?s=margarita");
        const drinks = result.data.drinks;
        console.log("drinks : ", drinks)
        let returnValue = [5,1,4];
        // let returnValue = feedGenerator(drinks.length);
        // console.log(returnValue);
        // console.log(result.data.drinks[0]);
        //feedIndexArr:returnValue
        res.render("index.ejs", {content: result.data, feedIndexArr:returnValue} );
    }catch(error){
        console.log(error.response);
        res.status(500);
    }
});

app.listen(port,() => {
    console.log(`The server is running on port ${port}`);
});







// function feedGenerator(dLength){
//     let indexArr = [];
//     let index
//     for(let i=0; indexArr.length=3; i++){
//         if (indexArr.length === 0){
//             index = Math.floor(Math.random()*dLength);
//             indexArr.push(index);
//         }
//         else if (indexArr[i] !== indexArr[i-1]){
//             index = Math.floor(Math.random()*dLength);
//             indexArr.push(index);
//         }
//     }
//     return indexArr;
// }

//logic
// let indexArr = [];
// let dLength = 6;

// while (indexArr.length < 3) {
//     let index = Math.floor(Math.random() * dLength);

//     if (!indexArr.includes(index)) {
//         indexArr.push(index);
//     }
// }

// console.log(indexArr);

//programiz
// let indexArr = [];
// let dLength = 6;
// let used = [];
// let index;

// for(let i=0; indexArr.length<3; i++){
//   if (indexArr.length === 0){
//     index = Math.floor(Math.random()*dLength);
//     indexArr.push(index);
//     used.push(index);
//   } else {
//     index = Math.floor(Math.random()*dLength);
//     indexArr.push(index);
//     for (let j in used){
//       if( j === indexArr[i] || j === indexArr[i-1]){
//         indexArr.pop(indexArr[i]);
//         index = Math.floor(Math.random()*dLength);
//         indexArr.push(index);
//       } else {
//         index = Math.floor(Math.random()*dLength);
//         indexArr.push(index);
//         used.push(index);
//       }
//     }
//   }
// }
// console.log( indexArr );
//logic