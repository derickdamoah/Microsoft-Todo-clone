import * as collectionDataService from "../services/collectionDataService.js"

import * as taskDataService from "../services/taskDataService.js"

export async function addItemGet(request, response) {
  try {

    const data = await collectionDataService.findOneCollectionItem(request.params.title)

    if (data != null) {
      const collectionData = await collectionDataService.findAllCollectionItems()
      const urlParameters = request.params
      response.status(200).render("AddItemPageView.ejs", {
        collectionData: collectionData,
        data: "",
        error: "",
        urlParameters: urlParameters,
      });
    } else {
      return next();
    }
  } catch (error) {
    const url = request.url;
    response.status(404).render("PageNotFoundView.ejs", { url: url });
  }
}

export async function addItemPost(request, response) {
  try {
    const collection = collectionDataService.findOneCollectionItem(request.params.title)
    
    if (collection !== null) {
      const createTask = await taskDataService.createOneTask(request.body.title, request.body.description)

      await collectionDataService.addTaskToCollection(request.params.title, createTask._id)

      response.status(200).redirect(`/${request.params.title}`);
    } else {
      response.redirect(request.url);
    }
  } catch (error) {
    const collectionData = await collectionDataService.findAllCollectionItems()
    const data = request.body
    const urlParameters = request.params
    response.render("AddItemPageView.ejs", {
      collectionData: collectionData,
      data: data,
      error: error,
      urlParameters: urlParameters,
    });
  }
}
