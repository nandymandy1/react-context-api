/* eslint-disable */
import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contacts/ContactContext';


export const ContactItem = ({ contact }) => {
    let { _id, email, name, phone, type } = contact

    const contactContext = useContext(ContactContext);

    const { deleteContact, setCurrent, clearCurrent } = contactContext

    const onDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                deleteContact(_id);
                clearCurrent();
            }
        })
    }

    return (
        <div className="card bg-light mb-2">
            <h4 className="text-primary text-left">
                {name}{' '}
                <span
                    className={'type-badge badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}
                >{type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h4>
            {email && (
                <div className="mb-1">
                    <i className="fas fa-envelope-open text-danger"></i> {email}
                </div>
            )}
            {phone && (
                <div className="mb-1">
                    <i className="fas fa-phone text-success"></i> {phone}
                </div>
            )}
            <p className="mt-2">
                <button className="btn btn-sm btn-dark mr-2" onClick={() => setCurrent(contact)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={onDelete}>Danger</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem