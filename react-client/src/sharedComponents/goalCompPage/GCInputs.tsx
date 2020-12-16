import React, { useMemo } from 'react';
import { useForm } from '../../util/formHook';
import Input from '../forms/Input';
import Textarea from '../forms/Textarea';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_DATE_NOT_PAST,
  VALIDATOR_WHOLE_WEEK,
  VALIDATOR_DURATION_NOT_PAST,
  VALIDATOR_DATE_NOT_AFTER_2100,
} from '../../util/validators';
import LoadingButton from '../forms/LoadingButton';
import Select from '../forms/Select';
import { TGoalRequest, TCompetitionRequest } from '../../redux/Models';
import { createFormValuesMap } from '../../util/mapFunctions';
import { getGoalTime, timeIsInPast } from '../../util/dateFunctions';
import { EGoalCategory, TGoal, TCompetition } from '../../types';
import { StandardContainer, PageTitle } from '../styledComponents/Misc';
import styled from 'styled-components';

interface IProps {
  dispatchAction: (goal: any) => void;
  goal?: TGoal;
  competition?: TCompetition;
  isGoal: boolean;
  isUpdate: boolean;
  isLoading: boolean;
}

const GCInputs: React.FC<IProps> = ({
  dispatchAction,
  goal,
  competition,
  isGoal,
  isUpdate,
  isLoading,
}) => {
  //gets initial values for useForm hook
  let formValues = useMemo(() => createFormValuesMap({ goal, competition }), [
    competition,
    goal,
  ]);

  //custom hook - memoize?
  const { handleInput, formState, createFormObject } = useForm({
    inputs: formValues,
    isValid: false,
  });

  //startTime and duration are used in validation
  let startTime = goal
    ? goal.startTime
    : competition
    ? competition.startTime
    : null;
  let duration = goal
    ? goal.duration
    : competition
    ? competition.duration
    : null;

  const isStarted = startTime ? timeIsInPast(startTime.toString()) : false;

  const isPassFail =
    formState.inputs.get('category')!.value === EGoalCategory.passfail;

  const isDifference =
    formState.inputs.get('category')!.value === EGoalCategory.difference;

  const isEveryDay =
    isPassFail && formState.inputs.get('daysPerWeek')!.value === '7';

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isPassFail && !isEveryDay) {
      //round up so number of days is divisible by seven
      let numberOfDays = +formState.inputs.get('duration')!.value;
      if (numberOfDays % 7 !== 0) {
        handleInput(
          'duration',
          (+numberOfDays - (+numberOfDays % 7) + 7).toString(),
          true
        );
      }
    }

    if (isGoal) {
      let newGoal: TGoalRequest = createFormObject();
      dispatchAction(newGoal);
    } else {
      let newCompetition: TCompetitionRequest = createFormObject();
      dispatchAction(newCompetition);
    }
  };

  return (
    <StandardContainer>
      <PageTitle>{`${isUpdate ? 'Modify' : 'Add'} ${
        isGoal ? 'Goal' : 'Competition'
      }`}</PageTitle>
      <FormContainer autoComplete='off'>
        <Input
          label='Name'
          name='name'
          type='text'
          value={formState.inputs.get('name')!.value}
          isValid={formState.inputs.get('name')!.isValid}
          handleInput={handleInput}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
        />
        <Textarea
          label='Description (optional)'
          name='description'
          handleInput={handleInput}
          value={formState.inputs.get('description')!.value}
        />
        <Input
          label='Start Date and Time (Local)'
          name='startTime'
          alias='Start date'
          type='datetime-local'
          isDisabled={isStarted}
          value={formState.inputs.get('startTime')!.value}
          isValid={formState.inputs.get('startTime')!.isValid}
          handleInput={handleInput}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_DATE_NOT_AFTER_2100(
              formState.inputs.get('startTime')!.value
            ),
            ...(isStarted
              ? []
              : [
                  VALIDATOR_DATE_NOT_PAST(
                    formState.inputs.get('startTime')!.value
                  ),
                ]),
          ]}
        />
        <Input
          label='Duration (days)'
          name='duration'
          type='text'
          pattern={/^\d{1,4}$/}
          value={formState.inputs.get('duration')!.value}
          isValid={formState.inputs.get('duration')!.isValid}
          handleInput={handleInput}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MIN(1),
            VALIDATOR_MAX(3653),
            ...(isStarted
              ? [
                  VALIDATOR_DURATION_NOT_PAST(
                    getGoalTime(startTime!, duration!).time
                  ),
                ]
              : []),
            ...(isPassFail && !isEveryDay ? [VALIDATOR_WHOLE_WEEK()] : []),
          ]}
          //whole week validation necessary if category changes to passfail and it is not an everyday category
          isRevalidate={isPassFail && !isEveryDay}
        />
        <Select
          label={`What kind of ${
            isGoal ? 'goal' : 'competition'
          } would you like?`}
          name='category'
          handleInput={handleInput}
          isDisabled={isStarted}
          options={[
            {
              value: EGoalCategory.passfail,
              text: `Pass/Fail (e.g. ${
                isGoal ? 'Stretch every morning' : 'Run the most days'
              })`,
            },
            {
              value: EGoalCategory.cumulative,
              text: `Total (e.g. ${
                isGoal ? 'Run 100 miles' : 'Run the most miles'
              })`,
            },
            {
              value: EGoalCategory.difference,
              text: `Difference (e.g. ${
                isGoal ? 'Lose 10 lbs' : 'Lose the most weight'
              })`,
            },
          ]}
          initialValue={formState.inputs.get('category')!.value}
        />
        {isDifference && isGoal && (
          <Input
            label={`What is your starting number?`}
            name='initialValue'
            alias='Starting value'
            type='text'
            pattern={/^\d{1,8}(?:()|(\.\d{0,2}))$/}
            isDisabled={isStarted}
            value={formState.inputs.get('initialValue')!.value}
            isValid={formState.inputs.get('initialValue')!.isValid}
            handleInput={handleInput}
            validators={[
              ...(isDifference
                ? [
                    VALIDATOR_REQUIRE(),
                    VALIDATOR_MIN(0),
                    VALIDATOR_MAX(0x7fffffff),
                  ]
                : []),
            ]}
          />
        )}
        {isPassFail && (
          <Select
            label={`How many days per week do you want ${
              isGoal ? 'participants ' : ''
            }to achieve the goal?`}
            name='daysPerWeek'
            handleInput={handleInput}
            isDisabled={isStarted}
            options={[
              { value: '7', text: 'Every day' },
              { value: '6', text: 'Six days a week' },
              { value: '5', text: 'Five days a week' },
              { value: '4', text: 'Four days a week' },
              { value: '3', text: 'Three days a week' },
              { value: '2', text: 'Two days a week' },
              { value: '1', text: 'One day a week' },
            ]}
            initialValue={formState.inputs.get('daysPerWeek')!.value}
          />
        )}
        {!isPassFail && isGoal && (
          <Input
            label={`What ${
              isDifference ? 'final' : 'total'
            } number do you want to achieve?`}
            name='target'
            type='text'
            pattern={/^\d{1,8}(?:()|(\.\d{0,2}))$/}
            value={formState.inputs.get('target')!.value}
            isValid={formState.inputs.get('target')!.isValid}
            handleInput={handleInput}
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MIN(0),
              VALIDATOR_MAX(0x7fffffff),
            ]}
          />
        )}
        {!isPassFail && (
          <Input
            label='Units (e.g. miles)'
            name='units'
            type='text'
            value={formState.inputs.get('units')!.value}
            isValid={formState.inputs.get('units')!.isValid}
            handleInput={handleInput}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
          />
        )}
        <Select
          name='isPrivate'
          label={`Who can see this ${isGoal ? 'goal' : 'competition'}?`}
          handleInput={handleInput}
          options={
            isGoal
              ? [
                  { value: 'false', text: 'My friends' },
                  { value: 'true', text: 'Only me' },
                ]
              : [
                  {
                    value: 'false',
                    text: 'Friends of participants',
                  },
                  {
                    value: 'true',
                    text: 'Only participants',
                  },
                ]
          }
          initialValue={formState.inputs.get('isPrivate')!.value}
        />
        {!isGoal && !isPassFail && (
          <Select
            name='isHighestScoreWins'
            label={'Scoring'}
            options={[
              {
                value: 'true',
                text: isDifference
                  ? 'Biggest increase wins'
                  : 'Highest total wins',
              },
              {
                value: 'false',
                text: isDifference
                  ? 'Biggest decrease wins'
                  : 'Lowest total wins',
              },
            ]}
            handleInput={handleInput}
            initialValue={
              formState.inputs.get('isHighestScoreWins')
                ? formState.inputs.get('isHighestScoreWins')!.toString()
                : 'false'
            }
          />
        )}
        <LoadingButton
          isLoading={isLoading}
          isDisabled={!formState.isValid}
          handleClick={handleSubmit}
          message={`${isUpdate ? 'Modify' : 'Add'} ${
            isGoal ? 'Goal' : 'Competition'
          }`}
        />
      </FormContainer>
    </StandardContainer>
  );
};

export default GCInputs;

const FormContainer = styled.form`
  margin: 1rem 0;
  button {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
`;
