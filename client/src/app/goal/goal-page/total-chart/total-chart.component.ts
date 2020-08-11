import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../shared/models/goal';
import { GoalService } from '../../goal.service';

@Component({
  selector: 'app-total-chart',
  templateUrl: './total-chart.component.html',
  styleUrls: ['./total-chart.component.css'],
})
export class TotalChartComponent implements OnInit {
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
      axisTitlesPosition: 'none',
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
      'Total',
      { role: 'tooltip', type: 'string', p: { html: true } },
    ];
  }

  createData(): void {
    // format data array and configure tooltip

    this.dataPoints = [[0, 0, 'Start', 0, 'Start']];

    let runningTotal = 0;

    for (let i = 0; i < this.record.length; i++) {
      runningTotal += this.record[i];
      this.dataPoints.push([
        i + 1,
        this.record[i],
        `Day ${i + 1} \n Daily: ${this.record[i]} ${this.goal.units}`,
        runningTotal,
        `Day ${i + 1} \n Total: ${runningTotal} ${this.goal.units}`,
      ]);
    }
  }
}
