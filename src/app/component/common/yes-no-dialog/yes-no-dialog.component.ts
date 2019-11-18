import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {

  constructor(
    public translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData) { }

  ngOnInit() { }

}
