import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpercaseInput]'
})
export class UpercaseInputDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { 
    this.renderer.setStyle(el.nativeElement, 'text-transform', 'uppercase');
  }

}
