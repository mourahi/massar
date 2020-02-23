import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.css']
})
export class MychartComponent implements AfterViewInit {
  @Input() datachart: {legend: string, data: number};
  constructor() { }

  ngAfterViewInit(): void {
    this.circle(2,'lightgray');
    this.circle(this.datachart.data, '#4db53c');
  }

  circle(d,c) {
  const canvas = document.getElementById(this.datachart.legend) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = c;
  ctx.arc(60, 60, 50, 1.5 * Math.PI , d * 2 * Math.PI + 1.5 * Math.PI );
  ctx.stroke();
}

}
