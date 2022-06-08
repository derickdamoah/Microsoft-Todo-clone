import * as taskDataService from "../services/taskDataService.js"
import * as collectionDataService from "../services/collectionDataService.js"

export async function editItemPageGet(request, response) {
  try {
    const task = await taskDataService.findOneTask(request.params.id);
    const collectionItem = await collectionDataService.findOneCollectionItem(request.params.title)

    if (task !== null && collectionItem !== null) {
      const collectionData = await collectionDataService.findAllCollectionItems()

      const urlParameters = request.params

      response.render("EditItemPageView.ejs", {
        collectionData: collectionData,
        data: task,
        error: "",
        urlParameters: urlParameters,
      });
    } else {
      return next();
    }
  } catch (error) {
    response.status(404).render("PageNotFoundView.ejs", { url: request.url });
  }
}

export async function editItemPagePost(request, response) {
  try {
    try {
      await taskDataService.findOneTask(request.params.id);
    } catch (error) {
      response.redirect(request.url);
    }

    const collection = await collectionDataService.findOneCollectionItem(request.params.title)

    if (collection !== null) {

      await taskDataService.editTask(request.params.id, request.body)

      response.redirect(`/${request.params.title}`);
    } else {
      response.redirect(request.url);
    }
  } catch (error) {
    const collectionData = await collectionDataService.findAllCollectionItems

    const task = await taskDataService.findOneTask(request.params.id)

    const urlParameters = request.params
    response.render("EditItemPageView.ejs", {
      collectionData: collectionData,
      data: task,
      error: error,
      urlParameters: urlParameters,
    });
  }
}
