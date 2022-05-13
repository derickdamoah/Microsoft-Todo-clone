import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        validate: {
            validator: async function(title) {
                const model = await TodoModel.findOne({title})
                if(model){
                    if(this.id === model.id){
                        return true
                    } return false
                } return true

            },
            message: props => `Title '${props.value}' already exists`
        },
        required: [true, "Title cannot be empty"]
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty"]
    }
})

mongoose.connect('mongodb://localhost:27017/todo') 

const TodoModel = mongoose.model("Todo", TodoSchema)

export {TodoModel}