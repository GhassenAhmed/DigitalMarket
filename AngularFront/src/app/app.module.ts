import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClasserProductComponent } from './AdminCompoenent/classer-product/classer-product.component';
import { MaterialModule } from './material/material.module';
import {FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GererProduitComponent } from './AdminCompoenent/GererProduitComponents/gerer-produit/gerer-produit.component';
import { AcceptedProductsComponent } from './AdminCompoenent/GererProduitComponents/accepted-products/accepted-products.component';
import { InfoProduitComponent } from './AdminCompoenent/GererProduitComponents/info-produit/info-produit.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { HomeComponent } from './home/home/home.component';
import { BodyComponent } from './home/body/body.component';
import { CardComponent } from './home/card/card.component';
import { FooterComponent } from './home/footer/footer.component';
import { DialogInfoComponent } from './AdminCompoenent/classer-product/dialog-info/dialog-info.component';
import { SideBarCompComponent } from './Layout/side-bar-comp/side-bar-comp.component';
import { NavbarCompComponent } from './Layout/navbar-comp/navbar-comp.component';
import { DashboardComponent } from './AdminCompoenent/dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryListComponent } from './AdminCompoenent/GererCategory/category-list/category-list.component';
import { GererCommandeComponent } from './AdminCompoenent/gerer-commande/gerer-commande.component'
import { GererSupplierComponent } from './AdminCompoenent/GererSuppliersComponents/gerer-supplier/gerer-supplier.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LocationCommandeComponent } from './ClientComponent/location-commande/location-commande.component';
import { AccueilClientComponent } from './AccueilClient/accueil-client/accueil-client.component';
import { AccueilBodyComponent } from './AccueilClient/accueil-body/accueil-body.component';
import { AccueilCartComponent } from './AccueilClient/accueil-cart/accueil-cart.component';
import { CardCartComponent } from './AccueilClient/card-cart/card-cart.component';
import { NotFoundComponentComponent } from './notfound/not-found-component/not-found-component.component';
import { CommandeComponent } from './ClientComponent/commande/commande.component';
import { FavoriteListClientComponent } from './AccueilClient/favorite-list-client/favorite-list-client.component';
import { LIstEmpolyersComponent } from './superAdminComponents/Employers/list-empolyers/list-empolyers.component';
import { AddEmployerComponent } from './superAdminComponents/Employers/add-employer/add-employer.component';
import { GenerateAccountDialogComponent } from './superAdminComponents/Employers/generate-account-dialog/generate-account-dialog.component';
import { ConfirmDialogComponentComponent } from './superAdminComponents/Employers/confirm-dialog-component/confirm-dialog-component.component';
import { CommandeClientComponent } from './ClientComponent/commande-client/commande-client.component';
import { FournisseurDashboardComponent } from './Fournissuer/fournisseur-dashboard/fournisseur-dashboard.component';
import { FournisseurInterfaceComponent } from './Fournissuer/fournisseur-interface/fournisseur-interface.component';
import { FournisseurNavbarCompComponent } from './Fournissuer/fournisseur-navbar-comp/fournisseur-navbar-comp.component';
import { FournisseurSideBarCompComponent } from './Fournissuer/fournisseur-side-bar-comp/fournisseur-side-bar-comp.component';
import { AddProductComponent } from './Fournissuer/add-product/add-product.component';
import { ListCommandesComponent } from './ClientComponent/list-commandes/list-commandes.component';
import { ListProductsFournisseurComponent } from './Fournissuer/list-products-fournisseur/list-products-fournisseur.component';
import { ContractComponent } from './Fournissuer/contract/contract.component';
import { EditProfileComponent } from './EditProfile/edit-profile/edit-profile.component';
import { EditProfileBodyComponent } from './EditProfile/edit-profile-body/edit-profile-body.component';
import { ReviewComponent } from './Review/review.component';
import { StatsComponent } from './Fournissuer/statistiques/stats.component';
import { CardRecommandationComponent } from './home/card-recommandation/card-recommandation.component';
import { Chart } from 'chart.js';
import { StockAdminComponent } from './AdminCompoenent/stock-admin/stock-admin.component';
import { ImageProductComponent } from './AdminCompoenent/image-product/image-product.component';
import { KeycloakAngularModule } from 'keycloak-angular';
import { KeycloakService as _KeycloakService } from 'keycloak-angular';
import { IsAuthGuard } from './guard/is-auth.guard';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AuthStore } from './Store/action';
import { InterceptorGlobaleServiceService } from './interceptor/interceptor-globale-service.service';
import { DetailsProductComponent } from './AccueilClient/details-product/details-product.component';
import { guardRoleGuard } from './guard/guard-role.guard';


function initialiserKeycloak(keycloak:_KeycloakService){
  return()=>{
    keycloak.init({
      config:{
        url:'http://localhost:8080',
        realm:'DigitalMarket',
        clientId:'angular_client'
      },
      initOptions:{
        //onLoad: 'login-required',
        onLoad:'check-sso',
        flow:"standard",
        checkLoginIframe: true,
        silentCheckSsoRedirectUri:
            window.location.origin + '/assets/verify-sso.html'
      },
    })
  }
}
@NgModule({
  declarations: [
    AppComponent,
    ClasserProductComponent,
    GererProduitComponent,
    AcceptedProductsComponent,
    InfoProduitComponent,
    NavbarComponent,
    HomeComponent,
    BodyComponent,
    CardComponent,
    FooterComponent,
    DialogInfoComponent,
    SideBarCompComponent,
    NavbarCompComponent,
    DashboardComponent,
    CategoryListComponent,
    GererCommandeComponent,
    AccueilClientComponent,
    AccueilBodyComponent,
    AccueilCartComponent,
    CardCartComponent,
    CategoryListComponent,
    NotFoundComponentComponent,
    CommandeComponent,
    GererSupplierComponent,
    LocationCommandeComponent,
    FavoriteListClientComponent,
    LIstEmpolyersComponent,
    AddEmployerComponent,
    GenerateAccountDialogComponent,
    ConfirmDialogComponentComponent,
    CommandeClientComponent,
    LocationCommandeComponent,
    FournisseurDashboardComponent,
    FournisseurInterfaceComponent,
    FournisseurNavbarCompComponent,
    FournisseurSideBarCompComponent,
    AddProductComponent,
    ListCommandesComponent,
    ListProductsFournisseurComponent,
    ContractComponent,
    EditProfileComponent,
    EditProfileBodyComponent,
    ReviewComponent,
    StatsComponent,
    CardRecommandationComponent,
    StockAdminComponent,
    ImageProductComponent,
    DetailsProductComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsStoragePluginModule.forRoot(),
    NgxsModule.forRoot([AuthStore]),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
  ],
  providers: [
    IsAuthGuard,
    DatePipe,
    guardRoleGuard,
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:InterceptorGlobaleServiceService,
    //   multi:true
    // },
    { 
      provide: APP_INITIALIZER,
      deps: [_KeycloakService],
      useFactory: initialiserKeycloak,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

