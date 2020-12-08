import { FormInput, EFormInputType } from './formHook';
import { EGoalType, TGoal } from '../types';

interface ICreateParams {
  goal?: TGoal;
}

//TODO - competition
//creates map of form values used with useForm hook for adding goals and competitions
export const createFormValuesMap = ({ goal }: ICreateParams) => {
  console.log(goal && goal.startTime!.toString().substr(0, 16));
  let formValues: Map<string, FormInput> =
    goal === undefined
      ? new Map([
          ['name', new FormInput()],
          ['description', new FormInput('', true, EFormInputType.string)],
          ['startTime', new FormInput()],
          ['duration', new FormInput('', false, EFormInputType.number)],
          [
            'type',
            new FormInput(EGoalType.passfail, true, EFormInputType.string),
          ],
          ['target', new FormInput('', false, EFormInputType.number)],
          ['isPrivate', new FormInput('true', true, EFormInputType.boolean)],
        ])
      : new Map([
          ['name', new FormInput(goal.name, true)],
          [
            'description',
            new FormInput(goal.description, true, EFormInputType.string),
          ],
          [
            'startTime',
            new FormInput(goal.startTime!.toString().substr(0, 16), true),
          ],
          [
            'duration',
            new FormInput(
              goal.duration.toString(),
              true,
              EFormInputType.number
            ),
          ],
          ['type', new FormInput(goal.type, true, EFormInputType.string)],
          [
            'target',
            new FormInput(goal.target.toString(), false, EFormInputType.number),
          ],
          [
            'isPrivate',
            new FormInput(`${goal.isPrivate}`, true, EFormInputType.boolean),
          ],
        ]);

  if (goal !== undefined) {
    if (formValues.get('type')!.value === EGoalType.passfail) {
    } else if (formValues.get('type')!.value === EGoalType.cumulative) {
      formValues.set('units', new FormInput(`${goal.units!}`));
    } else if (formValues.get('type')!.value === EGoalType.difference) {
      formValues.set('units', new FormInput(`${goal.units}`));
      formValues.set(
        'initialValue',
        new FormInput(`${goal.initialValue}`, false, EFormInputType.number)
      );
    }
  }

  return formValues;
};

interface IUpdateParams {
  map: Map<string, FormInput>;
  type: string;
  isGoal: boolean;
}

//TODO - competition
//creates map of form values used with useForm hook for updating goals and competitions
export const updateFormValuesMap = ({ map, type, isGoal }: IUpdateParams) => {
  let formValues = map;
  if (type === EGoalType.passfail) {
    // if (!isGoal) {
    //   formValues.set('target', new FormInput('', false, EFormInputType.number));
    // }
    formValues.delete('units');
    formValues.delete('initialValue');
  } else {
    //reset total to empty and add units if type had been passfail
    if (map.get('type')!.value === EGoalType.passfail) {
      formValues.set('target', new FormInput('', false, EFormInputType.number));
      formValues.set('units', new FormInput());
    }
    // if (!isGoal) {
    //   formValues.delete('target');
    // }
    //add or remove initial value
    if (type === EGoalType.cumulative) {
      formValues.delete('initialValue');
    } else {
      formValues.set(
        'initialValue',
        new FormInput('', false, EFormInputType.number)
      );
    }
  }
  formValues.set('type', new FormInput(type, true));
  return formValues;
};
