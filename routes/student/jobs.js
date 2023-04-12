import express from "express"
const router = express.Router()
import Jobs from '../../models/student/jobs.js';
import Student from '../../models/student/register.js';
import { ObjectId } from 'mongodb';

//Get
router.get('/', async (req, res) => {
    try {
        var jobs;
        if (req.query.type === undefined) {
            jobs = await Jobs.find({ isActive: "true" }).sort({"createdAt":-1,"deadline":1})
        }
        else {
            jobs = await Jobs.find({ $and: [{ type: req.query.type }] }).sort({"createdAt":-1,"deadline":1})
        }
        res.status(200).json({
            status: 200,
            length: jobs.length,
            jobs: jobs
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

//Get
router.get('/:jobId', async (req, res) => {
    try {
        const idToSearch = new ObjectId(req.params.jobId);
        const job = await Jobs.findById(idToSearch);
        res.status(200).json({
            status: 200,
            jobDetails: job
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

//PUT
router.put('/:jobId', async (req, res) => {
    try {
        const jobIdToSearch = new ObjectId(req.params.jobId);
        const updatedjob = await Jobs.findByIdAndUpdate(jobIdToSearch, {
            $push: {
                "studentsApplied": {
                    "studentId": req.body.studentId,
                    "name": req.body.name,
                    "email": req.body.email,
                    "course":req.body.course,
                    "department":req.body.department,
                    "year":req.body.year,
                    "cgpa":req.body.cgpa,
                    "resumeLink": req.body.resumeLink,
                    "linkedIn":req.body.linkedIn,
                    "whyShouldWeHireYou":req.body.whyShouldWeHireYou,
                    "status": req.body.status
                }
            }
        }, { 'new': true })

        const studentIdToSearch = new ObjectId(req.body.studentId);
        const updatedStudent = await Student.findByIdAndUpdate(studentIdToSearch, {
            $push: {
                "jobsApplied": {
                    "jobId": req.params.jobId,
                    "status": req.body.status
                }
            }
        }, { 'new': true })

        res.status(200).json({
            status: 200,
            studentDetails: updatedStudent,
            jobDetails: updatedjob
        })

    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

export default router