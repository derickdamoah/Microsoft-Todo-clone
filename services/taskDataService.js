import { TaskCollectionModel } from "../models/TaskCollectionModel.js";
import { TodoModel } from "../models/TodoModel.js";

export async function findOneTask(id) {
    return await TodoModel.findOne({
      _id: id,
    });
}


export async function createOneTask(title, description){
  return await TodoModel.create({
    title: title, description: description, 
  });
}

export async function deleteOneTask(id){
  return await TodoModel.findOneAndDelete({_id: id})
}

export async function editTask(id, requestBody){
  return await TodoModel.findByIdAndUpdate(
    {_id: id},
    {title: requestBody.title, description: requestBody.description},
    {runValidators: true, context: "query"}
  ).exec()
}