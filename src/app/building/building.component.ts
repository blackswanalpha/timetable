import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Building } from './building';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { BuildingService } from './building.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class BuildingComponent implements OnInit {
  building: Building[] =[];
  // building:Building[]= [];
  closeResult: string = '';
 
  fb: any;
    editBuilding: Building | undefined;
   editForm = {
   buildingId: 0,
    buildingName: '',
buildingCampusId:0,
    buildingDesc: '',

  } ;

  





deleteId = 0;
  constructor(public  loaderService:LoaderService,private buildingService: BuildingService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  

    
  
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getbuilding();
    this.getBuilding();
    
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getBuilding(): void {
    this.buildingService.getbuilding().subscribe(
      (response: Building[]) => {
      
this.building = response;
this.loadingHandler.finish();
        console.log(this.building);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getbuilding(): void {
  //   this.buildingService.getbuilding().subscribe(
  //     (response: Building[]) => {
  //       this.building = response;
  //       console.log(this.building);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

onSubmit(f: NgForm) {


 this.buildingService.addBuilding(f.value).subscribe(
      (response: Building) => {
        console.log(response);
        this.getBuilding();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/buildings/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, building: Building) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', building.buildingName);
   
   (<HTMLElement>document.getElementById('dept')).setAttribute('value', building.buildingDesc);
      (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( building.buildingCampusId).toString());

}



openEdit(targetModal: any, building: Building) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = building;

  // this.editForm.patchValue( {
  //   buildingId: building.buildingId, 
  //   buildingName: building.buildingName,
  //   buildingEmail: building.buildingEmail,
  //   buildingDesc: building.buildingDesc,
  //   buildingBuildingId: building.buildingBuildingId,
  //  buildingMobile: building.buildingMobile
  // });



 
     (<HTMLElement>document.getElementById('buildingId')).setAttribute('value', (building.buildingId).toString());
 (<HTMLElement>document.getElementById('buildingId')).setAttribute('data-target',(building.buildingId).toString());
   (<HTMLElement>document.getElementById('buildingName')).setAttribute('value', building.buildingName);
    (<HTMLElement>document.getElementById('buildingCampusId')).setAttribute('value',( building.buildingCampusId).toString());

   (<HTMLElement>document.getElementById('buildingDesc')).setAttribute('value', building.buildingDesc);

}



 public onEdit(f: NgForm) {
  
 this.buildingService.updateBuilding(this.editForm).subscribe(
      (response: Building) => {
        console.log(response);
        this.getBuilding();
         this.toastr.success('building', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, building: Building) {
  this.editForm = building;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.buildingService.deleteBuilding(this.editForm).subscribe(
      (response: Building) => {
        console.log(response);
        this.getBuilding();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchBuildings(key: string): void {
    console.log(key);
    const results: Building[] = [];
    for (const building of this.building) {
      if (building.buildingName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      
      || building.buildingDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(building);
      }
    }
    this.building = results;
    if (results.length === 0 || !key) {
      this.getBuilding();
    }
  }



  openUndo(targetModal: any) {
  this.modalService.open(targetModal, {ariaLabelledBy: 'modal-basic-title',backdrop: 'static',
    size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
 
}

onUndo(f: NgForm) {
  this.editForm = f.value;
console.log(f.value);
  
  this.buildingService.undoBuilding(f.value).subscribe(
      (response:  Building) => {
        console.log(response);
        this.getBuilding();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
        this.toastr.error('unSuccessful!', error.message);
      }
    );
}

}

