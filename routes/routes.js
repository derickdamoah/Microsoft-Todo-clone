import express from "express";
import {homePage} from "../controllers/HomePageController.js";
import {viewItemPage} from "../controllers/ViewPageController.js"
import {addItemGet, addItemPost} from "../controllers/AddItemController.js"
import { createTaskCollection } from "../controllers/CreateTaskCollectionController.js";
import {editItemPageGet, editItemPagePost} from "../controllers/EditItemController.js"
import {deleteItem, deleteCollection} from "../controllers/DeletePageController.js"
import {pageNotFound} from "../controllers/PageNotFoundController.js"
import bodyParser from "body-parser"
const urlParser = bodyParser.urlencoded({extended: true})

const router = express.Router()

router.get("/:title", (request, response) => homePage(request, response))

router.get("/:title/view-item/:id", (request, response) => viewItemPage(request, response))

router.get("/:title/add-item", (request, response) => addItemGet(request, response))
router.post("/:title/add-item", urlParser, (request, response) => addItemPost(request, response))

router.post("/:title/create-collection", urlParser, (request, response) => createTaskCollection(request, response))

router.get("/:title/edit-item/:id", (request, response) => editItemPageGet(request, response))
router.post("/:title/edit-item/:id", urlParser, (request, response) => editItemPagePost(request, response))

router.post("/:title/delete/:id", (request, response) => deleteItem(request, response))

router.post("/:title/delete-collection/:id", (request, response) => deleteCollection(request, response))

router.get("/*", (request, response) => pageNotFound(request, response))
router.post("/*", (request, response) => pageNotFound(request, response))

export {router}