import React, { useState } from 'react';
import LoadingButton from '../../../../sharedComponents/forms/LoadingButton';
import { Link } from 'react-router-dom';
import {
  UPDATE_PARTICIPANT_LEDGER_BUTTON,
  UPDATE_PARTICIPANT_TARGET_BUTTON,
  UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON,
  DELETE_COMPETITION_BUTTON,
} from '../../../../redux/buttonTypes';
import ToggleButtonModule from '../../../../sharedComponents/ToggleButtonModule';
import NumberInput from '../../../../sharedComponents/NumberInput';
import { TCompetition, EGoalType } from '../../../../types';
import { useDispatch } from 'react-redux';
import {
  DeleteCompetition,
  UpdateParticipantTarget,
  UpdateParticipantLedger,
  UpdateParticipantInitialValue,
} from '../../../../redux/competition/actions';

interface IProps {
  isStarted: boolean;
  isActive: boolean;
  isAdminView: boolean;
  loadingButton: string;
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  competition: TCompetition;
  initialValue: number | undefined;
  ledger: (number | null)[];
}

const CompButtons: React.FC<IProps> = ({
  isStarted,
  isActive,
  isAdminView,
  loadingButton,
  target,
  setTarget,
  competition,
  initialValue,
  ledger,
}) => {
  const [startValue, setStartValue] = useState<string>(
    initialValue ? initialValue.toString() : ''
  );
  const dispatch = useDispatch();

  const saveParticipantLedger = () => {
    dispatch(UpdateParticipantLedger({ ledger: ledger, id: competition.id }));
  };

  const setParticipantTarget = () => {
    dispatch(
      UpdateParticipantTarget({ compId: competition.id, value: +target })
    );
  };

  const saveParticipantInitialValue = () => {
    dispatch(
      UpdateParticipantInitialValue({
        compId: competition.id,
        value: +startValue,
      })
    );
  };

  const deleteCompetition = () => {
    dispatch(DeleteCompetition(competition.id));
  };

  return (
    <React.Fragment>
      {/* Save Button */}
      {isStarted && isActive && (
        <React.Fragment>
          <LoadingButton
            className='btn btn-block btn-primary'
            isInput={false}
            handleClick={() => saveParticipantLedger()}
            message='Save Progress'
            isLoading={loadingButton === UPDATE_PARTICIPANT_LEDGER_BUTTON}
          />
        </React.Fragment>
      )}
      {/* Initial Value Button */}
      {initialValue === null && competition.type === EGoalType.difference && (
        <React.Fragment>
          <ToggleButtonModule
            handleClick={() => {
              startValue !== '' && saveParticipantInitialValue();
            }}
            isLoading={
              loadingButton === UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON
            }
            topButton='Set Start Value'
            leftButton='Cancel'
            rightButton='Set Start Value'
          >
            <div className='padding-04 lr-border'>
              <p className='center bold'>Set Start Value</p>
              <p className='center'>
                The start value is your number at the beginning of the
                competition. Your final value will be subtracted from your start
                value when scoring the competition.
              </p>
              <NumberInput
                message='Start Value: '
                value={startValue}
                handleValue={(input) => {
                  setStartValue(input);
                }}
                units={competition.units}
              />
            </div>
          </ToggleButtonModule>
        </React.Fragment>
      )}
      {/* Personal Goal Button */}
      {isActive && competition.type !== EGoalType.passfail && (
        <React.Fragment>
          <ToggleButtonModule
            handleClick={setParticipantTarget}
            isLoading={loadingButton === UPDATE_PARTICIPANT_TARGET_BUTTON}
            topButton='Modify My Goal'
            leftButton='Cancel'
            rightButton='Set Target'
          >
            <div className='padding-04 lr-border'>
              <p className='center bold'>Modify Personal Goal</p>
              <p className='center'>
                Personal goals are private and cannot be seen by other users.
              </p>
              <NumberInput
                message='Target: '
                value={target}
                handleValue={(input) => {
                  setTarget(input);
                }}
                units={competition.units}
              />
            </div>
          </ToggleButtonModule>
        </React.Fragment>
      )}
      {/* Modify Button */}
      {isAdminView && isActive && (
        <React.Fragment>
          <p className='lr-border' />
          <Link
            to='/updatecompetition'
            className='btn btn-block btn-primary center'
          >
            Modify Competition
          </Link>
        </React.Fragment>
      )}
      {/* Delete Button */}
      {isAdminView && (
        <ToggleButtonModule
          handleClick={() => deleteCompetition()}
          isLoading={loadingButton === DELETE_COMPETITION_BUTTON}
          topButton='Delete Competition'
        >
          <span className='alert lr-border'>
            Are you sure you want to delete this competition? Deletions cannot
            be undone.
          </span>
        </ToggleButtonModule>
      )}
      {/* Closing line if no buttons */}
      {((!isActive && !isAdminView) ||
        (!isStarted && competition.type === EGoalType.passfail)) && <hr />}
    </React.Fragment>
  );
};

export default CompButtons;
