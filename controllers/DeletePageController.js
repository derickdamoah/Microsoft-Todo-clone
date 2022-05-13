import { TaskCollectionModel } from "../models/TaskCollectionModel.js";
import { TodoModel } from "../models/TodoModel.js";

export async function deleteItem(request, response) {
  try {
    const collection = await TaskCollectionModel.findOne({
      collectionTitle: request.params.title,
    });
    if (collection !== null) {
      await TodoModel.findOneAndDelete({ _id: request.params.id });

      const index = await collection.data.indexOf(request.params.id);
      await collection.data.splice(index, 1);
      await collection.save();
      response.redirect(`/${request.params.title}`);
    } else {
      response.redirect(request.url);
    }
  } catch (error) {
    response.redirect(`/${request.params.title}`);
  }
}

export async function deleteCollection(request, response) {
  try {
    const data = await TaskCollectionModel.findOne({
      collectionTitle: request.params.title,
    });

    if (data !== null) {
      const allTasks = await TaskCollectionModel.findOne({
        _id: request.params.id,
      });
      await allTasks.data.map(function (id) {
        const index = allTasks.data.indexOf(id);
        allTasks.data.splice(index, 1);
        allTasks.save();
        TodoModel.findOneAndDelete({ _id: id });
      });

      await TaskCollectionModel.findOneAndDelete({ _id: request.params.id });
      response.redirect("/Tasks");
    } else {
      response.redirect(request.params.url);
    }
  } catch (error) {
    response.redirect(`/${request.params.title}`);
  }
}
