// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const invValidate = require("../utilities/account-validation")
const utilities = require("../utilities/")




// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:inv_id", invController.buildDetailView)

router.get("/", invController.buildManagementView)

// add the classification 
router.get("/add-classification", 
    utilities.checkEmployeeOrAdmin,
    invController.buildAddClassification)

router.post("/add-classification",
    utilities.checkEmployeeOrAdmin,
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    invController.addClassification
)

// the add inventory
router.get("/add-inventory", utilities.checkEmployeeOrAdmin, invController.buildAddInventory)
router.post(
    "/add-inventory",
     utilities.checkEmployeeOrAdmin,
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    invController.addInventory
)
// a new route that works with URL in the JavaScript 
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Ruote to build the edit inventory view
router.get("/edit/:inv_id", 
    utilities.checkEmployeeOrAdmin,
    utilities.handleErrors(invController.editInventoryView))




// Add new inventory route

router.post("/add",
    utilities.checkEmployeeOrAdmin,
    invValidate.newInventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)

// check update middleware
//Route to handle incoming request to update iventory
router.post("/update",
    utilities.checkEmployeeOrAdmin,
    invValidate.newInventoryRules(),
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

/* ************************************
 * Delete route
 * ********************************** */
router.get("/delete/:inv_id",
     utilities.checkEmployeeOrAdmin,
     utilities.handleErrors(invController.buildDeleteView))

 /* ************************************
 * The delete post ruote that will a controller function to carry out the delete process
 * ********************************** */
router.post("/delete", 
    utilities.checkEmployeeOrAdmin,
    utilities.handleErrors(invController.deleteInventoryItem))

module.exports = router;
