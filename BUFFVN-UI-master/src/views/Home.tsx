export function Home() {

    return (
        <>
            <ul className="breadcrumb">
                <li><a href="#"><i className="fa fa-home"></i></a></li>
                <li><a href="#">Account</a></li>
                <li><a href="#">Login</a></li>
            </ul>
            <div className="row">
                <div id="content" className="col-sm-12">
                    <div className="page-login">

                        <div className="account-border">
                            <div className="row">
                                <div className="col-sm-6 new-customer">
                                    <div className="well">
                                        <h2><i className="fa fa-file-o" aria-hidden="true"></i> New Customer</h2>
                                        <p>By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.</p>
                                    </div>
                                    <div className="bottom-form">
                                        <a href="#" className="btn btn-default pull-right">Continue</a>
                                    </div>
                                </div>

                                <form action="#" method="post" >
                                    <div className="col-sm-6 customer-login">
                                        <div className="well">
                                            <h2><i className="fa fa-file-text-o" aria-hidden="true"></i> Returning Customer</h2>
                                            <p><strong>I am a returning customer</strong></p>
                                            <div className="form-group">
                                                <label className="control-label " >E-Mail Address</label>
                                                <input type="text" name="email" value="" id="input-email" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label " >Password</label>
                                                <input type="password" name="password" value="" id="input-password" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="bottom-form">
                                            <a href="#" className="forgot">Forgotten Password</a>
                                            <input type="submit" value="Login" className="btn btn-default pull-right" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}