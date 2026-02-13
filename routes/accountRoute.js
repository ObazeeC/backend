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
 * Deliver the account update ruote for the view
 * ********************************** */
router.get(
    "/update/:account_id",
    utilities.checkLogin,
    utilities.handleErrors(accountController.buildUpdateAccount)
)

/* ************************************
 * Post ruote update info
 * ********************************** */
router.post(
    "/update",
    regValidate.updateAccountRules(),
    regValidate.checkUpdateAccountData,
    utilities.handleErrors(accountController.updateAccount)

)

/* ************************************
 * Post ruote update password
 * ********************************** */
router.post(
  "/update-password",
  regValidate.updatePasswordRules,
  regValidate.checkUpdatePasswordData,
  utilities.handleErrors(accountController.updatePassword)
)

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

//Add the logout process
router.get("/logout", utilities.handleErrors(accountController.accountLogout))


module.exports = router;