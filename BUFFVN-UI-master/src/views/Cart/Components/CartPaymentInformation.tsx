import { useEffect, useState } from "react";
import { useCart } from "../../../Components/Cart/useCart";
import { CartMetaDataType } from "../../../type/CartMetaDataType";

export function CartPaymentInformation() {
    const { metadata, setCartMetadata } = useCart();

    const getCartMetaData = () => {
        let metaCart = metadata as CartMetaDataType;
        return metaCart;
    }
    const setPaymentMethod = (event: any) => {
        let meta = getCartMetaData();
        meta.paymentMethod = event.target.value;
        setCartMetadata(meta);
    }
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title"><i className="fa fa-credit-card"></i> Thanh toán</h4>
            </div>
            <div className="panel-body">
                <p>Chọn phương thức thanh toán</p>
                <div className="radio">
                    <label>
                        <input type="radio" name="paymentMethod" value="vnpay" onClick={setPaymentMethod} checked={metadata?.paymentMethod==='vnpay'}/>VN Pay
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="paymentMethod" value="paypal" onClick={setPaymentMethod} checked={metadata?.paymentMethod==='paypal'}/>Paypal
                    </label>
                </div>
                
            </div>
        </div>
    )
}