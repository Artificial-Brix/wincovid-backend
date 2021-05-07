import { checkSchema } from "express-validator";
import { ValidationResponder } from "../../middleware/validation.response";
class PublicValidator {

    constructor() {

    }

    public static validateBasicDetails() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Name is missing',
                },
                phone: {
                    in: ['body'],
                    exists: true,
                    trim: true,
                    errorMessage: 'Phone number is missing',
                    isEmpty: {
                        negated: true,
                        errorMessage: 'Phone number should not be empty'
                    },
                    isLength: {
                        options: {
                          min: 10,
                          max: 12,
                        },
                        errorMessage: 'Phone number should be 10 digit',
                      },
                      isNumeric: {
                        errorMessage: 'Invalid Phone number, no symbols like +,-./ etc',
                        options: {
                          no_symbols: true,
                        },
                      },
                },
                pincode: {
                    in: ['body'],
                    isInt: true,
                    exists: true,
                    errorMessage: 'Pincode is missing',
                },
                additionalDetails: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Additional Message is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
    public static validateContactPost() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Name is missing',
                },
                email: {
                    in: ['body'],
                    exists: true,
                    errorMessage: 'Email ID is missing',
                    isEmpty: {
                        negated: true,
                        errorMessage: 'Email ID should not be empty'
                    },
                    isEmail: {
                        errorMessage: 'Invalid Email ID',
                    },
                },
                phone: {
                    in: ['body'],
                    exists: true,
                    trim: true,
                    errorMessage: 'Phone number is missing',
                    isEmpty: {
                        negated: true,
                        errorMessage: 'Phone number should not be empty'
                    },
                    isLength: {
                        options: {
                          min: 10,
                          max: 12,
                        },
                        errorMessage: 'Phone number should be 10 digit',
                      },
                      isNumeric: {
                        errorMessage: 'Invalid Phone number, no symbols like +,-./ etc',
                        options: {
                          no_symbols: true,
                        },
                      },
                },
                message: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Message is missing',
                },
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
    public static validateSearchDetails() {
        return [
            ...checkSchema({
                pincode: {
                    in: ['body'],
                    isNumeric: true,
                    exists: true,
                    errorMessage: 'Pincode is missing',
                },
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
}

const ValidateBasicDetails = PublicValidator.validateBasicDetails();
const ValidateContactPost = PublicValidator.validateContactPost();
const ValidateSearchDetails = PublicValidator.validateSearchDetails()

export {
    ValidateBasicDetails,
    ValidateContactPost,
    ValidateSearchDetails,
}
