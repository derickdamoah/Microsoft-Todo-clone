import * as taskDataService from "../services/taskDataService.js"
import * as collectionDataService from "../services/collectionDataService.js"

export async function deleteItem(request, response) {
  try {

    const collection = await collectionDataService.findOneCollectionItem(request.params.title);

    if (collection !== null) {
      const deleteTask = await taskDataService.deleteOneTask(request.params.id);
      
      await collectionDataService.removeTaskFromCollection(request.params.title, deleteTask._id)

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
    const collectionData = await collectionDataService.findOneCollectionItem(request.params.title);

    if (collectionData !== null) {
      await collectionData.data.map(function(id){
        collectionDataService.removeTaskFromCollection(request.params.title, id)
        taskDataService.deleteOneTask(id)
      })

      await collectionDataService.deleteCollection(request.params.id)
      response.redirect("/Tasks");
    } else {
      response.redirect(request.params.url);
    }
  } catch (error) {
    response.redirect(`/${request.params.title}`);
  }
}
