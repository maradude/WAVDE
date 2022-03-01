import express from "express"
import saveWarning from "../models/warnings"
const router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
})

router.post("/", function (req, res, next) {
  if (req.body?.message === undefined || req.body?.warning === undefined) {
    console.log("unexpected input")
    res.status(400).send("body must contain message and warning fields")
    return
  }
  try {
    saveWarning(req.body)
  } catch (err) {
    console.log("issue saving warning", err)
    return
  }
  res.status(201).send("k")
  const url = new URL(req.body.message?.url)
  console.log(`Received ${req.body.warning.type} from ${url.hostname}`)
})

export default router
