import template from './profile_password.hbs';
import Block from '../../utils/block';
import Button from '../../components/button';
import Avatar from '../../components/avatar';
import ProfileForm from '../../components/profile_form';

interface ProfilePasswordPageProps {
  firstName: string
}

class ProfilePasswordPage extends Block {
  constructor(props:ProfilePasswordPageProps) {
    super('main', props);
    this.element!.classList.add('page_profile');
  }

  init() {
    this.children.button = new Button({
      view: 'back',
      events: {
        click: (e:any) => {
          e.preventDefault();
          window.location.href = '/';
        },
      },
    });

    this.children.avatar = new Avatar({
      class: 'avatar',
      alt: 'аватар пользователя',
      src: '',
    });

    this.children.profileForm = new ProfileForm({
      view: 'profile_password',
      firstName: this.props.firstName,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, {
      firstName: this.props.firstName,
    });
  }
}

export default ProfilePasswordPage;
