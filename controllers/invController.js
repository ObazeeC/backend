const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ******************************************************
*  Build inventory by classification view
* ***************************************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ******************************************************
*  Build inventory by detail view
* ***************************************************** */
invCont.buildDetailView = async function(req, res, next){
  const inv_id = req.params.inv_id
  const data = await invModel.getVehicleById(inv_id)
  let nav = await utilities.getNav()
  const detailHtml =  utilities.buildDetailHTML(data)

  const name = `${data.inv_make} ${data.inv_model}`
  res.render("./inventory/detail",{
    title:name,
    nav,
    content: detailHtml
  })
}

/* *****************************************
* Build the management view 
* **************************************** */
invCont.buildManagementView = async function(req, res, next){
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management ",
    nav,
    message: req.flash("notice")
  })
}

/* *****************************************
* Build the Add classification view 
* **************************************** */
invCont.buildAddClassification = async function(req, res, next){
  let nav = await utilities.getNav()
  res.render("inventory/add-classification",{
    title:"Add Classification ",
    nav,
    errors: null,

  })
}

/* *****************************************
* Add classification into the database
* **************************************** */
invCont.addClassification = async function(req, res, next){
  let nav = await utilities.getNav()
  const {classification_name} = req.body

  const result = await invModel.addClassification(classification_name)

  if(result){
    req.flash("notice", "New classification added sucessfully.")
    res.redirect("/inv/")
  }else{
    req.flash("notice", "failed to add classification.")
    res.status(500).render("inventory/add-classification",{
      title: "Add Classification",
      nav,
      errors: null,
      classification_name
    })
  }
}
module.exports = invCont