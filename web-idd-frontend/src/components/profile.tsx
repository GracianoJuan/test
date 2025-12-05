'use client'

import { useState } from "react"
import { apiService } from "@/services/apiServices"
import { Modal } from "./Modal"

const ProfileContainer = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        position: '',
        extNumber: '',
        phone: '',
        signUrl: ''
    })
    const [formData, setFormData] = useState({
        name: profileData.name,
        email: profileData.email,
        position: profileData.position,
        extNumber: profileData.extNumber,
        phone: profileData.phone,
        signfile : ''
    })

    const handlerProfile = async (id : number) => {
        try {
            const data = await apiService.getProfile(id)
            setProfileData({name: 'string', email: 'string', position: 'string', extNumber: 'string', phone: 'string', signUrl: 'string'})
        } catch (error) {
           console.error(error) 
        }
    }

    return (
        <>
            <div className="">
                <div>
                    <div>Profile</div>
                    <div>
                        <ul>
                            <li>Nama<span>:</span></li>
                            <li>Email<span>:</span></li>
                            <li>Jabatan/Posisi<span>:</span></li>
                            <li>Tanda tangan<span>:</span>
                                <span className="border">
                                    {/* if no image display */}
                                    No Data
                                    {/* if image existed show image */}
                                </span>
                            </li>
                            <li>No. ext<span>:</span></li>
                            <li>No. HP<span>:</span></li>
                        </ul>
                    </div>
                    <div className="">
                        <button className="bg-blue-600 text-white rounded-lg px-2">Edit</button>
                    </div>
                </div>
            </div>
            {/* modal for form edit */}
            {/* <Modal
                title={'Edit Profil'}
                children={(<>addaid</>)}
            /> */}
        </>
    )
}

export default ProfileContainer