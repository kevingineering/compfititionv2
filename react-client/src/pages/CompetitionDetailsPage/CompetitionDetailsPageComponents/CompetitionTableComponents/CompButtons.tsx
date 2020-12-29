import React, { useState } from 'react';
import LoadingButton from '../../../../sharedComponents/forms/LoadingButton';
import {
  UPDATE_PARTICIPANT_LEDGER_BUTTON,
  UPDATE_PARTICIPANT_TARGET_BUTTON,
  UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON,
  DELETE_COMPETITION_BUTTON,
} from '../../../../redux/buttonTypes';
import ToggleButtonModule from '../../../../sharedComponents/misc/ToggleButtonModule';
import NumberInput from '../../../../sharedComponents/forms/NumberInput';
import { TCompetition, EGoalCategory } from '../../../../types';
import { useDispatch } from 'react-redux';
import {
  UpdateParticipantTarget,
  UpdateParticipantLedger,
  UpdateParticipantInitialValue,
} from '../../../../redux/aggregateCompetition/participant/actions';
import { DeleteCompetition } from '../../../../redux/aggregateCompetition/competition/actions';
import {
  EmptyBorderedSpace,
  MessageInBorderedSpace,
  CollectionLink,
} from '../../../../sharedComponents/styledComponents/Misc';
import { ButtonNoMargin } from '../../../../sharedComponents/styledComponents/Button';
import styled from 'styled-components';

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
    dispatch(
      UpdateParticipantLedger({
        ledger: ledger,
        goalId: competition.competitionId,
      })
    );
  };

  const setParticipantTarget = () => {
    dispatch(
      UpdateParticipantTarget({
        competitionId: competition.competitionId,
        value: +target,
      })
    );
  };

  const saveParticipantInitialValue = () => {
    dispatch(
      UpdateParticipantInitialValue({
        competitionId: competition.competitionId,
        value: +startValue,
      })
    );
  };

  const deleteCompetition = () => {
    dispatch(DeleteCompetition(competition.competitionId));
  };

  return (
    <React.Fragment>
      {/* Save Button */}
      {isStarted && isActive && (
        <React.Fragment>
          <LoadingButton
            styles={ButtonNoMargin}
            handleClick={() => saveParticipantLedger()}
            message='Save Progress'
            isLoading={loadingButton === UPDATE_PARTICIPANT_LEDGER_BUTTON}
          />
        </React.Fragment>
      )}
      {/* Initial Value Button */}
      {initialValue === null &&
        competition.category === EGoalCategory.difference && (
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
              isDanger={false}
            >
              <hr />
              <ModuleMessage>
                <p>
                  <strong>Set Start Value</strong>
                </p>
                <p>
                  The start value is your number at the beginning of the
                  competition. Your final value will be subtracted from your
                  start value when scoring the competition.
                </p>
                <NumberInput
                  message='Start Value: '
                  value={startValue}
                  handleValue={(input) => {
                    setStartValue(input);
                  }}
                  units={competition.units}
                />
              </ModuleMessage>
            </ToggleButtonModule>
          </React.Fragment>
        )}
      {/* Personal Goal Button */}
      {isActive && competition.category !== EGoalCategory.passfail && (
        <React.Fragment>
          <ToggleButtonModule
            handleClick={setParticipantTarget}
            isLoading={loadingButton === UPDATE_PARTICIPANT_TARGET_BUTTON}
            topButton='Modify My Goal'
            leftButton='Cancel'
            rightButton='Set Target'
            isDanger={false}
          >
            <ModuleMessage>
              <p>
                <strong>Modify Personal Goal</strong>
              </p>
              <p>
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
            </ModuleMessage>
          </ToggleButtonModule>
        </React.Fragment>
      )}
      {/* Modify Button */}
      {isAdminView && isActive && (
        <React.Fragment>
          <EmptyBorderedSpace />
          <CollectionLink to='/updatecompetition'>
            Modify Competition
          </CollectionLink>
        </React.Fragment>
      )}
      {/* Delete Button */}
      {isAdminView && (
        <ToggleButtonModule
          handleClick={() => deleteCompetition()}
          isLoading={loadingButton === DELETE_COMPETITION_BUTTON}
          topButton='Delete Competition'
        >
          <MessageInBorderedSpace>
            Are you sure you want to delete this competition? Deletions cannot
            be undone.
          </MessageInBorderedSpace>
        </ToggleButtonModule>
      )}
      {/* Closing line if no buttons */}
      {/* TEST */}
      {((!isActive && !isAdminView) ||
        (!isStarted &&
          competition.category === EGoalCategory.passfail &&
          !isAdminView)) && <hr />}
    </React.Fragment>
  );
};

export default CompButtons;

const ModuleMessage = styled.div`
  padding: 0.4rem;
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
  margin: 0;
  min-height: 0.5rem;
  p {
    text-align: center;
    align-items: center;
  }
`;
