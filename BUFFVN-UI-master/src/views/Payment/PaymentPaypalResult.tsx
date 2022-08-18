import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function PaymentPayPalDetail(data: { price: number, type: string }) {
    const navigate = useNavigate();



    const onBack = () => {
        navigate("/payment")
    }
    return (
        <div className='container'>

            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <div className="toast show">
                        <div className="toast-header">
                            <strong className="mx-auto">THANH TOÁN {
                                data.type === "success" ? "THÀNH CÔNG" : "THẤT BẠI"
                            }</strong>
                        </div>
                        <div className="toast-body">
                            <p>Số tiền thanh toán: <strong style={{ fontSize: 18 }}>{data.price} USD</strong> </p>
                        </div>
                        <div className='text-center mb-2'>
                            <button className='btn btn-primary' onClick={onBack}>Quay lại</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PaymentPayPalCondition(data: { status: string, price: number }) {

    if (data.status !== "waiting") {
        return <PaymentPayPalDetail type={data.status} price={data.price}></PaymentPayPalDetail>
    }
    return (
        <div>Please waiting</div>
    )
}


export default function PaymentPayPalResult() {
    const location = useLocation();


    useEffect(() => {

    })
    const [status, setStatus] = useState("waiting")
    const [price, setPrice] = useState(0)
    useEffect(() => {
        let state = location.state as any;
        setPrice(parseFloat(state.price ?? "0"))
        setStatus(state.status)

    })
    return (
        <PaymentPayPalCondition price={price} status={status} ></PaymentPayPalCondition>
    )

}