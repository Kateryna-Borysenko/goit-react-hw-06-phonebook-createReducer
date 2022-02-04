import { createAction, nanoid } from '@reduxjs/toolkit';

const addContact = createAction('contacts/add', ({ name, number }) => ({
    payload: {
        id: nanoid(),
        name,
        number,
    },
}));

const deleteContact = createAction('contacts/delete');

const changeFilter = createAction('contacts/changeFilter');

export { addContact, deleteContact, changeFilter };