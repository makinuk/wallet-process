'use client'

import User, { IUser } from "@/models/UserModel"
import axios from "axios"
import { use, useEffect, useState } from "react"

export default function Profile() {

    const [user,setUser] = useState<IUser | undefined>()


    const loadUserDetail = async () => {
        const res = await axios.get("/api/user/me");
        setUser(res.data.user)
    }


    useEffect(() => {
        loadUserDetail()
    },[])


    return (
        <div className="place-content-center">
        <div className="self-center card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Address</span>
                </label>
                <input type="text" placeholder="Wallet Address" value={user?.address} className="input input-bordered" />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">WorldId Verification</span>
                </label>
                <input type="checkbox" className="toggle toggle-warning" checked={user?.isWorldIdVerified as boolean} />
                </div>
            </div>
        </div>
    </div>)
}
