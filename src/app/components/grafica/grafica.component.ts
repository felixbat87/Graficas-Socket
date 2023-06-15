import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { WebsocketsService } from 'src/app/service/websockets.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit{
  //type line
  public lineChartType: ChartType = 'line';
  //data set
  public lineChartData: ChartConfiguration['data'] = {

    datasets: [
      {
        data: [ 0, 0, 0, 0 ],
        label:'Ventas',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)'
        
      },
      
    
    ],
    labels: [ 'January', 'February', 'March', 'April']
  };
  //options
  
  ///
  
  
  constructor(private http:HttpClient, public wsService:WebsocketsService){
    
  }
  ngOnInit(){
    this.escucharSocket()
    this.getData();

    // setInterval(()=>{


    //   const newData= [
    //    Math.round(Math.random() *100),
    //    Math.round(Math.random() *100),
    //    Math.round(Math.random() *100),
    //    Math.round(Math.random() *100),
    //   ];

  
    //   this.lineChartData= {

    //     datasets: [
    //       {
    //         data: newData,
    //         label:'Ventas'
    //       },
        
    //     ],
    //     labels: [ 'January', 'February', 'March', 'April']
    //   };
   

    // },3000)
      
  }

  getData() {

  

   this.http.get('http://localhost:2000/grafica').subscribe((data:any)=>{

    this.lineChartData={

      datasets:data

    }

   });

   

  }

  escucharSocket(){

    this.wsService.listen('cambio-grafica').subscribe((data:any)=>{

     console.log('socket',data);

     this.lineChartData={

      datasets:data

      }

    });

  }

}
