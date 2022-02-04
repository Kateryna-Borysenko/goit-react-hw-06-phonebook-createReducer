import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact, changeFilter } from './contactsActions';
import { toast } from "react-toastify";
import { combineReducers } from 'redux';

const items = createReducer([
    { id: 'id-1', name: 'Rosie Simpson', number: '+38 (099) 459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '+38 098 443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '+38 (098) 645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '+38 098 227-91-26' },
], builder => {
    builder
        .addCase(addContact, (state, action) => {

            if (state.map(contact => contact.name).includes(action.payload.name)) {
                toast.warn(`${action.payload.name} is already exist`);
                return;
            }
            return [...state, action.payload];
        })
        .addCase(deleteContact, (state, action) =>
            state.filter(contact => contact.id !== action.payload)
        )

})
const filter = createReducer('', builder => {
    builder
        .addCase(changeFilter, (_, action) =>
            action.payload
        )
})

export default combineReducers({
    items,
    filter,
});