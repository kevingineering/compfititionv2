import React from 'react';
import { Link } from 'react-router-dom';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import {
  UPDATE_GOAL_LEDGER_BUTTON,
  DELETE_GOAL_BUTTON,
} from '../../../redux/buttonTypes';
import ToggleButtonModule from '../../../sharedComponents/ToggleButtonModule';

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
      {isStarted && isOwner && isActive && (
        <React.Fragment>
          {/* TODO - LOADING SPINNER AND ALERT*/}
          <LoadingButton
            className='btn btn-block btn-primary'
            isInput={false}
            handleClick={handleSave}
            message='Save Goal'
            isLoading={loadingButton === UPDATE_GOAL_LEDGER_BUTTON}
          />
          <p className='lr-border' />
        </React.Fragment>
      )}
      {/* Modify Button */}
      {isActive && (
        <React.Fragment>
          <Link to='/updategoal' className='btn btn-block btn-primary center'>
            Modify Goal
          </Link>
        </React.Fragment>
      )}
      {/* Delete Button */}
      <ToggleButtonModule
        handleClick={deleteGoal}
        isLoading={loadingButton === DELETE_GOAL_BUTTON}
        topButton='Delete Goal'
      >
        <span className='alert lr-border'>
          Are you sure you want to delete this goal? Deletions cannot be undone.
        </span>
      </ToggleButtonModule>
    </React.Fragment>
  );
};

export default GoalButtons;
