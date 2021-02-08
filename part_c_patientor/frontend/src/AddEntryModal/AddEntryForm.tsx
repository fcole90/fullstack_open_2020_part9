import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, GenderSelectField } from '../components/FormFields';
import { BaseEntry, NewEntry, DateString, TemporaryFormType,
        HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry,
        HealthCheckRating, 
        Discharge,
        Entry} from '../types';


interface Props {
  onSubmit: (values: TemporaryFormType) => void;
  onCancel: () => void;
}


const entryTypeOptions: { value: Entry['type']; label: string }[] = [
  { value: "HealthCheck", label: "Health check"},
  { value: "OccupationalHealthcare", label: "Occupational healthcare"},
  { value: "Hospital", label: "Hospital"},
];


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [formType, setFromType] = useState<NewEntry['type']>('HealthCheck');

  const baseValues: Omit<BaseEntry, 'id'> = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
  };

  const healthCheckValues: Omit<HealthCheckEntry, 'id'> = {
    ...baseValues,
    type: 'HealthCheck',
    healthCheckRating: '' as unknown as HealthCheckRating
  };

  const hospitalValues: Omit<HospitalEntry, 'id'> = {
    ...baseValues,
    type: 'Hospital',
    discharge: '' as unknown as Discharge
  };

  return (
    <Formik
      initialValues={
        formType === 'HealthCheck'
        ? healthCheckValues
        : hospitalValues
      }
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <GenderSelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
            />
            <select value={formType} onChange={(event) => setFromType(event.target.value as NewEntry['type'])}>
              <option value="HealthCheck">Health check</option>
              <option value="OccupationalHealthcare">Occupational healthcare</option>
              <option value="Hospital">Hospital</option>
            </select>
            <Field
              label="Description"
              placeholder="describe the entry"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name Surname"
              name="date"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            {
              formType === 'HealthCheck'
              ? <Field
                  label="Health Check Rating"
                  placeholder="1-4"
                  name="healthCheckRating"
                  component={TextField}
                />
              : <Field
                  label="Discharge"
                  placeholder="plof"
                  name="discharge"
                  component={TextField}
                />
            }


            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
