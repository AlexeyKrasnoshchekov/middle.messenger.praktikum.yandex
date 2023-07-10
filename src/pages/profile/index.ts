import template from './profile.hbs';
import Block from '../../utils/block';
import Button from '../../components/button';
import Avatar from '../../components/avatar';
import ProfileForm from '../../components/profile_form';
import store from '../../utils/store';
import Router from '../../utils/router';
import AuthController from '../../controllers/AuthController';

interface ProfilePageProps {
  firstName: string
}

class ProfilePage extends Block {
  constructor(props:ProfilePageProps) {
    super('main', props);
    this.element!.classList.add('page_profile');

    // UserController.getUser();

    // store.on(StoreEvents.Updated, () => {
    //   // вызываем обновление компонента, передав данные из хранилища
    //   this.setProps(store.getState());
    // });
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
      view: 'profile',
      firstName: this.props.firstName,
    });
    // this.children.profileForm.dispatchComponentDidMount();
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): void {
    console.log('first');
    AuthController.fetchUser();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    // this.children.profileForm.dispatchComponentDidMount();
    return this.compile(template, {
      firstName: this.props.firstName,
    });
  }
}

export default ProfilePage;
