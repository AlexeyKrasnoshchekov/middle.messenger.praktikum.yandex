import template from './profile_form.hbs';
import Block from '../../utils/block';
import Link from '../link';

interface ProfileFormProps {
  form_type:string
}
class ProfileForm extends Block {
  type = 'profile';
  constructor(props:ProfileFormProps) {
    super('div', props);
    console.log('props4444',props);
    this.element.classList.add('profile');
  }

  init () {
    console.log('54545')
      if (this.props.form_type === 'profile') {
            this.children.link1 = new Link({
              href: '',
              label:'Изменить данные',
              events: {
                click: (e:any) => {
                  e.preventDefault();
                  this.setProps({form_type: 'profile_change'});
                },
              },
            });
            this.children.link2 = new Link({
              href: '',
              label: 'Изменить пароль',
              events: {
                click: (e:any) => {
                  e.preventDefault();
                  
                  this.setProps({form_type: 'profile_password'});
                  
                },
              },
            });
            this.children.link3 = new Link({
              href: '/login',
              label: 'Выйти',
              events: {
                click: (e:any) => {
                  e.preventDefault();
                  console.log('clicked');
                },
              },
            });
            
      }

      
  }

  // componentDidUpdate() {

        
  //     this.children.input = new Input({
  //       placeholder: 'enter email',
  //       type: 'email',
  //       id: 'email',
  //       name: 'email',
  //       required: false,
  //       events: {
  //         input: (e) => {
  //           e.preventDefault();
  //           console.log('typed');
  //         },
  //       },
  //     });
    
  //   return true;
  // }

  render() {

    console.log('first',this.children);

    

    
    return this.compile(template, {
      isProfile: this.props.form_type === 'profile' ? true : false,
      isProfileChange: this.props.form_type === 'profile_change' ? true : false,
      isProfilePassword: this.props.form_type === 'profile_password' ? true : false
    });
  }
}

export default ProfileForm;
