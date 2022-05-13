import { TaskCollectionModel } from "../models/TaskCollectionModel.js";
import { TodoModel } from "../models/TodoModel.js";

export async function viewItemPage(request, response) {
  try {
    const task = await TodoModel.findOne({ _id: request.params.id });
    const data = await TaskCollectionModel.findOne({
      collectionTitle: request.params.title,
    }).populate({ path: "data" });

    if (task !== null && data !== null) {
      const collectionData = await TaskCollectionModel.find({}).populate({
        path: "data",
      });

      const urlParameters = {
        title: request.params.title,
        id: request.params.id,
      };
      console.log(urlParameters);
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
