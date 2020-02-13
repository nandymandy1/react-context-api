import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contacts/ContactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { clearFilter, filterContacts, filtered } = contactContext;

    const keyword = useRef('');

    useEffect(() => {
        if (filtered === null) {
            keyword.current.value = ''
        }
    })

    const onChange = e => {
        if (keyword.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form className="mb-3">
            <input type="text" ref={keyword} onChange={onChange} className="form-control" placeholder="Search Contacts.." />
        </form>
    )
}

export default ContactFilter