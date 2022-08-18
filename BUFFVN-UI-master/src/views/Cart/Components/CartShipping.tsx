import { useEffect, useState } from "react";
import { useCart } from "../../../Components/Cart/useCart";
import ShippingService from "../../../services/ShippingService";
import { DefaultConst } from "../../../ultils/DefaultConst";

export function CartShipping() {
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



    //const [provinceSelected, setProvinceSelected] = useState<Array<any>>();

    useEffect(() => {
        ShippingService.GetProvinceAsync({}).then((x) => {
            setProvince(x);
        });
    }, [])

    const provinceChange = (event: any) => {
        if (!event.target.value) {
            shipping["to_district_id"] = null;
            shipping["to_ward_code"] = null;
            setShipping(shipping);
            setDistrict([]);
            return;
        }
        getDistrict(event.target.value);
    }
    const districtChange = (event: any) => {
        let districtId = event.target.value;
        if (!districtId) {
            shipping["to_district_id"] = null;
            shipping["to_ward_code"] = null;
            setShipping(shipping);
            setWard([]);
            return;
        }

        shipping["to_district_id"] = districtId;
        shipping["to_ward_code"] = null;
        setShipping(shipping);
        getWard(districtId);
    }
    const wardChange = (event: any) => {
        let wardCode = event.target.value;
        if (!wardCode) {
            shipping["to_ward_code"] = null;
            setShipping(shipping);
            return;
        }
        shipping["to_ward_code"] = wardCode;
        setShipping(shipping);
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
            let meta = metadata as any;
            meta.shippingFee = x.total;
            setCartMetadata(meta);
        }).catch(x => console.log(x));
    }
    return (
        <div className="form-horizontal">
            <div className="form-group required">
                <label className="col-sm-2 control-label" >Tỉnh/ Thành Phố</label>
                <div className="col-sm-10">
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
            </div>
            <div className="form-group required">
                <label className="col-sm-2 control-label" >Quận/ Huyện</label>
                <div className="col-sm-10">
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
            </div>
            <div className="form-group required">
                <label className="col-sm-2 control-label" >Phường / Xã</label>
                <div className="col-sm-10">
                    <select name="ward_id" className="form-control" onChange={wardChange}>
                        <option value=""> --- Chọn phường/ xã --- </option>
                        {
                            ward?.map((x: any) =>
                            (<option key={`ward-${x?.WardCode}`} value={x?.WardCode}>{x?.WardName}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {/* <div className="form-group required">
                <label className="col-sm-2 control-label" >Post Code</label>
                <div className="col-sm-10"><input type="text" name="postcode" value="" placeholder="Post Code" id="input-postcode" className="form-control" /></div>
            </div> */}
            <button type="button" id="button-quote" data-loading-text="Loading..." className="btn btn-primary" onClick={caculate}>Tính phí</button>
        </div>
    )
}