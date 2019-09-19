import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/model/slider/slider';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { http } from 'src/app/service/http-header';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  slider:Slider[]=[];
  getSlider:Slider;
  sliders:Slider;
  SliderId:'';
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  constructor(private myservice:MyserviceService, 
    private http: HttpClient, 
    private router: Router, 
    private fb: FormBuilder,private toastr:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }
   displayedColumn: string[] = ['SliderName','Slogan','Image', 'CreatedDate', 'CreateBy', 'Action'];
   dataSource = new MatTableDataSource<Slider>(this.slider);
   selection = new SelectionModel<Slider>(true, []);
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   
  ngOnInit() {
  
  this.http.get<string>('http://localhost:65170/api/Slider',{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });

}
getId(id){
  this.SliderId=id
}
DeleteSlider(Id: string){
  if (confirm('Are you sure you to delete this product?')) {
    this.http.delete<string>('http://localhost:65170/api/Slider/?id=' + Id,{ headers: http() }).subscribe(res => {
      let result = JSON.parse(res);
      if (result.Success == 1) {
        this.slider = this.slider.filter(b => b.SliderId !== Id);
        this.toastr.success('Delete success!', '');
        
      } else {
        this.toastr.error('Delete success!', '');
      }
    });
  }
}
}
