import {Router} from 'express';
import {getAllProblems} from '../controllers/problems.controller';
// import {getAllSubmissions, getSubmissionById} from '../controllers/submissions.controller';

const router = Router();


router.get('/problems', getAllProblems);
// router.get('/submissions', getAllSubmissions);
// router.get('/submissions/:id', getSubmissionById);