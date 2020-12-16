import { FormInput, EFormInputType } from './formHook';
import { EGoalCategory, TGoal, TCompetition } from '../types';

interface ICreateMapParams {
  goal?: TGoal;
  competition?: TCompetition;
}

//creates map of form values used with useForm hook for adding goals and competitions
export const createFormValuesMap = ({
  goal,
  competition,
}: ICreateMapParams) => {
  //if not goal or competition, create empty map
  if (goal === undefined && competition === undefined) {
    let formValues: Map<string, FormInput> = new Map([
      ['name', new FormInput()],
      ['description', new FormInput('', true, EFormInputType.string)],
      ['startTime', new FormInput()],
      ['duration', new FormInput('', false, EFormInputType.number)],
      [
        'category',
        new FormInput(EGoalCategory.passfail, true, EFormInputType.string),
      ],
      ['units', new FormInput('', true, EFormInputType.string)],
      ['daysPerWeek', new FormInput('7', true, EFormInputType.number)],
      ['isPrivate', new FormInput('true', true, EFormInputType.boolean)],
      ['target', new FormInput('0', true, EFormInputType.number)],
      ['initialValue', new FormInput('0', true, EFormInputType.number)],
      [
        'isHighestScoreWins',
        new FormInput('true', true, EFormInputType.boolean),
      ],
    ]);
    return formValues;
  }

  //if goal or competition exists create map with valutes
  let name = goal ? goal!.name : competition!.name;
  let description = goal ? goal!.description : competition!.description;
  let startTime = goal ? goal!.startTime : competition!.startTime;
  let duration = goal ? goal!.duration : competition!.duration;
  let category = goal ? goal!.category : competition!.category;
  let units = goal ? goal!.units : competition!.units;
  let daysPerWeek = goal ? goal!.daysPerWeek : competition!.daysPerWeek;
  let isPrivate = goal ? goal!.daysPerWeek : competition!.daysPerWeek;
  let target = goal ? goal!.target : 0;
  let initialValue = goal ? goal!.initialValue : 0;
  let isHighestScoreWins = competition
    ? competition!.isHighestScoreWins
    : false;

  let formValues: Map<string, FormInput> = new Map([
    ['name', new FormInput(name, true)],
    ['description', new FormInput(description, true, EFormInputType.string)],
    ['startTime', new FormInput(startTime!.toString().substr(0, 16), true)],
    [
      'duration',
      new FormInput(duration.toString(), true, EFormInputType.number),
    ],
    ['category', new FormInput(category, true, EFormInputType.string)],
    ['units', new FormInput(units, true, EFormInputType.string)],
    [
      'daysPerWeek',
      new FormInput(`${daysPerWeek}`, true, EFormInputType.number),
    ],
    ['isPrivate', new FormInput(`${isPrivate}`, true, EFormInputType.boolean)],
    ['target', new FormInput(`${target}`, true, EFormInputType.number)],
    [
      'initialValue',
      new FormInput(`${initialValue}`, true, EFormInputType.number),
    ],
    [
      'isHighestScoreWins',
      new FormInput(`${isHighestScoreWins}`, true, EFormInputType.boolean),
    ],
  ]);

  return formValues;
};
