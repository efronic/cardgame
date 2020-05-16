import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CardgridComponent } from './cardgrid/cardgrid.component';
import { CardService } from './services/cardservice';
import { AppReducer } from './state/app.reducer';
import { PlayersComponent } from './players/players.component';

@NgModule({
  declarations: [AppComponent, CardgridComponent, PlayersComponent],
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
  ],
  providers: [CardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
