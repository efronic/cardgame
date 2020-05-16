import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CardgridComponent } from './cardgrid/cardgrid.component';
import { CardService } from './services/card.service';
import { AppReducer } from './state/app.reducer';
import { PlayersComponent } from './players/players.component';
import { DialogComponent } from './helpers/dialog/dialog.component';
import { MaterialModule } from './helpers/material.module';

@NgModule({
  declarations: [
    AppComponent,
    CardgridComponent,
    PlayersComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('cardGame', AppReducer),
    StoreDevtoolsModule.instrument({
      name: 'Card Game DevTools',
      maxAge: 50,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [CardService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule {}
