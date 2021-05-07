import { Response } from 'express';
import { GetHelpPost } from '../../models/getHelpPost';
import { AuthenticatedRequest } from '../../interface/authenticatedRequest.model';
import { ResponseObject } from '../../interface/Response.model';
import { GetDetailsByPincode } from '../../utility';
import { ContributorPost } from '../../models/contribution';
import { Contact } from '../../models/contact';

export class PublicController {

    constructor() { }

    public static postContribution = async (req: AuthenticatedRequest, res: Response) => {
        const name = req.body.name;
        const phone = req.body.phone;
        const pincode = req.body.pincode;
        const aPositive = req.body.aPositive;
        const aNegative = req.body.aNegative;
        const bPositive = req.body.bPositive;
        const bNegative = req.body.bNegative;
        const abPositive = req.body.abPositive;
        const abNegative = req.body.abNegative;
        const oPositive = req.body.oPositive;
        const oNegative = req.body.oNegative;
        const oxygenCylinder = req.body.oxygenCylinder;
        const oxygenRefiling = req.body.oxygenRefiling;
        const covidAmbulance = req.body.covidAmbulance;
        const nonCovidAmbulance = req.body.nonCovidAmbulance;
        const covidMedicine = req.body.covidMedicine;
        const nonCovidMedicine = req.body.nonCovidMedicine;
        const covidBeds = req.body.covidBeds;
        const nonCovidBeds = req.body.nonCovidBeds;
        const covidICUBeds = req.body.covidICUBeds;
        const nonCovidICUBeds = req.body.nonCovidICUBeds;
        const food = req.body.food;
        const others = req.body.others;
        const additionalDetails = req.body.additionalDetails;

        let response: ResponseObject<any>;
        try {

            const pincodeDetails = await GetDetailsByPincode(pincode);

            if (!pincodeDetails.ResponseData) {
                res.status(400).send({ msg: 'Invalid Pincode' });
            }
            else {
                const district = pincodeDetails.ResponseData.District
                const state = pincodeDetails.ResponseData.State

                const contributor = await ContributorPost.create({
                    name,
                    phone,
                    pincode,
                    district,
                    state,
                    aPositive,
                    aNegative,
                    bPositive,
                    bNegative,
                    abPositive,
                    abNegative,
                    oPositive,
                    oNegative,
                    oxygenCylinder,
                    oxygenRefiling,
                    covidAmbulance,
                    nonCovidAmbulance,
                    covidMedicine,
                    nonCovidMedicine,
                    covidBeds,
                    nonCovidBeds,
                    covidICUBeds,
                    nonCovidICUBeds,
                    food,
                    others,
                    additionalDetails
                });
                response = {
                    ResponseData: contributor,
                    ResponseMessage: 'Contributor Created',
                }
                return res.send(response);
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static getContribution = async (req: AuthenticatedRequest, res: Response) => {
        const pincode = req.body.pincode;
        const aPositive = false || req.body.aPositive;
        const aNegative = false || req.body.aNegative;
        const bPositive = false || req.body.bPositive;
        const bNegative = false || req.body.bNegative;
        const abPositive = false || req.body.abPositive;
        const abNegative = false || req.body.abNegative;
        const oPositive = false || req.body.oPositive;
        const oNegative = false || req.body.oNegative;
        const oxygenCylinder = false || req.body.oxygenCylinder;
        const oxygenRefiling = false || req.body.oxygenRefiling;
        const covidAmbulance = false || req.body.covidAmbulance;
        const nonCovidAmbulance = false || req.body.nonCovidAmbulance;
        const covidMedicine = false || req.body.covidMedicine;
        const nonCovidMedicine = false || req.body.nonCovidMedicine;
        const covidBeds = false || req.body.covidBeds;
        const nonCovidBeds = false || req.body.nonCovidBeds;
        const covidICUBeds = false || req.body.covidICUBeds;
        const nonCovidICUBeds = false || req.body.nonCovidICUBeds;
        const food = false || req.body.food;
        const others = false || req.body.others;

        let response: ResponseObject<any>;

        const pincodeDetails = await GetDetailsByPincode(pincode);
        if (!pincodeDetails.ResponseData) {
            res.status(400).send({ msg: 'Invalid Pincode' });
        }
        else {
            const keys = [
                'aPositive',
                'aNegative',
                'bPositive',
                'bNegative',
                'abPositive',
                'abNegative',
                'oPositive',
                'oNegative',
                'oxygenCylinder',
                'oxygenRefiling',
                'covidAmbulance',
                'nonCovidAmbulance',
                'covidMedicine',
                'nonCovidMedicine',
                'covidBeds',
                'nonCovidBeds',
                'covidICUBeds',
                'nonCovidICUBeds', 
                'food', 
                'others'
            ];
            const values = [
                aPositive,
                aNegative,
                bPositive,
                bNegative,
                abPositive,
                abNegative,
                oPositive,
                oNegative,
                oxygenCylinder,
                oxygenRefiling,
                covidAmbulance,
                nonCovidAmbulance,
                covidMedicine,
                nonCovidMedicine,
                covidBeds,
                nonCovidBeds,
                covidICUBeds,
                nonCovidICUBeds, 
                food, 
                others
            ];
            const district = pincodeDetails.ResponseData.District;
            let query: Array<any> = []
            keys.forEach((ele: any, index) => {
                if (values[index]) {
                    query.push({ [keys[index]]: true })
                }
            });
            try {
                const contributions = await ContributorPost.find({
                    $and: [
                        {
                            $or: query
                        },
                        {
                            "district": district,
                        }
                    ]
                })
                // .countDocuments();   // Don't remove or touch here.
                response = {
                    ResponseData: contributions.reverse(),
                    ResponseMessage: 'Got Results',
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                return res.status(500).end();
            }
        }
    }

    public static postHelp = async (req: AuthenticatedRequest, res: Response) => {
        const name = req.body.name;
        const phone = req.body.phone;
        const pincode = req.body.pincode;
        const aPositive = req.body.aPositive;
        const aNegative = req.body.aNegative;
        const bPositive = req.body.bPositive;
        const bNegative = req.body.bNegative;
        const abPositive = req.body.abPositive;
        const abNegative = req.body.abNegative;
        const oPositive = req.body.oPositive;
        const oNegative = req.body.oNegative;
        const oxygenCylinder = req.body.oxygenCylinder;
        const oxygenRefiling = req.body.oxygenRefiling;
        const covidAmbulance = req.body.covidAmbulance;
        const nonCovidAmbulance = req.body.nonCovidAmbulance;
        const covidMedicine = req.body.covidMedicine;
        const nonCovidMedicine = req.body.nonCovidMedicine;
        const covidBeds = req.body.covidBeds;
        const nonCovidBeds = req.body.nonCovidBeds;
        const covidICUBeds = req.body.covidICUBeds;
        const nonCovidICUBeds = req.body.nonCovidICUBeds;
        const food = req.body.food;
        const others = req.body.others;
        const additionalDetails = req.body.additionalDetails;

        let response: ResponseObject<any>;

        try {
            const pincodeDetails = await GetDetailsByPincode(pincode);
            if (!pincodeDetails.ResponseData) {
                res.status(400).send({ msg: 'Invalid Pincode' });
            }
            const district = pincodeDetails.ResponseData.District
            const state = pincodeDetails.ResponseData.State

            const post = await GetHelpPost.create({
                name,
                phone,
                pincode,
                district,
                state,
                aPositive,
                aNegative,
                bPositive,
                bNegative,
                abPositive,
                abNegative,
                oPositive,
                oNegative,
                oxygenCylinder,
                oxygenRefiling,
                covidAmbulance,
                nonCovidAmbulance,
                covidMedicine,
                nonCovidMedicine,
                covidBeds,
                nonCovidBeds,
                covidICUBeds,
                nonCovidICUBeds,
                food,
                others,
                additionalDetails
            });
            response = {
                ResponseData: post,
                ResponseMessage: 'Help Post Created',
            }
            return res.send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static postContact = async (req: AuthenticatedRequest, res: Response) => {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const message = req.body.message;

        let response: ResponseObject<any>;

        try {
            const contact = await Contact.create({
                name,
                email,
                phone,
                message,
            });
            response = {
                ResponseData: contact,
                ResponseMessage: 'Contact Post Created',
            }
            return res.send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }
    public static getHelp = async (req: AuthenticatedRequest, res: Response) => {
        let response: ResponseObject<any>;

        try {
            const helps = await GetHelpPost.find();
            response = {
                ResponseData: helps.reverse(),
                ResponseMessage: 'Helps fetched',
            }
            return res.send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    
}



const PostContribution = PublicController.postContribution;
const PostHelp = PublicController.postHelp;
const PostContact = PublicController.postContact;
const GetContribution = PublicController.getContribution;
const GetHelp = PublicController.getHelp;

export {
    GetContribution,
    PostContribution,
    GetHelp,
    PostHelp,
    PostContact,
}