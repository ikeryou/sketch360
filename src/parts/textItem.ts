import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Rect } from "../libs/rect";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class TextItem extends MyDisplay {

  private _inner: HTMLElement;
  public get inner(): HTMLElement {
    return this._inner;
  }

  private _innerPos: Rect = new Rect();
  public get innerPos(): Rect {
    return this._innerPos;
  }

  private _pos: Rect = new Rect();
  public get pos(): Rect {
    return this._pos;
  }

  private _offsetPos: Rect = new Rect();
  private _ease: number = Util.random(0.05, 0.15);


  constructor(opt:any) {
    super(opt)

    Tween.set(this.el, {
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
    });

    this._inner = this.el.querySelector('p') as HTMLElement;
    this._inner.classList.remove('js-text-org');
    this._inner.classList.add('js-text-item-inner');
    Tween.set(this._inner, {
      position: 'absolute',
      top: 0,
      left: 0,
    })

    if(Util.hit(5)) {
      Tween.set(this._inner, {
        color: Util.randomArr(['#ff0000', '#ffff00', '#00ffff'])
      })
    }

    this.useGPU(this._inner);
    this.useGPU(this.el);
  }


  protected _update(): void {
    super._update();

    const mx = MousePointer.instance.x;
    const my = MousePointer.instance.y;

    const dx = mx - this._pos.x;
    const dy = my - this._pos.y;

    const tgX = dx * 0.25;
    const tgY = dy * 0.5;
    this._offsetPos.x += (tgX - this._offsetPos.x) * this._ease;
    this._offsetPos.y += (tgY - this._offsetPos.y) * this._ease;

    Tween.set(this._inner, {
      x: this._innerPos.x + this._offsetPos.x,
      y: this._innerPos.y + this._offsetPos.y,
    })
  }

  protected _resize(): void {
    super._resize();
  }
}