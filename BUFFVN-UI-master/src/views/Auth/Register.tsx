import { useState } from "react";

export  function Register(){


    return(

        <div className="main-container container">
		<ul className="breadcrumb">
			<li><a href="#"><i className="fa fa-home"></i></a></li>
			<li><a href="#">Tài khoản</a></li>
			<li><a href="#">Đăng ký </a></li>
		</ul>
		
		<div className="row">
			<div id="content" className="col-sm-12">
				<h2 className="title">Đăng ký tài khoản</h2>
				<p>Nếu bạn đã có tài khoản, vui lòng đăng nhập tại <a href="#">Đăng nhập</a>.</p>
				<form action="" method="post"  className="form-horizontal account-register clearfix">
					<fieldset id="account">
						<legend>Thông tin cá nhân</legend>
						<div className="form-group required">
							<label className="col-sm-2 control-label">Tên</label>
							<div className="col-sm-10">
								<input type="text" name="firstname" value="" placeholder="Tên" id="input-firstname" className="form-control"></input>
							</div>
						</div>
						<div className="form-group required">
							<label className="col-sm-2 control-label" >Họ</label>
							<div className="col-sm-10">
								<input type="text" name="lastname" value="" placeholder="Họ" id="input-lastname" className="form-control"></input>
							</div>
						</div>
						<div className="form-group required">
							<label className="col-sm-2 control-label" >E-Mail</label>
							<div className="col-sm-10">
								<input type="email" name="email" value="" placeholder="E-Mail" id="input-email" className="form-control"></input>
							</div>
						</div>
						<div className="form-group required">
							<label className="col-sm-2 control-label" >Số điện thoại</label>
							<div className="col-sm-10">
								<input type="tel" name="telephone" value="" placeholder="Số điện thoại" id="input-telephone" className="form-control"></input>
							</div>
                        </div>
					</fieldset>
					<fieldset id="address">
						<legend>Địa chỉ</legend>
						<div className="form-group required">
							<label className="col-sm-2 control-label" >Tỉnh/Thành phố</label>
							<div className="col-sm-10">
								<select name="country_id" id="input-country" className="form-control">
                                <option value="An Giang">An Giang</option>
<option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
<option value="Bắc Giang">Bắc Giang</option>
<option value="Bắc Kạn">Bắc Kạn</option>
<option value="Bạc Liêu">Bạc Liêu</option>
<option value="Bắc Ninh">Bắc Ninh</option>
<option value="Bến Tre">Bến Tre</option>
<option value="Bình Định">Bình Định</option>
<option value="Bình Dương">Bình Dương</option>
<option value="Bình Phước">Bình Phước</option>
<option value="Bình Thuận">Bình Thuận</option>
<option value="Bình Thuận">Bình Thuận</option>
<option value="Cà Mau">Cà Mau</option>
<option value="Cao Bằng">Cao Bằng</option>
<option value="Đắk Lắk">Đắk Lắk</option>
<option value="Đắk Nông">Đắk Nông</option>
<option value="Điện Biên">Điện Biên</option>
<option value="Đồng Nai">Đồng Nai</option>
<option value="Đồng Tháp">Đồng Tháp</option>
<option value="Đồng Tháp">Đồng Tháp</option>
<option value="Gia Lai">Gia Lai</option>
<option value="Hà Giang">Hà Giang</option>
<option value="Hà Nam">Hà Nam</option>
<option value="Hà Tĩnh">Hà Tĩnh</option>
<option value="Hải Dương">Hải Dương</option>
<option value="Hậu Giang">Hậu Giang</option>
<option value="Hòa Bình">Hòa Bình</option>
<option value="Hưng Yên">Hưng Yên</option>
<option value="Khánh Hòa">Khánh Hòa</option>
<option value="Kiên Giang">Kiên Giang</option>
<option value="Kon Tum">Kon Tum</option>
<option value="Lai Châu">Lai Châu</option>
<option value="Lâm Đồng">Lâm Đồng</option>
<option value="Lạng Sơn">Lạng Sơn</option>
<option value="Lào Cai">Lào Cai</option>
<option value="Long An">Long An</option>
<option value="Nam Định">Nam Định</option>
<option value="Nghệ An">Nghệ An</option>
<option value="Ninh Bình">Ninh Bình</option>
<option value="Ninh Thuận">Ninh Thuận</option>
<option value="Phú Thọ">Phú Thọ</option>
<option value="Quảng Bình">Quảng Bình</option>
<option value="Quảng Bình">Quảng Bình</option>
<option value="Quảng Ngãi">Quảng Ngãi</option>
<option value="Quảng Ninh">Quảng Ninh</option>
<option value="Quảng Trị">Quảng Trị</option>
<option value="Sóc Trăng">Sóc Trăng</option>
<option value="Sơn La">Sơn La</option>
<option value="Tây Ninh">Tây Ninh</option>
<option value="Thái Bình">Thái Bình</option>
<option value="Thái Nguyên">Thái Nguyên</option>
<option value="Thanh Hóa">Thanh Hóa</option>
<option value="Thừa Thiên Huế">Thừa Thiên Hu</option>ế
<option value="Tiền Giang">Tiền Giang</option>
<option value="Trà Vinh">Trà Vinh</option>
<option value="Tuyên Quang">Tuyên Quang</option>
<option value="Vĩnh Long">Vĩnh Long</option>
<option value="Vĩnh Phúc">Vĩnh Phúc</option>
<option value="Yên Bái">Yên Bái</option>
<option value="Phú Yên">Phú Yên</option>
<option value="Tp.Cần Thơ">Tp.Cần Thơ</option>
<option value="Tp.Đà Nẵng">Tp.Đà Nẵng</option>
<option value="Tp.Hải Phòng">Tp.Hải Phòng</option>
<option value="Tp.Hà Nội">Tp.Hà Nội</option>
<option value="TP  HCM">TP HCM</option>
								</select>
							</div>
						</div>
                        <div className="form-group">
							<label className="col-sm-2 control-label" >Quận/Huyện</label>
							<div className="col-sm-10">
								<input type="text" name="address_2" value="" placeholder="Quận/Huyện" id="input-address-2" className="form-control"></input>
							</div>
						</div>
                        <div className="form-group required">
							<label className="col-sm-2 control-label" >Địa chỉ </label>
							<div className="col-sm-10">
								<input type="text" name="address_1" value="" placeholder="Địa chỉ " id="input-address-1" className="form-control"></input>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<legend>Mật khẩu</legend>
						<div className="form-group required">
							<label className="col-sm-2 control-label" >Mật khẩu</label>
							<div className="col-sm-10">
								<input type="password" name="password" value="" placeholder="Mật khẩu" id="input-password" className="form-control"></input>
							</div>
						</div>
						<div className="form-group required">
							<label className="col-sm-2 control-label" >Nhập lại mật khẩu</label>
							<div className="col-sm-10">
								<input type="password" name="confirm" value="" placeholder="Nhập lại mật khẩu" id="input-confirm" className="form-control"></input>
							</div>
						</div>
					</fieldset>
					<div className="buttons">
						<div className="pull-right">Tôi đồng ý với các điều khoản <a href="#" className="agree"><b></b></a>
							<input className="box-checkbox" type="checkbox" name="agree" value="1"></input> &nbsp;
							<input type="submit" value="Continue" className="btn btn-primary"></input>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
    )
}