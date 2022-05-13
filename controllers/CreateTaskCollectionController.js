import { TaskCollectionModel } from "../models/TaskCollectionModel.js";
export async function createTaskCollection(request, response) {
  try {
    await TaskCollectionModel.create({
      collectionTitle: request.body.collectionTitle,
    });
    response.redirect(`/${request.body.collectionTitle}`);
  } catch (error) {
    const data = await TaskCollectionModel.findOne({
      collectionTitle: request.params.title,
    }).populate({ path: "data" });

    if (data !== null) {
      const collectionData = await TaskCollectionModel.find({}).populate({
        path: "data",
      });

      const urlParameters = { title: request.params.title };
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
