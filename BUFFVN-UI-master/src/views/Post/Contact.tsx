export function Contact() {

    return (
        <>
            <ul className="breadcrumb">
                <li><a href="/"><i className="fa fa-home"></i></a></li>
                <li><a href="/contact">Liên hệ</a></li>
            </ul>

            <div className="row">
                <div id="content" className="col-sm-12">
                    <div className="page-title">
                        <h2>Liên hệ</h2>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.576392688455!2d106.69001321477133!3d10.767093992327867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f163cb6cf2b%3A0x790bbb732c9dda0e!2zMTQ1QiBQaOG6oW0gTmfFqSBMw6NvLCBQaMaw4budbmcgUGjhuqFtIE5nxakgTMOjbywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1661185820157!5m2!1svi!2s" 
                    width="100%"
                    height="350" 
                    frameBorder={0} style={{border:0}} allowFullScreen={true}></iframe>
                    <div className="info-contact clearfix">
                        <div className="col-lg-4 col-sm-4 col-xs-12 info-store">
                            <div className="row">
                                <div className="name-store">
                                    <h3>Market</h3>
                                </div>
                                <address>
                                    <div className="address clearfix form-group">
                                        <div className="icon">
                                            <i className="fa fa-home"></i>
                                        </div>
                                        <div className="text">145B Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh</div>
                                    </div>
                                    <div className="phone form-group">
                                        <div className="icon">
                                            <i className="fa fa-phone"></i>
                                        </div>
                                        <div className="text">Điện thoại : 0123456789</div>
                                    </div>
                                    <div className="comment">
                                       Mọi thắc mắc liên hệ với chúng tôi
                                    </div>
                                </address>
                            </div>
                        </div>
                        <div className="col-lg-8 col-sm-8 col-xs-12 contact-form">
                            <form action="" method="post" className="form-horizontal">
                                <fieldset>
                                    <legend>Điền mẫu</legend>
                                    <div className="form-group required">
                                        <label className="col-sm-2 control-label" >Họ và tên</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="name" value="" id="input-name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group required">
                                        <label className="col-sm-2 control-label" >Email</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="email" value="" id="input-email" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group required">
                                        <label className="col-sm-2 control-label" >Nội dung</label>
                                        <div className="col-sm-10">
                                            <textarea name="enquiry" rows={10} id="input-enquiry" className="form-control"></textarea>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="buttons">
                                    <div className="pull-right">
                                        <button className="btn btn-default buttonGray" type="submit">
                                            <span>Gửi</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}