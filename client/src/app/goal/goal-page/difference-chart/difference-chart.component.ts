import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../shared/models/goal';
import { GoalService } from '../../goal.service';

@Component({
  selector: 'app-difference-chart',
  templateUrl: './difference-chart.component.html',
  styleUrls: ['./difference-chart.component.css'],
})
export class DifferenceChartComponent implements OnInit {
  goal: IGoal;
  time: number;
  isComplete: boolean;
  dataPoints: any[];
  record: any[];
  options: any;
  colNames: any;
  // @Input() isOwner: boolean;

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.goal = this.goalService.goal;
    this.time = this.goalService.time;
    this.isComplete = this.goalService.isComplete;
    this.record = this.goalService.record;
    this.options = {
      chartArea: {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      },
      // axisTitlesPosition: 'none',
      hAxis: {
        textPosition: 'none',
        baselineColor: 'none',
        gridlines: {
          color: 'transparent',
        },
        viewWindow: {
          min: 0,
        },
      },
      maxValue:
        this.time === this.goal.duration ? this.goal.duration : this.time + 1,
      legend: {
        position: 'in',
      },
      vAxis: {
        textPosition: 'none',
        baselineColor: 'none',
      },
      titlePosition: 'none',
    };
    this.createData();
    this.colNames = [
      'x',
      'Daily',
      { role: 'tooltip', type: 'string', p: { html: true } },
    ];
  }

  createData(): void {
    // format data array and configure tooltip

    this.dataPoints = [
      [0, this.record[0], `Start \n ${this.record[0]} ${this.goal.units}`],
    ];

    for (let i = 1; i < this.record.length; i++) {
      if (this.record[i] !== null) {
        this.dataPoints.push([
          i,
          this.record[i],
          `Day ${i} \n ${this.record[i]} ${this.goal.units}`,
        ]);
      }
    }

    if (this.dataPoints.length === 1) {
      this.dataPoints.push([this.time, this.record[0], `No Progress Recorded`]);
    }
  }
}
