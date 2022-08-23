export const DefaultConst =
{
    Domain: "http://localhost:3000",
    Api: "http://103.153.73.210:5000",
    MyShop: {
        DistrictId: 1462
    },
    Shipping: {
        Type: { DiBo: 2, MayBay: 1 },
        Provider: {
            GiaoHangNhanh: {
                Name: "Giao Hang Nhanh",
                TokenApi: "285bc98e-0c27-11ed-9cd0-9a5a4229953a",
                ShopId: "117008-0968763061",
                ClientId: "2503575",
                Api: {
                    getProvince: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
                    getDistrict: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
                    getWard: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
                    getShippingFee: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee"
                }
            }
        }
    },
    pathImage: '/tmp/data/images/'
}