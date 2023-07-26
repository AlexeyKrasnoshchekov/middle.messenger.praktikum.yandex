import Block from '../../utils/block';
import template from './icon.hbs';

interface IconProps {
  view:string,
}

class Icon extends Block {
  constructor(props: IconProps) {
    super('span', props);
  }

  render() {
    return this.compile(template, {
      isFileIcon: this.props.view === 'file',
      isImageIcon: this.props.view === 'image',
      isArrowIcon: this.props.view === 'arrow',
      isPlusIcon: this.props.view === 'plus',
      isMinusIcon: this.props.view === 'minus',
      isAttachIcon: this.props.view === 'attach',
      isLocationIcon: this.props.view === 'location',
      isSendIcon: this.props.view === 'send',
      isBackIcon: this.props.view === 'back',
      isMenuIcon: this.props.view === 'menu',
      isCloseIcon: this.props.view === 'close',
    });
  }
}

export default Icon;
