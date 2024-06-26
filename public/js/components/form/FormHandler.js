import { Form } from './Form.js';
import { InputField } from './InputField.js';
import { SubmitButton } from './btn.js';
import { AuthLink } from './AuthLink.js';

export function LoginForm() {
  return Form({
    title: 'Login',
    action: '/auth/login',
    method: 'post',
    children: `
      ${InputField({ type: 'text', name: 'username', placeholder: 'Username', id: 'username' })}
      ${InputField({ type: 'email', name: 'email', placeholder: 'Email', id: 'email' })}
      ${InputField({ type: 'password', name: 'password', placeholder: 'Password', id: 'password' })}
      ${SubmitButton({ text: 'Login', width: '52', height: '12' })}
      ${AuthLink({ text: 'Don\'t have an account?',link:' Sign up', href: '/auth/signup', })}
    `,
  });
}
export function SignupForm() {
    return Form({
      title: 'Register',
      action: '/auth/signup',
      method: 'post',
      children: `
        ${InputField({ type: 'text', name: 'username', placeholder: 'Username', id: 'username' })}
        ${InputField({ type: 'email', name: 'email', placeholder: 'Email', id: 'email' })}
        ${InputField({ type: 'password', name: 'password', placeholder: 'Password', id: 'password' })}
        ${InputField({ type: 'password', name: 'passwordConf', placeholder: 'Confirm Password', id: 'ConfPassword' })}
        ${SubmitButton({ text: 'Signup', width: '52', height: '12' })}
        ${AuthLink({ text: 'Already have an account?',link:"Login", href: '/auth/login', })}
      `,
    });
  }
  