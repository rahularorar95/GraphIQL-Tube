const Item =()=>{
    return(
        <ol className='contact-list'>
                {showingContacts.map(contact=>(
                    <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={{
                                backgroundImage:`url(${contact.avatarURL})`
                        }} />

                        <div className='contact-details'>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>

                        <button onClick={()=> onDeleteContact(contact)} className='contact-remove'>
                            Remove
                        </button>
                    </li>
                ))}
            </ol> 
    )
}