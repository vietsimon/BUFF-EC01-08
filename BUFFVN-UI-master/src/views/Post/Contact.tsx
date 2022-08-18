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
                        <h2>Contact Us</h2>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.8442639328655!2d-71.10008329902021!3d42.34584359264178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e379f63dc43ccb%3A0xa15d5aa87d0f0c12!2s4+Yawkey+Way%2C+Boston%2C+MA+02215!5e0!3m2!1sen!2s!4v1475081210943" 
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
                                        <div className="text">My Company, 42 avenue des Champs Elysées 75000 Paris France</div>
                                    </div>
                                    <div className="phone form-group">
                                        <div className="icon">
                                            <i className="fa fa-phone"></i>
                                        </div>
                                        <div className="text">Điện thoại : 0123456789</div>
                                    </div>
                                    <div className="comment">
                                        Maecenas euismod felis et purus consectetur, quis fermentum velition. Aenean egestas quis turpis vehicula.Maecenas euismod felis et purus consectetur, quis fermentum velition.
                                        Aenean egestas quis turpis vehicula.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                                    </div>
                                </address>
                            </div>
                        </div>
                        <div className="col-lg-8 col-sm-8 col-xs-12 contact-form">
                            <form action="" method="post" className="form-horizontal">
                                <fieldset>
                                    <legend>Contact Form</legend>
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