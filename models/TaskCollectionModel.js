import mongoose from "mongoose"

const TaskCollectionSchema = new mongoose.Schema({
    collectionTitle: {
        type: String,
        validate: {
            validator: async function(collectionTitle){
                const model = await TaskCollectionModel.findOne({collectionTitle})
                if(model){
                    if(this.id === model.id){
                        return true;
                    } return false;
                } return true;
            },
            message:props => `A collection with the title '${props.value}' alredy exists`
        },
        required: [true, "Collection name cannot be empty"]
    },
    data: [{type: mongoose.Schema.Types.ObjectId, ref: "Todo"}]
})

const TaskCollectionModel = mongoose.model("TaskCollection", TaskCollectionSchema)

export{ TaskCollectionModel}




















