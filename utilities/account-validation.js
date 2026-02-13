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

/* ********************************
 *  add inventory validation
 * ****************************** */
validate.inventoryRules = () => {
    return [
        body("inv_make")
        .trim()
        .notEmpty()
        .withMessage("Make is required."),

         body("inv_model")
        .trim()
        .notEmpty()
        .withMessage("Model is required."),

         body("inv_year")
        .isInt({min:1900, max:2099})
        .notEmpty()
        .withMessage("Enter a valid year"),

         body("inv_description")
        .trim()
        .notEmpty()
        .withMessage("Desccription is required "),

         body("inv_image")
        .trim()
        .notEmpty()
        .withMessage("Image path is required."),

         body("inv_thumbnail")
        .trim()
        .notEmpty()
        .withMessage("Thumbnail path is required "),

         body("inv_price")
        .isFloat({min:0})
        .notEmpty()
        .withMessage("price must be a positive number"),

         body("inv_miles")
        .isInt({min: 0})
        .notEmpty()
        .withMessage("Miles must a positive number only"),

         body("inv_color")
        .trim()
        .notEmpty()
        .withMessage("Color is required"),
    ]
}

/* ********************************
 *  New  inventory validation
 * ****************************** */
validate.newInventoryRules = () => {
    return [
        body("inv_make")
        .trim()
        .notEmpty()
        .withMessage("Make is required."),

         body("inv_model")
        .trim()
        .notEmpty()
        .withMessage("Model is required."),

         body("inv_year")
        .isInt({min:1900, max:2099})
        .notEmpty()
        .withMessage("Enter a valid year"),

         body("inv_description")
        .trim()
        .notEmpty()
        .withMessage("Desccription is required "),

         body("inv_image")
        .trim()
        .notEmpty()
        .withMessage("Image path is required."),

         body("inv_thumbnail")
        .trim()
        .notEmpty()
        .withMessage("Thumbnail path is required "),

         body("inv_price")
        .isFloat({min:0})
        .notEmpty()
        .withMessage("price must be a positive number"),

         body("inv_miles")
        .isInt({min: 0})
        .notEmpty()
        .withMessage("Miles must a positive number only"),

         body("inv_color")
        .trim()
        .notEmpty()
        .withMessage("Color is required"),
    ]
}


/* ********************************
 *  check inventory data against defined rules
 * ****************************** */
validate.checkInventoryData = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList(req.body.classification_id)

        return res.render("inventory/add-inventory", {
            title: "Add Inventory", 
            nav,
            classificationList,
            errors,
            ...req.body
        })
    }
    next()
}

/* ********************************
 *  process update inventory data, return errors to the edit view
 * ****************************** */
validate.checkUpdateData = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let nav = await utilities.getNav()
        
        // build the classification dropdown with the selected value
        let classificationSelect = await utilities.buildClassificationList(req.body.classification_id)

        //keep inventory ID from the form
       let inv_id = req.body.inv_id

        return res.render("inventory/edit-inventory", {
            title: `Edit ${req.body.inv_make} ${req.body.inv_model}`, 
            nav,
            classificationSelect,
            inv_id,
            errors,
            ...req.body
        })
    }
    next()
}

/* ********************************
 * Account update rules
 * ****************************** */
validate.updateAccountRules = () => {
    return [
        body("account_firstname")
        .trim()
        .isLength({min:1}),

        body("account_lastname")
        .trim()
        .isLength({min:1}),

        body("account_email")
        .trim()
        .isEmail()
        .custom(async (email, {req}) => {
            const existing = await accountModel.checkExistingEmail(email)
            if(existing && existing.account_id != req.body.account_id){
                throw new Error("Email aready exist. Choose another ")
            }
        })
    ]
}

/* ********************************
 * Account update password rules
 * ****************************** */
validate.updatePasswordRules = () => {
    return [
        body("account_password")
        .trim()
        .isStrongPassword({
            minLength:12,
            minLowercase:1,
            minUppercase:1,
            minNumbers:1,
            minSymbols:1
        })
    ]
}

/* ********************************
 * Check account update data
 * ****************************** */
validate.checkUpdateAccountData = async(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let nav = await utilities.getNav()
        return res.render("account/update-account",{
            title:"update Account Information ",
            nav,
            errors,
            accountData: req.body

        })
    }
    next()
} 

validate.checkUpdatePasswordData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    return res.render("account/update-account", {
      title: "Update Account Information",
      nav,
      errors,
      accountData: req.body
    })
  }
  next()
}

module.exports = validate
