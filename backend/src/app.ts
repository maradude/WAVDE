import express, { Application, Request, Response, NextFunction  } from "express";
import dotenv from 'dotenv'
import createError, { HttpError } from 'http-errors'
import path from 'path'
import cookieParser from "cookie-parser"
import logger from "morgan"

import indexRouter from "./routes/index"

dotenv.config()
const app: Application = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

console.log("server up")

module.exports = app
