import React from 'react';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import {
  UPDATE_GOAL_LEDGER_BUTTON,
  DELETE_GOAL_BUTTON,
} from '../../../redux/buttonTypes';
import {
  EmptyBorderedSpace,
  CollectionLink,
  MessageInBorderedSpace,
} from '../../../sharedComponents/styledComponents/Misc';
import ToggleButtonModule from '../../../sharedComponents/misc/ToggleButtonModule';
import { ButtonNoMargin } from '../../../sharedComponents/styledComponents/Button';

interface IProps {
  isStarted: boolean;
  isOwner: boolean;
  isActive: boolean;
  loadingButton: string;
  deleteGoal: () => void;
  handleSave: () => void;
}

//Buttons for goal page - buttons shown are dependent on who is viewing goal and time of goal
const GoalButtons: React.FC<IProps> = ({
  isStarted,
  isOwner,
  isActive,
  loadingButton,
  deleteGoal,
  handleSave,
}) => {
  return (
    <React.Fragment>
      {/* SaveButton */}
      {/* TEST */}
      {isStarted && isOwner && isActive && (
        <React.Fragment>
          <LoadingButton
            styles={ButtonNoMargin}
            handleClick={handleSave}
            message='Save Progress'
            isLoading={loadingButton === UPDATE_GOAL_LEDGER_BUTTON}
          />
          <EmptyBorderedSpace />
        </React.Fragment>
      )}
      {/* Modify Button */}
      {isActive && (
        <React.Fragment>
          <CollectionLink to='/updategoal'>Modify Goal</CollectionLink>
        </React.Fragment>
      )}
      {/* Delete Button */}
      <ToggleButtonModule
        handleClick={deleteGoal}
        isLoading={loadingButton === DELETE_GOAL_BUTTON}
        topButton='Delete Goal'
      >
        <MessageInBorderedSpace>
          Are you sure you want to delete this goal? Deletions cannot be undone.
        </MessageInBorderedSpace>
      </ToggleButtonModule>
    </React.Fragment>
  );
};

export default GoalButtons;
