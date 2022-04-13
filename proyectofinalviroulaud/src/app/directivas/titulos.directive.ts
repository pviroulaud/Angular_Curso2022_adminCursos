import { Directive, Renderer2,ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitulos]'
})
export class TitulosDirective {

  constructor(ren:Renderer2,elemento:ElementRef) {
    ren.setStyle(elemento.nativeElement,'font-size','20px');
   }

}
