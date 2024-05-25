import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerSeller } from '../../../Redux/Actions/registerSellerAction';
import "./RegisterSeller.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearError } from '../../../Redux/Actions/productAction';
import { useHistory } from 'react-router-dom';


const RegisterSellerForm = () => {
    const history = useHistory();
    const { email } = useSelector(
        (state) => state.user.user
    );

    const initialFormData = {
        agencyName: '',
        name: '',
        phone: '',
        email: email,
        aadharNumber: '',
        panNumber: '',
        pincode: '',
        postOffice: '',
        policeStation: '',
        address: '',
        landmark: '',
        town: '',
        state: 'West Bengal'
    };

    const initialFiles = {
        aadharFile: null,
        panFile: null,
        addressProofFile: null,
        bankAccountFile: null,
        gstCertificate: null
    };

    const [formData, setFormData] = useState(initialFormData);
    const [files, setFiles] = useState(initialFiles);
    const [formKey, setFormKey] = useState(Date.now());

    const dispatch = useDispatch();

    const registerSellerState = useSelector(state => state.registerSeller);
    const { loading, success, error } = registerSellerState;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'panNumber' ? value.toUpperCase() : value // Convert panNumber to uppercase
        }));
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        for (const key in files) {
            if (files[key]) {
                data.append(key, files[key]);
            }
        }
        dispatch(registerSeller(data));
        
        // Reset form fields
        setFormData(initialFormData);
        setFiles(initialFiles);
        setFormKey(Date.now()); // Change the key to force re-render
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-center",
                autoClose: 3000,
            });
            dispatch(clearError());
        }

        if (success) {
            toast.success("Seller Registration Successful!", {
                position: "bottom-center",
                autoClose: 3000,
            });

            setTimeout(() => {
                history.push("/profile")
            }, 3000);
        }
    }, [dispatch, success, history, error]);

    return (
        <>
            <ToastContainer />
            <div className="register-seller-container">
                <h1 className="register-seller-title">Become a Seller</h1>
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Request For Becoming a Seller Sent successfully! You Will be notified via Email</p>}
                <form className="register-seller-form" key={formKey} onSubmit={handleSubmit} encType="multipart/form-data">
                    <input className="form-input" type="text" name="agencyName" placeholder="Agency Name" value={formData.agencyName} onChange={handleInputChange} required />
                    <input className="form-input" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                    <input className="form-input" type="number" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required />
                    <input className="form-input" type="email" disabled name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                    <input className="form-input" type="number" name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleInputChange} required />
                    <label className="form-label" htmlFor="aadharFile"> Upload Your Aadhar Card Image  <span className='label-span'> (*File size should not more than 1 MB*)</span></label>
                    <input className="form-input" type="file" name="aadharFile" onChange={handleFileChange} required />
                    <input className="form-input" type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleInputChange} style={{ textTransform: 'uppercase' }} required />
                    <label className="form-label" htmlFor="panFile">Upload Your Pan Card Image <span className='label-span'> (*File size should not more than 1 MB*)</span></label>
                    <input className="form-input" type="file" name="panFile" onChange={handleFileChange} required />
                    <input className="form-input" type="number" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
                    <input className="form-input" type="text" name="postOffice" placeholder="Post Office" value={formData.postOffice} onChange={handleInputChange} required />
                    <input className="form-input" type="text" name="policeStation" placeholder="Police Station" value={formData.policeStation} onChange={handleInputChange} required />
                    <input className="form-input" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
                    <input className="form-input" type="text" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleInputChange} required />
                    <input className="form-input" type="text" name="town" placeholder="Town" value={formData.town} onChange={handleInputChange} required />
                    <input className="form-input" type="text" disabled name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
                    <label className="form-label" htmlFor="addressProofFile">Upload Your Address Proof <span className='label-span'> (*File size should not more than 1 MB*)</span></label>
                    <input className="form-input" type="file" name="addressProofFile" onChange={handleFileChange} required />
                    <label className="form-label" htmlFor="bankAccountFile">Upload Your Bank Account Proof <span className='label-span'> (*File size should not more than 1 MB*)</span></label>
                    <input className="form-input" type="file" name="bankAccountFile" onChange={handleFileChange} required />
                    <label className="form-label" htmlFor="gstCertificate">Upload Your GST Certificate <span className='label-span'> (*File size should not more than 1 MB*)</span></label>
                    <input className="form-input" type="file" name="gstCertificate" onChange={handleFileChange} required />
                    <button className="form-button" type="submit">Register</button>
                </form>
            </div>
        </>
    );
};

export default RegisterSellerForm;


