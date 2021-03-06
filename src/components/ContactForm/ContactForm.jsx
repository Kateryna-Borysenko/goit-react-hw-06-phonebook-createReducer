import { useState, useContext, Suspense } from 'react';
import { connect } from 'react-redux';
import { addContact } from 'redux/contacts/contactsActions';
import s from './ContactForm.module.css';
import { ThemeContext, themes } from 'context/themeContext';
// import Spinner from 'components/common/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const ContactForm = ({ onSubmitForm }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { theme } = useContext(ThemeContext);

  const { t } = useTranslation();

  const onChangeInput = e => {
    const { name, value } = e.target;

    switch (
      name //e.target.name
    ) {
      case 'name':
        setName(value); //e.target.value
        break;

      case 'number':
        setNumber(value); //e.target.value
        break;

      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    //action add
    onSubmitForm({
      name,
      number,
    });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.contacsForm} onSubmit={onSubmit}>
      <label className={s.label}>
        <span className={theme === themes.light ? s.litghtTitle : s.darkTitle}>
          {t('contactForm.name')}
        </span>
        <input
          className={
            theme === themes.light ? s.lightTextField : s.darkTextField
          }
          type="text"
          onChange={onChangeInput}
          value={name}
          name="name"
          placeholder={t('contactForm.placeholderName')}
          required
        />
      </label>

      <label className={s.label}>
        <span className={s.title}>{t('contactForm.number')}</span>
        <input
          className={
            theme === themes.light ? s.lightTextField : s.darkTextField
          }
          type="tel"
          onChange={onChangeInput}
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder={t('contactForm.placeholderNumber')}
          required
        />
      </label>

      <button type="submit" className={s.addBtn}>
        {t('contactForm.btn')}
      </button>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  onSubmitForm: ({ name, number }) => dispatch(addContact({ name, number })),
});
export default connect(null, mapDispatchToProps)(ContactForm);
