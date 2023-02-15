import { useState } from "react";
import { useLocalStorage } from "../hooks/Hooks";
import { ContactForm } from "components/ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";

import { Div, H1, H2, P } from "./App.styled";

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

 const handleSubmit = data => {
   setContacts(( contacts ) => 
   contacts.find(contact => contact.name === data.name)
    ? alert(`${data.name} is already in contacts`)
     :  [...contacts, data]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  
  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  return filteredContacts; 
  };

  const deleteContacts = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  return (
    
    <Div>
      <H1>Phonebook</H1>
      <ContactForm onSubmit={handleSubmit}/>
      <H2>Contacts</H2>
      {contacts.length !== 0 ?
       <>
      <Filter value={filter} onChange={changeFilter}/>
      <ContactList contacts={filteredContacts()} onDeleteContact={deleteContacts} />
       </> : 
      <P>There are no saved contacts!</P>
      }
    </Div>
  );
};
