export default class PaymentConfig {
    public static Vnpay: Readonly<{
        secretKey: string,
        vnPayUrl : string
    }> = {
            secretKey: "KQKPATCHVVELMVMEMQFLUQPEMFYIRMJD",
            vnPayUrl : "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
        }
}