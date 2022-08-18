import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdverSideBar } from "../../Components/Adver/AdverSideBar";
import { SlideBasic } from "../../Components/Slide/SlideBasic";
import { SlideDetail } from "../../Components/Slide/SlideDetail";
import ProductService from "../../services/ProductService";
import Utils from "../../ultils/common";
import { ProductCategorySideBar } from "./Components/ProductCategorySideBar";
import { ProductLastestSideBar } from "./Components/ProductLastestSideBar";
import { ProductRelated } from "./Components/ProductRelated";

export function ProductDetail() {
	const { id } = useParams();
	const [data, setData] = useState<any>();
	const [quantity, setQuantity] = useState<number>(1);

	let quantityDownClick = () => {
		let q = quantity - 1;
		if (q <= 0) q = 1;
		setQuantity(q);
	}
	let quantityUpClick = () => {
		let q = quantity + 1;
		if (q > 30) q = 30;
		setQuantity(q);
	}

	useEffect(() => {
		ProductService.GetProductDetailAsync(id).then((x) => {
			setData(x);
		});
	}, [])

	return (
		<>
			<ul className="breadcrumb">
				<li><a href="#"><i className="fa fa-home"></i></a></li>
				<li><a href={`/product/${data?.category_Id}`}>{data?.category_name}</a></li>
			</ul>

			<div className="row">
				<aside className="col-sm-4 col-md-3" id="column-left">
					<ProductCategorySideBar></ProductCategorySideBar>
					<ProductLastestSideBar></ProductLastestSideBar>
					<AdverSideBar></AdverSideBar>
				</aside>

				<div id="content" className="col-md-9 col-sm-8">

					<div className="product-view row">
						<div className="left-content-product col-sm-12 col-xs-12">
							<div className="row">
								<div className="content-product-left  col-sm-6 col-xs-12 ">
									<SlideDetail key={'slider-detail'} images={data?.images}></SlideDetail>
								</div>

								<div className="content-product-right col-sm-6 col-xs-12">
									<div className="title-product">
										<h1>{data?.name}</h1>
									</div>

									<div className="box-review form-group">
										<div className="ratings">
											<div className="rating-box">
												<span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x"></i></span>
												<span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x"></i></span>
												<span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x"></i></span>
												<span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x"></i></span>
												<span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x"></i></span>
											</div>
										</div>

										{/* <a className="reviews_button" href="" >0 reviews</a>	|
										<a className="write_review_button" href="" >Write a review</a> */}
									</div>

									<div className="product-label form-group">
										<div className="product_page_price price"  >
											<span className="price-new" >{Utils.PriceDisplay(data?.price)}</span>
											<span className="price-old">{Utils.PriceDisplay(data?.oldPrice)}</span>
										</div>
										{/* <div className="stock"><span>Availability:</span> <span className="status-stock">In Stock</span></div> */}
									</div>

									<div className="product-box-desc">
										<div className="inner-box-desc">
											{data?.key && <div className="sku"><span>Sku:</span> {data?.key}</div>}
											{data?.material && <div className="material"><span>Chất liệu:</span> {data?.material}</div>}
											{data?.gender && <div className="gender"><span>Giới tính:</span> {data?.gender}</div>}
											{data?.label && <div className="brand"><span>Nhãn hiệu:</span> {data?.label}</div>}
											{data?.technology && <div className="technology"><span>Công nghệ:</span> {data?.technology}</div>}
											{data?.category_name && <div className="category"><span>Danh mục:</span> <a href={`/product/${data?.categoryId}`}>{data?.category_name}</a></div>}
											{data?.color_name && <div className="color"><span>Màu:</span>{data?.color_name}</div>}
											{data?.size_name && <div className="size"><span>Kích thước:</span>{data?.size_name}</div>}
										</div>
									</div>

									<div id="product">
										{/* <h4>Available Options</h4>
										<div className="image_option_type form-group required">
											<label className="control-label">Colors</label>
											<ul className="product-options clearfix" id="input-option231">
												<li className="radio">
													<label>
														<input className="image_radio" type="radio" name="option[231]" value="33" /> <img src="image/demo/colors/blue.jpg"
															data-original-title="blue +$12.00" className="img-thumbnail icon icon-color" />				<i className="fa fa-check"></i>
														<label> </label>
													</label>
												</li>
												<li className="radio">
													<label>
														<input className="image_radio" type="radio" name="option[231]" value="34" /> <img src="image/demo/colors/brown.jpg"
															data-original-title="brown -$12.00" className="img-thumbnail icon icon-color" />				<i className="fa fa-check"></i>
														<label> </label>
													</label>
												</li>
												<li className="radio">
													<label>
														<input className="image_radio" type="radio" name="option[231]" value="35" /> <img src="image/demo/colors/green.jpg"
															data-original-title="green +$12.00" className="img-thumbnail icon icon-color" />				<i className="fa fa-check"></i>
														<label> </label>
													</label>
												</li>
												<li className="selected-option">
												</li>
											</ul>
										</div> */}

										<div className="form-group box-info-product">
											<div className="option quantity">
												<div className="input-group quantity-control" unselectable="on" >
													<label>Số lượng</label>
													<input className="form-control" type="text" name="quantity"
														value={quantity} />
													<input type="hidden" name="product_id" value={data?.id} />
													<span className="input-group-addon product_quantity_down" onClick={quantityDownClick}>−</span>
													<span className="input-group-addon product_quantity_up" onClick={quantityUpClick}>+</span>
												</div>
											</div>
											<div className="cart">
												<input type="button" value="Thêm vào giỏ" id="button-cart" className="btn btn-mega btn-lg" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
					<div className="producttab">
						<div className="tabsslider col-xs-12">
							<ul className="nav nav-tabs">
								<li className="active">
									<a data-toggle="tab" href="#tab-1">Thông tin chi tiết</a>
								</li>
							</ul>
							<div className="tab-content col-xs-12">
								<div id="tab-1" className="tab-pane fade active in">
									{data?.detail}
								</div>
							</div>
						</div>
					</div>
					{/* <ProductRelated></ProductRelated> */}
				</div>
			</div>
		</>
	)
}