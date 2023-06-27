import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { WebsocketsService } from 'src/app/service/websockets.service';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {
  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = ['Pregunta 1','Pregunta 2','Pregunta 3','Pregunta 4'];
  public barChartType= 'bar'
  public barChartLegend:boolean = true;
 
   public barChartData:ChartConfiguration['data'] = {

      datasets: [{
   
      data: [0, 0, 0, 0], label: 'Entrevistados',

      }],
      labels: [ 'Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4']

    
    };

  constructor(private http:HttpClient, public wsService:WebsocketsService){

  }

  ngOnInit(){

    this.escucharSocket()
    this.getData();

  }


  getData() {

  

    this.http.get('http://localhost:2000/grafica').subscribe((data:any)=>{
 
    this.barChartData={

      datasets:data

    }
          
     
 
       console.log(data)
 
    });
 
    
 
   }
 
   escucharSocket(){
 
     this.wsService.listen('cambio-grafica').subscribe((data:any)=>{
 
      console.log('socket',data);
 
      this.barChartData={

        datasets:data
  
      }
       
 
       });
 
   }
  
 
 

}
