import React, { useContext } from "react";
import { Col, Layout, Menu, Row, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../../context/user/userContext";

const { Header } = Layout;
const { SubMenu } = Menu;
function Navbar() {
  const userContext = useContext(UserContext);
  const location = useLocation();
  const layout = {
    float: "right",
    backgroundColor: "#ffac42",
  };
  const subMenuStyle = {
    backgroundColor: "#ffac42",
  };
  const logo_style = {
    padding: "0px 0px 0px 25px",
    position: "absolute",
  }; const text_logo_style = {
    padding: "15px 0px 0px 30px",
    position: "absolute",
  };
  return (
    <Row>
      <Col span={2} />
      <Col span={20}>
        <Row>
          <Col lg={2}>
            <img
              src="assets\images\logo_BSM.png"
              height="128px"
              style={logo_style}
            />
          </Col>
          <Col lg={4}>
            <img
              src="assets\images\text.png"
              height="50px"
              style={text_logo_style}
            />
          </Col>
        </Row>

        <Header style={{ backgroundColor: '#d6d6d6', height: '64px' }}></Header>
        <Header style={{ backgroundColor: '#ffac42', height: '66px'}}>
          {userContext.isAuth === true && userContext.user ?
            (
              <>{location.pathname === '/dashboard' ? (<><Menu
                style={layout}
                mode="horizontal"
                defaultSelectedKeys={["1"]}
              >
                <Menu.Item key="1">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={"/myMandals"}>My Mandals</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={`/userProfile/${userContext.user.id}`}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/" onClick={userContext.logout}>
                    Logout
            </Link>
                </Menu.Item>
              </Menu></>) : (<>
                <Menu
                  style={layout}
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                >
                  <Menu.Item key="1">
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/">About Us</Link>
                  </Menu.Item>
                  <SubMenu title="Organisation Structure" style={subMenuStyle}>
                    <Menu.Item key="a1">
                      <Link to="/">National Executive Committee</Link>
                    </Menu.Item><Menu.Item key="a2">
                      <Link to="/mandalNetwork">Mandal Network Details</Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="4">
                    <Link to="/meetingArchives">Meeting Archives</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/publications">Publications</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/">Contact Us</Link>
                  </Menu.Item>
                  <SubMenu icon={<Avatar size={60}>
                    {userContext.user.name.charAt(0)}
                  </Avatar>}>
                    {userContext.user.admin != "null" && <Menu.Item key = '10'><Link to='/dashboard'>Dashboard</Link></Menu.Item>}
                    <Menu.Item key="7">
                      <Link to="/myMandals">
                        My Mandals
                        </Link>
                        </Menu.Item>
                      <Menu.Item key="8">
                        <Link to={`/userProfile/${userContext.user.id}`}>Profile</Link>
                      </Menu.Item>
                      <Menu.Item key="9">
                        <Link to="/" onClick={userContext.logout}>
                          Logout
                          </Link>
                      </Menu.Item>
                  </SubMenu>


                </Menu>
              </>)}</>
                ) : (
              <>
                  <Menu
                    style={layout}
                    mode="horizontal"
                    theme="light"
                    defaultSelectedKeys={["1"]}
                  >
                    <Menu.Item key="1">
                      <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to="/">About Us</Link>
                    </Menu.Item>
                    <SubMenu title="Organisation Structure" style={subMenuStyle}>
                      <Menu.Item key="a1">
                        <Link to="/">National Executive Committee</Link>
                      </Menu.Item><Menu.Item key="a2">
                        <Link to="/mandalNetwork">Mandal Network Details</Link>
                      </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5">
                      <Link to="/publications">Publications</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <Link to="/">Contact Us</Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                      <Link to="/login">Login</Link>
                    </Menu.Item>
                  </Menu>
                </>
            )}
        </Header>
      </Col>
        <Col span={2} />
    </Row>
  );
}

export default Navbar;
