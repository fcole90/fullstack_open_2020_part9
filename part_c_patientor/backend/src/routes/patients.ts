import express from 'express';
import patientsService from '../services/patientsService';
import assertNewPatient from '../utils/assertNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  try {
    res.send(patientsService.getOnePatient(req.params.id));
  } catch (error) {
    res.status(404).send((error as Error).message);
  }
});

router.post('/', (req, res) => {
  try {
    res.send(patientsService.addPatient(assertNewPatient(req.body)));
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    res.send(patientsService.addEntryToPatient(req.params.id, req.body));
  } catch (error) {
    if ((error as Error).message.startsWith("Could not find any")) {
      res.status(404).send((error as Error).message);
    } else {
      res.status(400).send((error as Error).message);
      throw error;
    } 
    
  }
});

export default router;