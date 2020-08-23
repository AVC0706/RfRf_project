import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Skeleton } from "antd";

import UserContext from "../../context/user/userContext";
import axios from "axios";

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
      </Row>
      <br></br>
      <Row>
        {mandals ? (
          mandals.map((mandal) => (
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
              style={{ padding: "2em", margin: "2em" }}
            >
              <div
                key={mandal._id}
                onClick={() => { props.history.push(`/mandalProfile/${mandal.mandal_id}`) } }
              >
                <Card title="MANDAL NAME" style={{ width: 300 }}>
                  <h1>{mandal.name} </h1>
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
    </>
  );
}

export default MyMandal;
