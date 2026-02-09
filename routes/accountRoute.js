const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")
const baseController = require("../controllers/baseController")
const invCont = require("../controllers/invController")


/* ******************************
* deliver the login view 
* ***************************** */
// router.get("/", utilities.handleErrors())  
router.get("/", utilities.handleErrors(accountController.buildLogin))

router.get("/login", utilities.handleErrors(accountController.buildLogin)) // "/login"

/* ************************************
 * Deliver the register view 
 * ********************************** */
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/* ************************************
 * Deliver the register view 
 * ********************************** */
router.get("/management",
    utilities.checkLogin,
    utilities.handleErrors(accountController.buildAccountManagement))

 


/* ************************************
 * Process incoming registration
 * ********************************** */
router.post('/register',
       regValidate.registrationRules(),
       regValidate.checkRegData,
       utilities.handleErrors(accountController.registerAccount))

    


//
router.get("/trigger-error", baseController.triggerError)
//router.get("/trigger-error", utilities.handleErrors(baseController.triggerError))

// 




router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLogData,
    utilities.handleErrors(accountController.accountLogin)

)


module.exports = router;