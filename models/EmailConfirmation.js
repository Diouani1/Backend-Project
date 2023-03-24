import mongoose from 'mongoose';


const { Schema, model } = mongoose;


const confirmationSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true,
        unique: true
    }
});

// define the model
const EmailConfirmation = model('emailConfirmation', confirmationSchema);

export default EmailConfirmation;