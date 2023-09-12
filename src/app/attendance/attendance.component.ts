import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements OnInit {
  tabs:any=['attendance','details']
  dataObject = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
  };
  
  formData: any = {};
  data:any={}
  datas:any=[]
  info:any=[]
  detail:any={}
  selectedTab:any
  jsonArray: { key: string; value: string; }[] = [];
  action:any={}
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

this.selectedTab='details'
// this.save()
this.getData()

  }
  selpages(val :any){
    this.selectedTab = val
  }
  onSubmit() {

    this.firestore.collection('user').doc(this.formData.date).set(this.action)
      .then(() => {
        console.log('Data saved successfully!');
        this.formData = {};
      })
      .catch((error: any) => {
        console.error('Error saving data: ', error);
      });
  }
 
    getData() {
      const docRef = this.firestore.collection('userdetail');

      docRef.valueChanges().subscribe((data) => {
        if (data) {
this.datas=data

console.log(this.jsonArray);
          
        } else {
          console.log('Document not found');
        }
      });
    }
    save(){
     this.firestore.collection('userdetail').doc(this.detail.roll) . set(this.detail)
    .then(() => {
      console.log('Data saved successfully!');
      this.detail= {};
      this.detail=this.info
    })
    .catch((error: any) => {
      console.error('Error saving data: ', error);
    });
    }
 
    handleCheckboxChange(data: any) {
      // Uncheck the checkboxes in other rows when one is checked
      this.datas.forEach((item: { action: boolean; })=> {
        if (item !== data) {
          item.action = false;
        }
      });
    }
   
  }

