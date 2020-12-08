import React from 'react';
import moment from 'moment';
import { SetAlert, ClearAlert } from '../../../redux/alert/actions';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PFButton } from '../../styledComponents/Misc';

interface IProps {
  isClickable: boolean;
  time: number;
  record: (number | null)[];
  setRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  duration: number;
  startTime: Date;
  target: number;
  isFinished: boolean;
}

const GoalChartPassFail: React.FC<IProps> = ({
  isClickable,
  time,
  record,
  setRecord,
  duration,
  startTime,
  target,
  isFinished,
}) => {
  const dispatch = useDispatch();
  //set alert

  //event.target will get the icon and fail, but event.currentTarget will get the button every time
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isFinished || time < 0) {
      return;
    }
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
        <TableRow key={i}>
          <TableLabel>
            Week {i + 1}
            <TableLabelHideable>
              {' - '}
              {moment
                .utc(startTime)
                .add(7 * i, 'day')
                .format('MMM Do')}
            </TableLabelHideable>
          </TableLabel>
          <span>{buttons(i)}</span>
        </TableRow>
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
        list.push(<TableButton isFilled={true} key={loc}></TableButton>);
      } else {
        list.push(
          <TableButton
            isToday={time === loc && isClickable}
            isYesterday={time !== duration && time === loc + 1}
            onClick={isClickable ? handleClick : () => {}}
            key={loc}
            name={loc.toString()}
          >
            {record[loc] === 1 ? (
              <PFButton className='fas fa-check' isSuccess={true} />
            ) : time < week * 7 + i ? (
              ' '
            ) : (
              <PFButton className='fas fa-times' isSuccess={false} />
            )}
          </TableButton>
        );
      }
    }
    return list;
  };

  return <li>{table()}</li>;
};

export default GoalChartPassFail;

//#region Styled Components
const TableRow = styled.span`
  display: flex;
  justify-content: space-between;
  border: 0.125rem solid var(--primary-color);
  border-top: none;
`;

const TableLabel = styled.span`
  margin-left: 0.5rem;
  height: 1.7rem;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
`;

const TableLabelHideable = styled.span`
  @media (max-width: 32rem) {
    display: none;
  }
`;

const TableButton = styled.button<{
  isToday?: boolean;
  isYesterday?: boolean;
  isFilled?: boolean;
}>`
  display: inline-block;
  background-color: var(--secondary-color);
  height: 1.7rem;
  width: 1.7rem;
  font-size: 1.1rem;
  border: none;
  border-left: 0.125rem solid var(--primary-color);
  cursor: pointer;
  vertical-align: top;
  ${(props) =>
    props.isToday
      ? 'background-color: var(--today-color)'
      : props.isYesterday
      ? 'background-color: var(--yesterday-color)'
      : props.isFilled && 'background-color: var(--primary-color)'};
`;
//#endregion
