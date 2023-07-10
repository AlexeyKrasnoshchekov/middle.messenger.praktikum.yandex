import Block from './block';

export interface Props {
  rootQuery: string
}

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

function render(query, block) {
  const root = document.querySelector(query);
  root?.append(block.getContent()!);
  return root;
}

class Route {
  private _block: Block | null;

  private _pathname: string;

  private _blockClass: Block;

  private _props: Props;

  constructor(pathname:string, view:Block, props:Props) {
    // console.log('view', view);
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass;
      render(this._props.rootQuery, this._block);
      return;
    }
    this._block.show();
  }
}

export default Route;
