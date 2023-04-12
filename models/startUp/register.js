import mongoose from "mongoose";

const startUpSchema = new mongoose.Schema({
    companyName: {
        type: String
    },
    email: {
        type: String,
        unique:true
    },
    otp: {
        type: String,
    },
    linkedIn: {
        type: String
    },
    sector: {
        type: String
    },
    location: {
        type: String
    },
    noOfEmployees: {
        type: String
    },
    companyVision: {
        type: String
    },
    founder:[
        {
            id:{type:Number},
            name:{type:String},
            bio:{type:String}
        }
    ],
    jobs: [
        {
            jobId: {
                type: String
            }
        }
    ]
})

export default mongoose.model('StartUp', startUpSchema)
