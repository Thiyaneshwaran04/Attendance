
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import{DatePipe} from '@angular/common'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements OnInit {
  SELECTATTEND=false
  filters:any
  tabs:any=['HOME','ATTENDANCE','DETAILS']
  datas: any[] = [
    { name: '', roll: '', year: '' },
  ];
  absent: any[] = [
    { name: '', roll: '', year: '' },
  ];
  selectyear:any
  info:any[]=[{name: '', reg_no: '', year: ''},]
  date:any
  attDate:any
  currentdate:any
  detail = {
    name: '',
    roll: '952321104',
    year: '',
   
    action: false,
  };
  show=false
  user:any={
    reg_no:'952321104',
    name:'',
    year:'',
  }
  select=true
  selectedTab:any
  a: any 
  b: any;

  constructor(private firestore: AngularFirestore, public pipe:DatePipe) { }

  ngOnInit(): void {
    this.selectedTab='DETAILS'
    this.getuser()
    // this.getData()
    this. cdate()
    // console.log( this.selectyear);
    
  }
  onSelectionChange() {
    console.log('sel',this.filters);
    
  
    console.log('Selected Value:', this.selectyear);
    this.getuser()
    this.getData()
  }
  cdate(){
 this.date=this.pipe.transform(new Date(),'yyyy-MM-dd');
this.attDate=this.pipe.transform(new Date(),'yyyy-MM-dd');
  }
  selpages(val :any){
    this.selectedTab = val
  }
    save(){
     this.firestore.collection(this.attDate).doc(this.detail.roll). set(this.detail)
    .then(() => {
      console.log('Data saved successfully!');
     this.detail.name='',this.detail.roll='952321104',this.detail.action=false,this.detail.year=''
     this.getData()
    })
    .catch((error: any) => {
      console.error('Error saving data: ', error);
    });
    }
    getData() {
      // if(this.selectyear=='SECOND YEAR'){
      //   this.b='SECOND YEAR'
      //  }else if(this.selectyear=='THIRD YEAR'){
      //     this.b='THIRD YEAR'
      //  }
      //  else{
      //      this.b='FINAL YEAR'
      //  }
      const docRef = this.firestore.collection(this.date)

      docRef.valueChanges().subscribe((data) => {
       
        if (data) {
          let abs=(data as any[]).filter(ab=>ab.action==false)
          let c = (abs as any[]).filter(items => items.year == this.filters);

          this.absent=c
          let pre=(data as any[]).filter(pre=>pre.action==true)
          this.datas=pre
          if(this.filters=='1'){
          let pre=(data as any[]).filter(pre=>pre.action==true)
          this.datas=pre

          let abs=(data as any[]).filter(ab=>ab.action==false)
            this.absent=abs

          }else{
          let a = (data as any[]).filter(items => items.year == this.filters);
          // this.absent=a
          this.datas=a

          }
    
          
        } else {
          console.log('Document not found');
        }
      });
    }

    populateFields(date: string) {
      const regNo = this.detail.roll;
      if(this.selectyear=='SECOND YEAR'){
        this.a='SECOND YEAR'
       }else if(this.selectyear=='THIRD YEAR'){
          this.a='THIRD YEAR'
       }
       else{
      this.a='FINAL YEAR'
       }
      const docRef = this.firestore.collection(this.a).doc(regNo);
  
      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          const data = doc.data() as { name: string; year: string }; 
          if (data) {
            this.detail.name = data.name || '';
            this.detail.year = data.year || '';
          }
        } else {
    
          this.detail.name = '';
          this.detail.year = '';
        }
      });
    }
    shows(){
      if(this.selectedTab=='HOME'){
        this.show=true
        this.select=false
        this.SELECTATTEND=true
      }
      else{
        this.show=false
        this.select=true
        this.SELECTATTEND=false
      }
    }
    download(){
      var doc=new jsPDF();
      autoTable(doc,{html:"#ATTENDANCE"});
      doc.save("Attendance")
    }
    downloadabsent(){
      var doc=new jsPDF();
      autoTable(doc,{html:"#ATTENDANCEABSENT"});
      doc.save("Attendanceabsent")
    }
     getuser() {
      if(this.selectyear=='SECOND YEAR'){
       this.a='SECOND YEAR'
      }else if(this.selectyear=='THIRD YEAR'){
         this.a='THIRD YEAR'
      }
      else{
     this.a='FINAL YEAR'
      }
      const docRef = this.firestore.collection(this.a);

      docRef.valueChanges().subscribe((data) => {
        if (data) {
      this.info=data
          
        } else {
          console.log('Document not found');
        }
      });
      
  
    }
   selyear(){
    if (this.selectyear=='SECOND YEAR') {
      this.firestore.collection('SECOND YEAR').doc(this.user.reg_no). set(this.user)
      .then(() => {
        console.log('Data saved successfully!');
        this.user={
         reg_no:'95232204',
         name:'',
         year:'',
       }
      })
      .catch((error: any) => {
        console.error('Error saving data: ', error);
      });
    } else if (this.selectyear=='THIRD YEAR') {
      this.firestore.collection('THIRD YEAR').doc(this.user.reg_no). set(this.user)
      .then(() => {
        console.log('Data2 saved successfully!');
        this.user={
         reg_no:'952321104',
         name:'',
         year:'',
       }
      })
      .catch((error: any) => {
        console.error('Error saving data: ', error);
      });
    } else {
      this.firestore.collection('FINAL YEAR').doc(this.user.reg_no). set(this.user)
      .then(() => {
        console.log('Data3 saved successfully!');
        this.user={
         reg_no:'952320104',
         name:'',
         year:'',
       }
      })
      .catch((error: any) => {
        console.error('Error saving data: ', error);
      });
    }
  }
    
  }
 
  
  
  
  
  

 
  
  
  
  
  
  

