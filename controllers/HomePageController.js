import { TaskCollectionModel } from "../models/TaskCollectionModel.js";

export async function homePage(request, response) {
  try {
    const data = await TaskCollectionModel.findOne({
      collectionTitle: request.params.title,
    }).populate({ path: "data" });

    if (data !== null) {
      const urlParameters = { title: request.params.title };
      const collectionData = await TaskCollectionModel.find({}).populate({
        path: "data",
      });
      response.render("HomePageView.ejs", {
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
