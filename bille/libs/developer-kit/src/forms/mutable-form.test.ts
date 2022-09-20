/* eslint-disable @typescript-eslint/no-empty-function */
import { MutableForm } from './mutable-form';

describe('MutableForm()', () => {
  it('returns keys generated from values', () => {
    const VALUES = { username: '' };
    const { keys } = MutableForm(VALUES).read();

    expect(keys).toEqual(Object.keys(VALUES));
  });

  it('returns init values', () => {
    const VALUES = { username: '' };
    const { values } = MutableForm(VALUES).read();

    expect(values).toEqual(VALUES);
  });

  it('validates', () => {
    const MESSAGE = 'This field is required';
    const VALUES = { username: '' };
    const form = MutableForm(VALUES, {
      username: [(value) => (value === '' ? MESSAGE : '')],
    }).read();

    expect(form.errors).toEqual({ username: MESSAGE });
    expect(form.invalid).toBeTruthy();
    expect(form.validCount).toBe(0);
    expect(form.progress).toBe(0);
    expect(form.invalidCount).toBe(1);
    expect(form.valid).toBeFalsy();
  });

  it('sets interaction metadata', () => {
    const VALUES = { username: '' };
    const form = MutableForm(VALUES).read();

    expect(form.touched).toBeFalsy();
    expect(form.untouched).toBeTruthy();
    expect(form.confirmed).toBeFalsy();
    expect(form.unconfirmed).toBeTruthy();
  });

  describe('during validation', () => {
    it('injects value and values to validator function', () => {
      const USERNAME = 'user1994';
      const VALUES = { username: '', password: '' };
      const spy = jest.fn();
      const form = MutableForm(VALUES, { username: [spy] });

      form.set('username', USERNAME);

      expect(spy).toHaveBeenCalledWith(USERNAME, {
        username: USERNAME,
        password: '',
      });
    });
  });

  describe('set()', () => {
    it('sets values', () => {
      const USERNAME = 'user1994';
      const VALUES = { username: '', password: '' };
      const form = MutableForm(VALUES);

      form.set('username', USERNAME);

      expect(form.read().values).toEqual({
        username: USERNAME,
        password: '',
      });
    });

    it('validates', () => {
      const MESSAGE = 'This field is required';
      const VALUES = { username: 'user1994', password: '' };
      const form = MutableForm(VALUES, {
        username: [(value) => (value === '' ? MESSAGE : '')],
      });

      form.set('username', '');

      const readedForm = form.read();

      expect(readedForm.invalid).toBeTruthy();
      expect(readedForm.valid).toBeFalsy();
      expect(readedForm.validCount).toBe(1);
      expect(readedForm.progress).toBe(50);
      expect(readedForm.invalidCount).toBe(1);
      expect(readedForm.errors).toEqual({
        username: MESSAGE,
        password: '',
      });
    });

    it('updates metadata', () => {
      const VALUES = { username: '' };
      const form = MutableForm(VALUES);

      form.set('username', 'd');

      const readedForm = form.read();

      expect(readedForm.confirmed).toBeFalsy();
      expect(readedForm.unconfirmed).toBeTruthy();
      expect(readedForm.touched).toBeTruthy();
      expect(readedForm.untouched).toBeFalsy();
    });
  });

  describe('confirm()', () => {
    it('validates', () => {
      const MESSAGE = 'This field is required';
      const VALUES = { username: 'user1994', password: '' };
      const form = MutableForm(VALUES, {
        username: [(value) => (value === '' ? MESSAGE : '')],
      });

      form.set('username', '');
      form.confirm();

      const readedForm = form.read();

      expect(readedForm.invalid).toBeTruthy();
      expect(readedForm.valid).toBeFalsy();
      expect(readedForm.validCount).toBe(1);
      expect(readedForm.progress).toBe(50);
      expect(readedForm.invalidCount).toBe(1);
      expect(readedForm.errors).toEqual({
        username: MESSAGE,
        password: '',
      });
    });

    it('updates metadata', () => {
      const VALUES = { username: '' };
      const form = MutableForm(VALUES);

      form.confirm();
      const readedForm = form.read();

      expect(readedForm.confirmed).toBeTruthy();
      expect(readedForm.unconfirmed).toBeFalsy();
    });
  });

  describe('reset()', () => {
    it('resets state to initial', () => {
      const VALUES = { username: '', password: '' };
      const form = MutableForm(VALUES, {
        username: [(value) => (value === 'jacob1994' ? 'Invalid' : '')],
      });

      form.set('username', 'jacob1994');
      form.set('password', 'example');
      form.reset();

      const readedForm = form.read();

      expect(readedForm.invalid).toBeFalsy();
      expect(readedForm.valid).toBeTruthy();
      expect(readedForm.touched).toBeFalsy();
      expect(readedForm.untouched).toBeTruthy();
      expect(readedForm.values).toEqual(VALUES);
      expect(readedForm.errors).toEqual({ username: '', password: '' });
    });
  });
});
