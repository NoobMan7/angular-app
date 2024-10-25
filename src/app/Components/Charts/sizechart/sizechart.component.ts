import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { SizeService } from 'src/app/Services/size.service';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-sizechart',
  templateUrl: './sizechart.component.html',
  styleUrls: ['./sizechart.component.css']
})
export class SizechartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Size', backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1 },
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  constructor(private measurementService: SizeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
   

    this.measurementService.bodyPartData$.subscribe(data=>{
      console.log(data);
      
      this.lineChartData.labels = data.map((m:{dateMeasured: string | number | Date;}) => new Date(m.dateMeasured).toLocaleDateString());
      this.lineChartData.datasets[0].data = data.map((m: { size: any; }) => m.size);
      
 
      console.log(this.lineChartData.datasets[0].data);
      if (this.chart) {
        this.chart.update();
      }
      this.cdr.detectChanges();
    });
   
      
    };
  }
