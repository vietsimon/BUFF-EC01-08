import multer = require("multer");
import { extname } from "path";
import ImageAntdResponse from "../models/ImageAntdResponse";
import { DefaultConst } from "../shared/DefaultConst";
import BaseController from "./BaseController";
import express = require("express");
import * as fs from 'fs';


const diskStorage = multer.diskStorage({
    destination: (req, file, done) => done(null, DefaultConst.pathImage),
    filename: (req, file, done) => done(null, file.fieldname + '-' + Date.now() + extname(file.originalname))
})

const uploadImage = multer({
    storage: diskStorage,
    fileFilter: (req, file, callback) => {
        var ext = extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(null, false)
        }
        callback(null, true)
    },
    limits: { fileSize: 100 * 1024 * 1024 }

});

export default class UploadController extends BaseController {

    constructor() {
        super();
        this.initializeRouter();
    }

    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostPutDeleteRouter();
    }

    private initGetRouter() {
        this._router.get("/v1/files/:name", this.getImage);
    }
    private initPostPutDeleteRouter() {
        this._router.post("/v1/upload", uploadImage.single('file'), this.uploadImage);

    }
    getImage = (request: express.Request, response: express.Response) => {
        let { name } = request.params as any;
        //let file = fs.readFileSync(`${DefaultConst.pathImage}/${name}`)
        return response.download(`${DefaultConst.pathImage}/${name}`)
    }
    uploadImage = (request: express.Request, response: express.Response) => {
        if (request.file) {
            let url = `${DefaultConst.Api}/v1/files/${request.file.filename}`;
            let respone = new ImageAntdResponse(request.file.filename, "done", url, url)
            return response.json(respone);
        }
        return response.status(404).json({ message: 'Error', error: 'Not receive file' })
    }

}