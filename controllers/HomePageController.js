import * as collectionDataService from "../services/collectionDataService.js";

export async function homePage(request, response) {
  try {
    const data = await collectionDataService.findOneCollectionItem(request.params.title)

    if (data !== null) {
      const urlParameters = request.params
      const collectionData = await collectionDataService.findAllCollectionItems()

      response.status(200).render("HomePageView.ejs", {
        collectionData: collectionData,
        data: data,
        error: "",
        urlParameters: urlParameters,
      });
    } else {
      return error;
    }
  } catch (error) {
    const url = request.url;
    response.status(404).render("PageNotFoundView.ejs", { url: url });
  }
}
