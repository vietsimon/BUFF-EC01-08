import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PaymentService from '../../services/PaymentService';

function PaymentVnPayDetail(data: { price: number, paymentType: string, type: string }) {
    const navigate = useNavigate();
    const { orderId } = useParams();
    useEffect(() => {
        if (orderId) {
            if (data.type === "success") {
                PaymentService.PaymentSuccessAsync({ orderId }).then(x => {
                    console.log("PaymentSuccessAsync", x);
                })
            }
            else {
                PaymentService.PaymentCancelAsync({ orderId }).then(x => {
                    console.log("PaymentCancelAsync", x);
                })
            }
        };
    }, [])
    const onBack = () => {
        navigate("/")
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
                            <p>Số tiền thanh toán: <h3><strong>{data.price / 100} VND</strong></h3> </p>
                            <p>Hình thức thanh toán: {data.paymentType}</p>
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

function PaymentVnPayCondition(data: { status: string, price: number, paymentType: string }) {

    if (data.status !== "waiting") {
        return <PaymentVnPayDetail type={data.status} price={data.price} paymentType={data.paymentType}></PaymentVnPayDetail>
    }
    return (
        <div>Please waiting</div>
    )
}


export default function PaymentVnPayResult() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("waiting")
    const [price, setPrice] = useState(0)
    const [paymentType, setPaymentType] = useState("")
    useEffect(() => {
        const transactionStatus = searchParams.get('vnp_TransactionStatus')
        const paymentType = searchParams.get('vnp_CardType')
        const amount = searchParams.get('vnp_Amount')
        setPrice(parseFloat(amount ?? "0"))
        setPaymentType(paymentType ?? "")
        if (transactionStatus === '00') {
            setStatus("success")
        }
        else setStatus("fail")
    })
    return (
        <PaymentVnPayCondition paymentType={paymentType} price={price} status={status} ></PaymentVnPayCondition>
    )

}