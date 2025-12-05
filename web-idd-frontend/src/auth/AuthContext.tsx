'use client'

import React, { createContext, useContext, useState, useEffect } from "react"

// const AuthContext = createContext();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState()
    const [session, setSession] = useState()
}