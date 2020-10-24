import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Distribution } from '@interfaces/distribution.interface';
import { ApiService } from '@services/api.service';
import { GeneralService } from '@services/general.service';
import { Store, select } from '@ngrx/store';
import * as action from '@actions/setdata.actions'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  distribution: Distribution;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(
    private api: ApiService,
    private general: GeneralService,
    private store: Store<{ data: any }>,
    private router: Router
  ) { }

  ngOnInit() {
    

    this.store.pipe(select('data')).subscribe((distribution: any) => {
      this.distribution = distribution
      if (!distribution.format) {
        this.getDistribution()
      }
    })
  }

  // getData(){
  //   this.data$ = this.store.pipe(select('data'))
  // }

  setData(data: any) {
    this.store.dispatch(action.setdata({ data: data }))
  }

  getDistribution(){
    this.api.api({
      service: 'distribution',
      type: 'get'
    }).subscribe((distribution:Distribution)=>{
      this.general.c('Distributions', distribution)

      this.distribution = {
        format: distribution.format,
        result: {
          items: distribution.result.items
        }
      }
      this.setData(this.distribution)
    },(error: any)=>{
      this.general.c('Api Error', error)
    })   
  }

  crud(event:string, index:string = 'new'){
    if(event === 'delete'){
      this.deleteItem(index)
    }else{      
      this.router.navigate(['/home/add-edit/'+index])
    }
  }

  deleteItem(title: string){
    this.general.c('Index', title)

    const distribution:Distribution = {
      format: this.distribution.format,
      result: {
        items: [...this.distribution.result.items.filter(item => item.title !== title)]
      }
    }    
    this.distribution = { ...distribution}
  }

  

}
