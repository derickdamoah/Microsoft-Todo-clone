import express from "express";
import * as addItemController from "../controllers/AddItemController.js"
import * as homePageController from "../controllers/HomePageController.js";
import * as viewPageController from "../controllers/ViewPageController.js"
import * as createTaskCollectionController from "../controllers/CreateTaskCollectionController.js";
import * as editItemController from "../controllers/EditItemController.js"
import * as deletePageController from "../controllers/DeletePageController.js"
import * as pageNotFoundController from "../controllers/PageNotFoundController.js"
import bodyParser from "body-parser"

const urlParser = bodyParser.urlencoded({extended: true})

const router = express.Router()

router.get("/:title", homePageController.homePage)

router.get("/:title/view-item/:id", viewPageController.viewItemPage)

router.get("/:title/add-item", addItemController.addItemGet)
router.post("/:title/add-item", urlParser, addItemController.addItemPost)

router.post("/:title/create-collection", urlParser, createTaskCollectionController.createTaskCollection)

router.get("/:title/edit-item/:id", editItemController.editItemPageGet)
router.post("/:title/edit-item/:id", urlParser, editItemController.editItemPagePost)

router.post("/:title/delete/:id", deletePageController.deleteItem)
router.post("/:title/delete-collection/:id", deletePageController.deleteCollection)

router.get("/", function(request, response) {response.redirect("/Tasks")})

router.get("/*",  pageNotFoundController.pageNotFound)
router.post("/*", pageNotFoundController.pageNotFound)

export {router}