import React, {useState} from 'react';
import '../css/editProfile.css'; // Asegúrate de agregar los estilos CSS aquí
import { HeaderPage } from './Headers';

const EditProfile: React.FC = () => {
    const [profile, setProfile] = useState({
        businessName: 'Acme Medical',
        streetAddress: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94111',
        contactName: 'John Smith',
        email: 'john@acme.com',
        phone: '(415) 123-4567',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para guardar el perfil
        console.log('Perfil actualizado:', profile);
    };

    return (
        <div>
            <HeaderPage />
            <br></br>
            <div className="edit-profile">
                <h2>Profile</h2>
                <p>Manage your business information, users, and permissions.</p>

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Business Information</legend>
                        <label htmlFor="businessName">Business Name</label>
                        <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            value={profile.businessName}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="streetAddress">Street Address</label>
                        <input
                            type="text"
                            id="streetAddress"
                            name="streetAddress"
                            value={profile.streetAddress}
                            onChange={handleInputChange}
                        />

                        <div className="inline-inputs">
                            <div>
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={profile.city}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="state">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={profile.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <label htmlFor="zipCode">Zip Code</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={profile.zipCode}
                            onChange={handleInputChange}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Contact Information</legend>
                        <label htmlFor="contactName">Contact Name</label>
                        <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            value={profile.contactName}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" name="phone" value={profile.phone} onChange={handleInputChange} />
                    </fieldset>

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
