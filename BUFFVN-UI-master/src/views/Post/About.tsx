export function About() {

    return (
        <>
            <ul className="breadcrumb">
                <li><a href="/"><i className="fa fa-home"></i></a></li>
                <li><a href="/about">Về chúng tôi</a></li>
            </ul>

            <div className="row">
                <div id="content" className="col-sm-12">
                    <div className="about-us about-demo-3">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 about-image"> <img src="https://demo.smartaddons.com/templates/html/market/image/demo/about/about-us-demo3.jpg" alt="About Us" /> </div>
                            <div className="col-lg-6 col-md-6 about-info">
                                <h2 className="about-title">Về chúng tôi</h2>
                                <div className="about-text">
                                    <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. </p>
                                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 skills-description">
                                <h2 className="about-title">Our Skills</h2>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                    <br /> Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, </p>
                            </div>
                            <div className="col-lg-6 col-md-6 skills-value">
                                <ul className="value-list blank">
                                    <li className="item">
                                        <p className="label-skill">Skill Lorem ipsum:</p>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped active" style={{ width: "90%" }}>
                                                40%
                                            </div>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <p className="label-skill">Skill donec pede:</p>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-info progress-bar-striped active" style={{ width: "95%" }}>
                                                50%
                                            </div>
                                        </div>

                                    </li>
                                    <li className="item">
                                        <p className="label-skill">Skill nulla consequat:</p>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{ width: "85%" }}>
                                                70%
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}