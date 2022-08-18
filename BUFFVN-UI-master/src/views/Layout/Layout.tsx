import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { CartProvider } from "../../Components/Cart/useCart"
import { FooterComponent } from "../../Components/Footer"
import HeaderComponent from "../../Components/Header"

export default function Layout() {
    return (
        <>
            <CartProvider 
                onItemAdd={(item) => console.log(`Item ${item} added!`)}
                onItemUpdate={(item) => console.log(`Item ${item} updated.!`)}
                onItemRemove={() => console.log(`Item removed!`)}
            >
                <HeaderComponent></HeaderComponent>
                <div className="main-container container"><Outlet></Outlet></div>
                <FooterComponent></FooterComponent>
            </CartProvider>
        </>
    )
}