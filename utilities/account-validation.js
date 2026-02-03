const utilities = require(".")
const accountModel = require("../models/account-model")
const { body, validationResult } = require ("express-validator")
const validate = {}


/* *******************************************************
 * Registration Data Validation Rules
   
 * ****************************************************** */
validate.registrationRules = () =>{
    return [
        //firstname is required and must be string
        body("account_firstname")
        .trim()
        .escape() // finds any special character and transform it to an HTML Entity rendering it not operational as code.
        .notEmpty()
        .isLength({min: 1})
        .withMessage("Please provide a first name. "), // On error this message is sent

        // last name is required and must be string
        body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 2})
        .withMessage("Please provide a last name."), // on error this message is sent

        // valid email is required and cannot already exist in the DB
        body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail() // refer to validator.js docs
        .withMessage("A valid email is required.")
        .custom(async(account_email) => {
            const emailExists = await accountModel.checkExistingEmail(account_email)
            if(emailExists){
                throw new Error("Email exists. Please login or use different email")
            }
        }),

        //password is required and must be strong password
        body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols:1, 
        })
        .withMessage("password does not meet requirements."),
    ]
}


/* ************************************************
 * Check data against predefined rule above and return errors or continue to registration
* ************************************************* */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        })
        return
    }
    next()
}




/* ********************************
 * Login data validation
 * ****************************** */
validate.loginRules = () => {
    return [// valid email is required and cannot already exist in the DB
        body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail() // refer to validator.js docs
        .withMessage("A valid email is required.")
        .custom(async(account_email) => {
            const emailExists = await accountModel.checkExistingEmail(account_email)
            if(!emailExists){
                throw new Error("No account found with that email. ")
            }
        }),

        //password is required and must be strong password
        body("account_password")
        .trim()
        .notEmpty()
        .withMessage("password cannot be empty"),
    ]
}

/* ********************************
 *  Check data data against predefined rule above to process login
 * ****************************** */
validate.checkLogData = async (req, res, next) =>{
    const {account_email} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        let nav = await utilities.getNav()
        res.render("account/login", {
            errors,
            title: "Login",
            nav,
            account_email
        })
        return
    }
    next();
}

/* ********************************
 *  classification validation
 * ****************************** */
validate.classificationRules = () =>{
    return[
        body("classification_name")
        .trim()
        .isAlphanumeric()
        .withMessage("Classification name must contain only letters and numbers. ")
        .notEmpty()
        .withMessage("Classification name is required. ")
    ]
}

/* ********************************
 *  check classification name against rule
 * ****************************** */
validate.checkClassificationData = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let nav = await utilities.getNav()
        return res.render("inventory/add-classification",{
            title: "Add Classification",
            nav,
            errors,
            classification_name: req.body.classification_name
        })
    }
    next()
}
module.exports = validate
