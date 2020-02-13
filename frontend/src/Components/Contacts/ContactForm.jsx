/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contacts/ContactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const { addContact, current, clearCurrent, updateContact } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current)
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    let { name, email, phone, type } = contact

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if (name) {
            if (current === null) {
                addContact(contact);
            } else {
                updateContact(contact)
            }
            clearAll()
        } else {
            Toast.fire({ icon: 'error', title: 'Contact Name is required.' })
        }
    }

    const clearAll = () => {
        clearCurrent();
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    }

    return (
        <div className="card bg-lighten">
            <form onSubmit={onSubmit}>
                <h2 className="text-primary text-center">
                    {current ? 'Edit Contact' : 'Add Contact'}
                </h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Name"
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                        placeholder="Phone"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <h5>Contact Type</h5>
                    <div style={styles.checkGroup}>
                        <div className="mr-2" style={styles.checkItem}>
                            <input
                                name="type"
                                type="radio"
                                value="personal"
                                onChange={onChange}
                                checked={type === 'personal'}
                            />
                            <p>Personal</p>
                        </div>
                        <div className="mr-2" style={styles.checkItem}>
                            <input
                                name="type"
                                type="radio"
                                onChange={onChange}
                                value="professional"
                                checked={type === 'professional'}
                            />
                            <p>Professional</p>
                        </div>
                    </div>
                </div>
                <div>
                    <input
                        type="submit"
                        value={current ? 'Update Contact' : 'Add Contact'}
                        className="btn btn-primary btn-block"
                    />
                </div>
                {
                    current && <div className="mt-2">
                        <button className="btn btn-outline-primary btn-block" onClick={clearAll}>
                            Clear
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}

const styles = {
    checkGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'initial'
    },
    checkItem: {
        display: 'flex',
        padding: '10px 10px',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}

export default ContactForm