import { TaskCollectionModel } from "../models/TaskCollectionModel.js";
import { TodoModel } from "../models/TodoModel.js";

export async function editItemPageGet(request, response) {
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
    const url = request.url;
    response.status(404).render("PageNotFoundView.ejs", { url: url });
  }
}

export async function editItemPagePost(request, response) {
  try {
    try {
      await TodoModel.findOne({ _id: request.params.id });
    } catch (error) {
      response.redirect(request.url);
    }

    const collection = await TaskCollectionModel.findOne({
      collectionTitle: request.params.title,
    });

    if (collection !== null) {
      const query = { _id: request.params.id };
      const update = {
        title: request.body.title,
        description: request.body.description,
      };
      const validator = { runValidators: true, context: "query" };
      await TodoModel.findOneAndUpdate(query, update, validator).exec();
      response.redirect(`/${request.params.title}`);
    } else {
      response.redirect(request.url);
    }
  } catch (error) {
    const collectionData = await TaskCollectionModel.find({}).populate({
      path: "data",
    });
    const task = await TodoModel.findOne({ _id: request.params.id });

    const urlParameters = {
      title: request.params.title,
      id: request.params.id,
    };

    response.render("EditItemPageView.ejs", {
      collectionData: collectionData,
      data: task,
      error: error,
      urlParameters: urlParameters,
    });
  }
}
