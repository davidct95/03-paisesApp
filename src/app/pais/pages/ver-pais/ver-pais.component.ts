import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap , tap} from 'rxjs';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit{

  pais!: Country[];
  valores: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService){}

  ngOnInit():void {

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.paisService.getPaisPorAlpha( id )),
        tap(console.log)
      )
      .subscribe(pais => {
        this.pais = pais;
        let valores = Object.values(pais[0].translations);
        this.valores = valores;
        console.log(this.valores);
        });
    //Otra forma de realizarlo

    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     console.log(id);

    //     this.paisService.getPaisPorAlpha(id)
    //       .subscribe( pais => {
    //         console.log(pais);
    //       } )
    //   } )


  }

}
