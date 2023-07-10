import template from './profile_change.hbs';
import Block from '../../utils/block';
import Button from '../../components/button';
import Avatar from '../../components/avatar';
import ProfileForm from '../../components/profile_form';
import Router from '../../utils/router';

interface ProfileChangePageProps {
  firstName: string
}

class ProfileChangePage extends Block {
  constructor(props:ProfileChangePageProps) {
    super('main', props);
    this.getContent()?.classList.add('page_profile');
  }

  init() {
    this.children.button = new Button({
      view: 'back',
      events: {
        click: (e:any) => {
          e.preventDefault();
          Router.back();
        },
      },
    });
    this.children.avatar = new Avatar({
      class: 'avatar',
      alt: 'аватар пользователя',
      src: '',
    });
    this.children.profileForm = new ProfileForm({
      view: 'profile_change',
      firstName: this.props.firstName
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {
      firstName: this.props.firstName,
    });
  }
}

export default ProfileChangePage;
