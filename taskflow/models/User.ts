import mongoose, {Schema,models,model} from 'mongoose';
const schema = new Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},password:{type:String},image:String},{timestamps:true});
export default models.User || model('User',schema);
