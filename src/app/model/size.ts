export class Size{
  
  constructor(public width: number, public height: number){}

  get description(): string{
    return this.width + " x " + this.height ;
  }

}
