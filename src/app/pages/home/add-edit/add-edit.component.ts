import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Distribution } from '@interfaces/distribution.interface';
import { select, Store } from '@ngrx/store';
import * as action from '@actions/setdata.actions'


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  item:any = {
    title: '',
    _about: '',
    accessURL: ''
  }

  response: 'Response'

  distribution: any

  id: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ data: any }>,
  ) {
    
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.store.pipe(select('data')).subscribe((distribution: any) => {
      this.distribution = distribution
      this.getSelectedItem()
      if (!distribution.format) {
        this.router.navigate(['/home'])
      }
    })
  }

  setData(data: any) {
    this.store.dispatch(action.setdata({ data: data }))
    this.setData(this.distribution)
  }

  getSelectedItem() {
    this.item = {...this.distribution.result.items.filter(item => item.title === this.id)[0]}
    console.log(this.item)
  }

  save(){
    if (this.id == 'new'){
      this.addItem()
    }else{
      this.editItem()
    }
  }

  addItem(){
    let items = [...this.distribution.result.items]
    items.push(this.item)
    this.updateItems(items)    
  }

  editItem(){
    let newitem = {
      title: this.item.title,
      _about: this.item._about,
      accessURL: this.item.accessURL,
    }
    const newItems = this.distribution.result.items.map(item => {
      let temp = Object.assign({}, item);
      if (temp.title === this.id) {
        temp = newitem;
      }
      return temp;
    });

    this.updateItems(newItems)

  }

  updateItems(items){
    const distribution: Distribution = {
      format: this.distribution.format,
      result: {
        items: items
      }
    }
    this.distribution = { ...distribution }
    this.setData(this.distribution)
  }

  



}
