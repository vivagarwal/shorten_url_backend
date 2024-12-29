const express = require("express");
const router = express.Router();
const Url = require("../model/url.js");
const shortid = require("shortid");


//shortid generation
router.post("/generate", async (req, res) => {
  try {
    const body = req.body;
    if(!body.url)
        return res.status(400).json({message :"Please enter the url"}); 
    const shortID = shortid();
    await Url.create({
        shortId:shortID,
        redirectURL:body.url,
        visited:[]
    });
    return res
        .status(200)
        .json({ message: "URL shortID created!", id:shortID });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//redirect url
router.get("/fetch/:shortId", async (req, res) => {
    try{
        const shortId = req.params.shortId;
        const webpage = await Url.findOneAndUpdate({
            shortId
        },
        {
            $push:{visited:{timetamp:Date.now()}}
        }
    );
    res.redirect(webpage.redirectURL);
}catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
}
});

//count no of clicks
router.get("/analysis/:shortId", async (req, res) => {
    try{
        const shortId = req.params.shortId;
        const result = await Url.findOne({shortId});
        return res.json({ totalClicks: result.visited.length });
    }catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
}
});

module.exports = router;