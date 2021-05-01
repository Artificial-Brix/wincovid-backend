import * as express from "express";
import multer from "multer";
import { PostHelp, PostContribution, PostContact, GetContribution, GetHelp } from "./public.controller";
import { ValidateBasicDetails, ValidateContactPost, ValidateSearchDetails } from "./public.validator";

class Public {
    public router: express.Router;
    private upload = multer();
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    public configRoutes() {

        // Search Route
        this.router.post('/search', [this.upload.none(), ...ValidateSearchDetails], GetContribution);

        // Contribute Route
        this.router.post('/contribute', [this.upload.none(), ...ValidateBasicDetails], PostContribution);

        // Help Route
        this.router.get('/help', GetHelp)
        this.router.post('/help', [this.upload.none(), ...ValidateBasicDetails], PostHelp);

        // Contact Route
        this.router.post('/contact', [this.upload.none(), ...ValidateContactPost], PostContact);
    }
}

const PublicRouter = new Public().router;
export { PublicRouter };
