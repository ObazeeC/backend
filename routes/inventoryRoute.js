// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const invValidate = require("../utilities/account-validation")



// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:inv_id", invController.buildDetailView)

router.get("/", invController.buildManagementView)

// add the classification 
router.get("/add-classification", invController.buildAddClassification)

router.post("/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    invController.addClassification
)

// the add inventory
router.get("/add-inventory", invController.buildAddInventory)
router.post(
    "/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    invController.addInventory
)

module.exports = router;
