import { TodoModel } from "../models/TodoModel.js";
import { TaskCollectionModel } from "../models/TaskCollectionModel.js";

export async function addItemGet(request, response) {
  try {
    const data = await TaskCollectionModel.findOne({
      collectionTitle: request.params.title,
    }).populate({ path: "data" });

    if (data != null) {
      const collectionData = await TaskCollectionModel.find({}).populate({
        path: "data",
      });
      const urlParameters = {
        title: request.params.title,
        id: request.params.id,
      };
      response.render("AddItemPageView.ejs", {
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
    const collection = await TaskCollectionModel.findOne({
      collectionTitle: request.params.title,
    });
    if (collection !== null) {
      const createTask = await TodoModel.create({
        title: request.body.title,
        description: request.body.description,
      });

      await collection.data.push(createTask._id);
      await collection.save();
      response.redirect(`/${request.params.title}`);
    } else {
      response.redirect(request.url);
    }
  } catch (error) {
    const collectionData = await TaskCollectionModel.find({}).populate({
      path: "data",
    });

    const data = {
      title: request.body.title,
      description: request.body.description,
    };
    const urlParameters = {
      title: request.params.title,
    };
    response.render("AddItemPageView.ejs", {
      collectionData: collectionData,
      data: data,
      error: error,
      urlParameters: urlParameters,
    });
  }
}
