import * as collectionDataService from "../services/collectionDataService.js"

export async function createTaskCollection(request, response) {
  try {

    const createCollection = await collectionDataService.createCollection(request.body.collectionTitle)

    response.redirect(`/${createCollection.collectionTitle}`);

  } catch (error) {

    const data = await collectionDataService.findOneCollectionItem(request.params.title)

    if (data !== null) {
      const collectionData = await collectionDataService.findAllCollectionItems()

      const urlParameters = request.params;
      response.render("HomePageView.ejs", {
        collectionData: collectionData,
        data: data,
        error: error,
        urlParameters: urlParameters,
      });
    } else {
      response.redirect(request.url);
    }
  }
}
