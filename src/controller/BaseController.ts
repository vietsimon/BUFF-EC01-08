import express = require("express");

export default abstract class BaseController {
    public _router: express.Router;

    constructor() {
        this._router = express.Router();
    }
    protected abstract initializeRouter(): void;
}