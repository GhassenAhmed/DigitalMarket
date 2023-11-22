import { Component, OnInit } from '@angular/core';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProductServiceService } from 'src/app/Service/product-service.service';
@Component({
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ])
  ]
})
export class ListCommandesComponent implements OnInit{
  productDataMap: { [key: string]: any } = {};
  selectedCommandes=-1;
  pagesArray: number[] = [];
  page = 1;
  limit = 1;
  limit_model = 0;
  pages = 0;
  total=0;
  commandes:any;
    constructor(private CommandeService :  CommandeServiceService , private productService:ProductServiceService) { }
    ngOnInit(): void {
      this.getCommandeByIdClient();
    }
    getCommandeByIdClient(){
      this.CommandeService.getCommandeByIdClient(1,this.page,this.limit).subscribe((res:any)=>{
          this.commandes=res.docs;
          this.total=res.total;
          this.pages=res.pages;
          this.page=res.page;
          this.limit=res.limit;
          this.pagesArray = Array.from({ length: this.pages }, (_, index) => index + 1);
          console.log(this.pages);

      }),
      (error:any)=>{
        console.log(error);
      }
  }
  toggleRowDetails(index: number): void {
    this.selectedCommandes = index==this.selectedCommandes ? -1 : index;
  }

  onLimitChange(): void {
    this.getCommandeByIdClient();
  }

  getProductById(id: any): any {
    if (this.productDataMap[id]) {
      return this.productDataMap[id];
    }


    this.productService.getProductById(id).subscribe(
      (res: any) => {
        console.log(res);
        this.productDataMap[id] = res;
      },
      (error: any) => {
        console.log(error);
        return null;
      }
    )
  }
  nextPage(): void {
    if (this.page < this.pages) {
      this.page++;
      this.getCommandeByIdClient();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getCommandeByIdClient();
    }
  }

}
