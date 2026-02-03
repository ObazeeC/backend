// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:inv_id", invController.buildDetailView)

router.get("/", invController.buildManagementView)

// add classification 
router.get("/add-classification", invController.buildAddClassification)

/*
this currently crashing the app
router.post("/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    invController.addClassification
)*/
module.exports = router;
