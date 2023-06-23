import template from './profile.hbs';
import Block from '../../utils/block';
import Button from '../../components/button';
import Avatar from '../../components/avatar';
import ProfileForm from '../../components/profile_form';

class ProfilePage extends Block {
  constructor() {
    super('main');
    this.element.classList.add('page_profile');
  }

  init () {
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
        src: ''
      });

  }

  componentDidMount() {
    const profileForm = new ProfileForm({
      form_type: 'profile'
    });
    const profile_form_root = this.element.querySelector('#profile_form');
    console.log('profile_form1111');

    profile_form_root.append(profileForm.getContent()!)
  }

  

  // eslint-disable-next-line class-methods-use-this
  render() {
    
    return this.compile(template, {});
  }
}

export default ProfilePage;
