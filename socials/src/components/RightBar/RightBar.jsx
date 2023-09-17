import './RightBar.scss';
import Photo from '../../assets/picc.jpeg'
const RightBar = () => {
    return(
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <span>Suggestion For You</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <span>Jane Tenet</span>
                        </div>
                        <div className="buttons">
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <span>Jane Tenet</span>
                        </div>
                        <div className="buttons">
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <p>
                                <span>Jane Tenet</span>  changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="rightnav" />
                            <p>
                                <span>Jane Tenet</span> changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <p>
                                <span>Jane Tenet</span> changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <p>
                                <span>Jane Tenet</span> changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="item">
                    <span>Online Friends</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <div className="online"/>
                            <span>Jane Tenet</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <div className="online"/>
                            <span>Jane Tenet</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <div className="online"/>
                            <span>Jane Tenet</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <div className="online"/>
                            <span>Jane Tenet</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <div className="online"/>
                            <span>Jane Tenet</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <div className="online"/>
                            <span>Jane Tenet</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <div className="online"/>
                            <span>Jane Tenet</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={Photo} alt="" />
                            <div className="online"/>
                            <span>Jane Tenet</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RightBar;