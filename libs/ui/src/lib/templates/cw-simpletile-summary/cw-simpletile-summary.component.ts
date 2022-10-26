import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: "cw-simpletile-summary",
    templateUrl: "./cw-simpletile-summary.component.html",
    styleUrls: ["./cw-simpletile-summary.component.scss"],
})
export class CwSimpleTileSummary implements OnInit {
    @ViewChild("closeModal") closeModal!: ElementRef;
    @Input() simpleTileSummaryData: any;
    @Input() updatedJson: any;
    @Input() isAddButtonDisabled = false;
    indexExpanded = -1;
    @Output() editButtonClicked = new EventEmitter<number>();
    @Output() recordNumberToEdit = new EventEmitter<any>();
    @Output() deleteButtonClicked = new EventEmitter<number>();
    @Output() recordNumberToOp = new EventEmitter<number>();
    @Output() nextPage = new EventEmitter<boolean>();
    @Output() previousPage = new EventEmitter<boolean>();
    @Output() addAnotherPerson = new EventEmitter<boolean>();
    userToBeDeleted!: any;
    recordToBeDeleted!: number;
    userName = "";
    ngOnInit(): void {}
    setRecordtoBeOperate(userId: any, i: number = 0) {
        this.userToBeDeleted = userId;
        this.recordToBeDeleted = i;
    }
    deleteUser(user: any, record = null) {
        this.recordNumberToOp.emit(record || 0);
        this.deleteButtonClicked.emit(user);
    }

    navigateToEdit(user: any, record: number = 0) {
         this.recordNumberToOp.emit(record);
        this.editButtonClicked.emit(user);
      
       
    }

    next() {
        this.nextPage.emit(true);
    }

    back() {
        this.previousPage.emit(true);
    }

    addPerson() {
        this.addAnotherPerson.emit(true);
    }
}
