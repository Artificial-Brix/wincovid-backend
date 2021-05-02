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
        const bloodPlasma = req.body.bloodPlasma;
        const oxygen = req.body.oxygen;
        const ambulance = req.body.ambulance;
        const medicine = req.body.medicine;
        const beds = req.body.beds;
        const icuBeds = req.body.icuBeds;
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
                const region = pincodeDetails.ResponseData.Region
                const state = pincodeDetails.ResponseData.State

                const contributor = await ContributorPost.create({
                    name,
                    phone,
                    pincode,
                    district,
                    region,
                    state,
                    bloodPlasma,
                    oxygen,
                    ambulance,
                    medicine,
                    beds,
                    icuBeds,
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

    public static postHelp = async (req: AuthenticatedRequest, res: Response) => {
        const name = req.body.name;
        const phone = req.body.phone;
        const pincode = req.body.pincode;
        const bloodPlasma = req.body.bloodPlasma;
        const oxygen = req.body.oxygen;
        const ambulance = req.body.ambulance;
        const medicine = req.body.medicine;
        const beds = req.body.beds;
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
            const region = pincodeDetails.ResponseData.Region
            const state = pincodeDetails.ResponseData.State

            const post = await GetHelpPost.create({
                name,
                phone,
                pincode,
                district,
                region,
                state,
                bloodPlasma,
                oxygen,
                ambulance,
                medicine,
                beds,
                food,
                others,
                additionalDetails,
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

    public static getContribution = async (req: AuthenticatedRequest, res: Response) => {
        const pincode = req.body.pincode;
        console.log(req.body.bloodPlasma)
        const bloodPlasma = false || req.body.bloodPlasma;
        const oxygen = false || req.body.oxygen;
        const ambulance = false || req.body.ambulance;
        const medicine = false || req.body.medicine;
        const beds = false || req.body.beds;
        const icuBeds = false || req.body.icuBeds;
        const food = false || req.body.food;
        const others = false || req.body.others;

        let response: ResponseObject<any>;

        const pincodeDetails = await GetDetailsByPincode(pincode);
        if (!pincodeDetails.ResponseData) {
            res.status(400).send({ msg: 'Invalid Pincode' });
        }
        else {
            const keys = ['bloodPlasma', 'oxygen', 'ambulance', 'medicine', 'beds', 'icuBeds', 'food', 'others'];
            const values = [bloodPlasma, oxygen, ambulance, medicine, beds, icuBeds, food, others];
            const region = pincodeDetails.ResponseData.Region;
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
                            "region": region,
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