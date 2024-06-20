import React, { useState } from 'react';
import './Testhome.scss';
import {
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  Row,
  Col,
  Nav,
} from 'reactstrap';
import Testreservation from './Testreservation';
import Testcover from './Testcover';
import Carreviewbody from './../../Carcontent/Carreview/Carreviewbody';
import Careventbody from './../../Carcontent/Carevent/Careventbody';
import Carcontentheader from '../../Carcontent/Carcontentheader';
import Careventlist from '../../Carcontent/Carevent/Careventlist';
const Testhome = () => {
  const [State, setState] = useState('1');
  const action = (index) => {
    setState(index.toString());
    console.log(index);
  };
  return (
    <>
      <div className='maincontainer'>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={`${State === 1 ? 'active' : ''}`}
              onClick={() => action(1)}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${State === 2 ? 'active' : ''}`}
              onClick={() => action(2)}
              color='black'
            >
              예약하기
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${State === 3 ? 'active' : ''}`}
              onClick={() => action(3)}
            >
              이용방법
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${State === 4 ? 'active' : ''}`}
              onClick={() => action(4)}
            >
              이벤트
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${State === 5 ? 'active' : ''}`}
              onClick={() => action(5)}
            >
              이용후기
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={State}>
          <TabPane tabId='1'>
            <Row>
              <Col sm='12'>
                <Testcover />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='2'>
            <Row>
              <Col sm='12'>
                <Testreservation />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='3'>
            <Row>
              <Col sm='12'>
                <Testreservation />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='4'>
            <Row>
              <Col sm='12'>
                <Carcontentheader category='이벤트' />
                <Careventlist />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='5'>
            <Row>
              <Col sm='12'>
                <Carreviewbody />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};
export default Testhome;
