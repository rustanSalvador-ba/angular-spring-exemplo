import { DEFAULT_CURRENCY_CODE, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { FormsModule} from '@angular/forms';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { UpdateSaldoComponent } from './update-saldo/update-saldo.component'
import { LoginComponent } from './login/login.component'
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { CurrencyMaskModule } from "ng2-currency-mask";

registerLocaleData(localeBr);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent,
    UpdateSaldoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule
  ],
   providers:    [
    // ************************************
    { provide: LOCALE_ID, useValue: 'pt' },
    // ************************************
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }