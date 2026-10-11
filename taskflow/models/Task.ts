import mongoose,{Schema,models,model} from 'mongoose';
const schema = new Schema({title:{type:String,required:true},description:{type:String,default:''},status:{type:String,enum:['pending','in-progress','completed'],default:'pending'},userId:{type:Schema.Types.ObjectId,ref:'User',required:true,index:true}},{timestamps:true});
export default models.Task || model('Task',schema);
