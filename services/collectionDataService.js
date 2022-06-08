import { TaskCollectionModel } from "../models/TaskCollectionModel.js";

export async function findOneCollectionItem(collectionTitle){
    return await TaskCollectionModel.findOne({collectionTitle: collectionTitle}).populate({path: "data"})
}

export async function findAllCollectionItems(){
    return await TaskCollectionModel.find({}).populate({path: "data"})
}

export async function createCollection(collectionTitle){
    return await TaskCollectionModel.create({
        collectionTitle: collectionTitle
    })
}

export async function deleteCollection(id){
    return await TaskCollectionModel.findOneAndDelete({
        _id: id
    })
}

export async function addTaskToCollection(collectionTitle, id){
    return await TaskCollectionModel.findOneAndUpdate(
        {collectionTitle: collectionTitle},
        {$push: {data: id}}
    )
}

export async function removeTaskFromCollection(collectionTitle, id){
    return await TaskCollectionModel.findOneAndUpdate(
        {collectionTitle: collectionTitle},
        {$pull: {data: id}}
    )
}

