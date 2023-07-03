/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { TemplateDelegate } from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './event-bus';

class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  private eventBus: () => EventBus;

  protected props: P;

  protected children:Record<string, Block | Block[]>;

  private _element: HTMLElement | null = null;

  private _meta:{ tagName: string; props: P; };

  //   /** JSDoc
  //        * @param {string} tagName
  //        * @param {Object} props
  //        *
  //        * @returns {void}
  //        */

  constructor(tagName:string, propsWithChildren:P) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  // eslint-disable-next-line class-methods-use-this
  _getChildrenAndProps(childrenAndProps: P)
    :{ props: P, children: Record<string, Block | Block[]> } {
    const props:Record<string, unknown> = {};
    const children:Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  _registerEvents(eventBus:EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line class-methods-use-this
  protected init() {

  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line class-methods-use-this
  protected componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps:P, newProps:P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line class-methods-use-this
  protected componentDidUpdate(oldProps:P, newProps:P) {
    return oldProps !== newProps;
  }

  setProps = (nextProps:P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    // const newElement = block.firstElementChild as HTMLElement;

    // if (this._element && newElement) {
    //   this._element.replaceWith(newElement);
    // }
    this._removeEvents();
    this._element!.innerHTML = '';
    this._element!.appendChild(block);

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line class-methods-use-this
  protected render():DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: TemplateDelegate, context:any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props:P) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop:string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop:string, value) {
        const oldTarget = { ...target };

        // eslint-disable-next-line no-param-reassign
        target[prop as keyof P] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName:string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
