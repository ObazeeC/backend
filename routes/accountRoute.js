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
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/* ************************************
 * Deliver the register view 
 * ********************************** */
router.get("/register", utilities.handleErrors(accountController.buildRegister))


router.get("/", utilities.handleErrors())
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

// process the login attempt



router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLogData,
    
    (req, res) => {
        res.status(200).send('login process')
    }

)


module.exports = router;