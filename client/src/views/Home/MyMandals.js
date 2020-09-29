import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Skeleton, Layout } from "antd";

import UserContext from "../../context/user/userContext";
import axios from "axios";
const { Content } = Layout;
function MyMandal(props) {
  //start

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      getMandals();
    }
  }, [userContext.isAuth]);

  const [mandals, setMandals] = useState([]);

  const getMandals = () => {
    axios
      .get("http://localhost:5000/api/user/myMandals")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.user);
          setMandals(res.data.user.mandals);
          console.log(mandals);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Layout>
            <Content>

              <Col
                xs={{ span: 5, offset: 1 }}
                lg={{ span: 6, offset: 2 }}
                style={{ padding: "2em", margin: "2em" }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    props.history.push("/mandalRegister");
                  }}
                >
                  Add Mandal
          </Button>
              </Col>
              <Row>
                {mandals ? (
                  mandals.map((mandal) => (
                    <Col
                      xs={{ span: 5, offset: 1 }}
                      lg={{ span: 4, offset: 2 }}
                      style={{ padding: "2em", margin: "2em" }}
                    >
                      <div
                        key={mandal._id}
                        onClick={() => { props.history.push(`/mandalProfile/${mandal.mandal_id}`) }}
                      >
                        <Card style={{ width: 300 ,height:250 }} hoverable={true}>
                          <h1 style={{textAlign:'center'}}>{mandal.name} </h1>
                        </Card>{" "}
                      </div>
                    </Col>
                  ))
                ) : (
                    <Skeleton />
                  )}

                {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{ padding: "2em", margin: "2em" }}>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>{" "}
        </Col> */}
              </Row>

            </Content>
          </Layout>
        </Col>

      </Row>
    </>
  );
}

export default MyMandal;
