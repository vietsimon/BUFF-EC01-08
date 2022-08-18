import { useEffect, useState } from "react";
import { useCart } from "../../../Components/Cart/useCart";
import ShippingService from "../../../services/ShippingService";
import { CartMetaDataType } from "../../../type/CartMetaDataType";
import { DefaultConst } from "../../../ultils/DefaultConst";

export function CartAddress() {
    const { metadata, setCartMetadata } = useCart();
    const [province, setProvince] = useState<Array<any>>();
    const [district, setDistrict] = useState<Array<any>>();
    const [ward, setWard] = useState<Array<any>>();

    const [shipping, setShipping] = useState<any>({
        "from_district_id": DefaultConst.MyShop.DistrictId,
        "service_type_id": DefaultConst.Shipping.Type.DiBo,
        // "to_district_id": 1452,
        // "to_ward_code": "21012",
        "height": 50,
        "length": 20,
        "weight": 200,
        "width": 20
    });

    const getCartMetaData = () => {
        let metaCart = metadata as CartMetaDataType;
        return metaCart;
    }
    const setShippingMethod = () => {
        let meta = getCartMetaData();
        meta.shippingMethod = "GHN";
        setCartMetadata(meta);
    }

    const setShippingAddress = (event: any) => {
        let meta = getCartMetaData();
        meta.shippingAddress = event.target.value;
        setCartMetadata(meta);
    }

    useEffect(() => {
        let meta = getCartMetaData();
        setShippingMethod();
        getProvince();
        if (meta?.shippingProvinceId)
            getDistrict(meta?.shippingProvinceId);
        if (meta?.shippingDistrictId)
            getWard(meta?.shippingDistrictId);
    }, [])

    const provinceChange = (event: any) => {
        let province_id = event.target.value;
        if (!province_id) {
            shipping["to_district_id"] = null;
            shipping["to_ward_code"] = null;
            setShipping(shipping);
            setDistrict([]);
        }
        else { getDistrict(province_id); }

        setWard([]);

        let meta = getCartMetaData();
        meta.shippingProvinceId = province_id;
        setCartMetadata(meta);
    }
    const districtChange = (event: any) => {
        let districtId = event.target.value;
        if (!districtId) {
            shipping["to_district_id"] = null;
            shipping["to_ward_code"] = null;
            setShipping(shipping);
            setWard([]);
        }
        else {
            shipping["to_district_id"] = districtId;
            shipping["to_ward_code"] = null;
            setShipping(shipping);
            getWard(districtId);
        }

        let meta = getCartMetaData();
        meta.shippingDistrictId = districtId;
        setCartMetadata(meta);
    }
    const wardChange = (event: any) => {
        let wardCode = event.target.value;
        if (!wardCode) {
            shipping["to_ward_code"] = null;
            setShipping(shipping);
            return;
        } else {
            shipping["to_ward_code"] = wardCode;
            setShipping(shipping);
        }

        let meta = getCartMetaData();
        meta.shippingWardId = wardCode;
        setCartMetadata(meta);
        //caculator shipping fee again
        caculate();
    }

    const getProvince = () => {
        ShippingService.GetProvinceAsync({}).then((x) => {
            setProvince(x);
        });
    }
    const getDistrict = (province_id: any) => {
        ShippingService.GetDistrictAsync({ 'province_id': province_id }).then((x) => {
            setDistrict(x);
        }).catch(x => console.log(x));
    }
    const getWard = (districtId: any) => {
        ShippingService.GetWardAsync({ 'district_id': districtId }).then((x) => {
            setWard(x);
        }).catch(x => console.log(x));
    }

    const caculate = () => {
        ShippingService.GetShippingFeeAsync(shipping).then((x) => {
            let meta = getCartMetaData();
            meta.shippingFee = x?.total ?? 0;
            setCartMetadata(meta);
        }).catch(x => console.log(x));
    }
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title"><i className="fa fa-truck"></i> Phương thức giao hàng</h4>
            </div>
            <div className="panel-body">
                <fieldset className="required">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={true} value="GHN" name="shippingMethod" />
                            Giao Hàng Nhanh</label>
                    </div>
                    <div className="form-group required">
                        <label className="control-label">Địa chỉ</label>
                        <input type="text" className="form-control" placeholder="123 Dương Quảng Trị..." name="shippingAddress"
                            value={metadata?.shippingAddress}
                            onChange={setShippingAddress}
                        />
                    </div>
                    <div className="form-group required">
                        <label className="control-label">Tỉnh/ Thành Phố</label>
                        <select name="province_id" className="form-control"
                            onChange={provinceChange}
                        >
                            <option value=""> --- Chọn tỉnh/ thành phố --- </option>
                            {
                                province?.map((x: any) =>(<option
                                    key={`provice-${x?.ProvinceID}`}
                                    selected={metadata?.shippingProvinceId === `${x?.ProvinceID}`}
                                    value={x?.ProvinceID}
                                >
                                    {x?.ProvinceName}
                                </option>
                                ))

                            }
                        </select>
                    </div>
                    <div className="form-group required">
                        <label className="control-label">Quận/ Huyện</label>
                        <select name="district_id" className="form-control" onChange={districtChange}
                        >
                            <option value=""> --- Chọn quận/ huyện --- </option>
                            {
                                district?.map((x: any) =>
                                (<option key={`district-${x?.DistrictID}`} value={x?.DistrictID}
                                    selected={metadata?.shippingDistrictId === `${x?.DistrictID}`}
                                >{x?.DistrictName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group required">
                        <label className="control-label">Phường / Xã</label>
                        <select name="ward_id" className="form-control" onChange={wardChange}>
                            <option value=""> --- Chọn phường/ xã --- </option>
                            {
                                ward?.map((x: any) =>
                                (<option key={`ward-${x?.WardCode}`} value={x?.WardCode}
                                    selected={metadata?.shippingWardId === x?.WardCode}
                                >{x?.WardName}</option>
                                ))
                            }
                        </select>
                    </div>
                </fieldset>
                <button type="button" data-loading-text="Loading..." className="btn btn-primary" onClick={caculate}>Tính phí</button>
            </div>
        </div>
    )
}