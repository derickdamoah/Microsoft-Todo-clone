import * as taskDataService from "../services/taskDataService.js"
import * as collectionDataService from "../services/collectionDataService.js"

export async function viewItemPage(request, response) {
  try {
    const task = await taskDataService.findOneTask(request.params.id);
    const data = await collectionDataService.findOneCollectionItem(request.params.title)

    if (task !== null && data !== null) {
      const collectionData = collectionDataService.findAllCollectionItems()

      const urlParameters = request.params

      response.render("ViewItemPageView.ejs", {
        collectionData: collectionData,
        data: task,
        urlParameters: urlParameters,
        error: "",
      });
    } else {
      return next();
    }
  } catch (error) {
    const url = request.url;
    response.status(404).render("PageNotFoundView.ejs", { url: url });
  }
}
