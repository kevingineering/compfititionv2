import React from 'react';
import moment from 'moment';
import { SetAlert, ClearAlert } from '../../../../redux/alert/actions';
import { useDispatch } from 'react-redux';

interface IProps {
  isClickable: boolean;
  time: number;
  record: (number | null)[];
  setRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  duration: number;
  startDate: Date;
  target: number;
}

const GoalChartPassFail: React.FC<IProps> = ({
  isClickable,
  time,
  record,
  setRecord,
  duration,
  startDate,
  target,
}) => {
  const dispatch = useDispatch();
  //set alert

  //event.target will get the icon and fail, but event.currentTarget will get the button every time
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let clickLoc = parseInt(event.currentTarget.name);
    if (time === clickLoc || time === clickLoc + 1) {
      dispatch(ClearAlert());
      setRecord(
        record.map((value, index) => {
          if (index === clickLoc) {
            if (value === 0) {
              value = 1;
            } else value = 0;
          }
          return value;
        })
      );
    } else {
      dispatch(SetAlert('You can only record data for today and yesterday.'));
    }
  };

  //create table
  const table = () => {
    let list = [];
    for (let i = 0; i < duration / 7; i++) {
      list.push(
        <span className='table-row' key={i}>
          <span className='table-label'>
            Week {i + 1}
            <span className='hide-sm'>
              {' - '}
              {moment
                .utc(startDate)
                .add(7 * i, 'day')
                .format('MMM Do')}
            </span>
          </span>
          <span>{buttons(i)}</span>
        </span>
      );
    }
    return list;
  };

  //create buttons for table
  const buttons = (week: number) => {
    let list = [];
    for (let i = 0; i < target; i++) {
      let loc = week * target + i;
      if (duration <= loc) {
        list.push(<button className='table-btn-disabled' key={loc}></button>);
      } else {
        list.push(
          <button
            className={`table-btn ${
              time === loc && isClickable
                ? 'table-btn-today'
                : time !== duration && time === loc + 1
                ? 'table-btn-yesterday'
                : 'disabled-opaque'
            }`}
            onClick={isClickable ? handleClick : () => {}}
            key={loc}
            name={loc.toString()}
          >
            {record[loc] === 1 ? (
              <i className='fas fa-check success-color' />
            ) : time < week * 7 + i ? (
              ' '
            ) : (
              <i className='fas fa-times danger-color' />
            )}
          </button>
        );
      }
    }
    return list;
  };

  return <li>{table()}</li>;
};

export default GoalChartPassFail;
