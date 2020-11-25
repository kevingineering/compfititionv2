import React, { useState } from 'react';
import { EGoalType } from '../../../types';
import NumberInput from '../../../sharedComponents/NumberInput';

interface IProps {
  record: (number | null)[];
  time: number;
  units: string | undefined;
  type: string;
  setRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

//where users input progress for difference and cumulative goals
const GoalProgress: React.FC<IProps> = ({
  record,
  time,
  units,
  type,
  setRecord,
}) => {
  //note that with ==, null = undefined
  const initialValueToday: string =
    record[time] == null ? '' : record[time]!.toString();
  const initialValueYesterday: string =
    record[time - 1] == null ? '' : record[time - 1]!.toString();

  const [today, setToday] = useState(initialValueToday);
  const [yesterday, setYesterday] = useState(initialValueYesterday);

  //see NumberInput for input rules
  const handleToday = (input: string) => {
    setToday(input);
    setRecord(
      record.map((value, index) => {
        if (index === time) {
          if (input === '') {
            return type === EGoalType.difference ? null : 0;
          } else {
            return +input;
          }
        }
        return value;
      })
    );
  };

  const handleYesterday = (input: string) => {
    setYesterday(input);
    setRecord(
      record.map((value, index) => {
        if (index === time - 1) {
          if (input === '') {
            return 0;
          } else {
            return +input;
          }
        }
        return value;
      })
    );
  };

  return (
    <div className='lr-border'>
      <p className='table-info center bold'>Record Your Progress</p>
      <NumberInput
        message='Today: '
        value={today}
        handleValue={handleToday}
        units={units}
      />
      {time > 0 && type === EGoalType.cumulative && (
        <NumberInput
          message='Yesterday: '
          value={yesterday}
          handleValue={handleYesterday}
          units={units}
        />
      )}
      <hr />
    </div>
  );
};

export default GoalProgress;
