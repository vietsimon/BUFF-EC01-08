import { useEffect, useState } from "react";
import { useCart } from "../../../Components/Cart/useCart";
import ShippingService from "../../../services/ShippingService";
import { DefaultConst } from "../../../ultils/DefaultConst";

export function CartCustomerInfomation() {
    const { metadata, setCartMetadata } = useCart();

    const [province, setProvince] = useState<Array<any>>();
    const [district, setDistrict] = useState<Array<any>>();
    const [ward, setWard] = useState<Array<any>>();

    useEffect(() => {
        ShippingService.GetProvinceAsync({}).then((x) => {
            setProvince(x);
        });
    }, [])

    const provinceChange = (event: any) => {
        if (!event.target.value) {
            setDistrict([]);
            return;
        }
        getDistrict(event.target.value);
    }
    const districtChange = (event: any) => {
        let districtId = event.target.value;
        if (!districtId) {
            setWard([]);
            return;
        }

        getWard(districtId);
    }
    const wardChange = (event: any) => {
        // let wardCode = event.target.value;
        // if (!wardCode) {
        //     return;
        // }
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
    
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title"><i className="fa fa-book"></i> Địa chỉ</h4>
            </div>
            <div className="panel-body">

                <fieldset className="required">
                    <div className="form-group required">
                        <label className="control-label">Địa chỉ</label>
                        <input type="text" className="form-control" id="input-payment-address-1" placeholder="Address 1" value="" name="address_1" />
                    </div>
                    <div className="form-group required">
                        <label className="control-label">Tỉnh/ Thành Phố</label>
                        <select name="province_id" className="form-control"
                            onChange={provinceChange}
                        >
                            <option value=""> --- Chọn tỉnh/ thành phố --- </option>
                            {
                                province?.map((x: any) =>
                                (<option key={`provice-${x?.ProvinceID}`} value={x?.ProvinceID}>{x?.ProvinceName}</option>
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
                                (<option key={`district-${x?.DistrictID}`} value={x?.DistrictID}>{x?.DistrictName}</option>
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
                                (<option key={`ward-${x?.WardCode}`} value={x?.WardCode}>{x?.WardName}</option>
                                ))
                            }
                        </select>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}