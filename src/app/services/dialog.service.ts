import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map, first } from 'rxjs/operators';
import { DialogComponent } from '../helpers/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  confirm(winner?: boolean): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { winner: winner },
    });
    return dialogRef.afterClosed().pipe(
      map((result) => {
        console.log('result from dialogservice: ', result);
        return true;
      }),
      first()
    );
  }
  constructor(public dialog: MatDialog) {}
}
