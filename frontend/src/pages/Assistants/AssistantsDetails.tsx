import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, LeafletMap } from '../../components/index';
import {
  AssistantBar,
  AsstDetail,
  AssistantDetailContainer,
  AsstProperty,
  PropertyContainer,
  PropertyHeading,
  PropertyList,
  ThumbNail,
  HouseItem,
  ModalStyle,
} from './Assistants.styling';
import Modal from '@material-ui/core/Modal';
import { useFetch, axiosFetch } from '../../helpers/';
import img from '../assets/ronald.jpg';
import { hostname } from 'os';
import loadingIndicator from '../utils/loading.svg';
import styled from '@emotion/styled';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const AssistantCard = (props: any) => {
  const [taskLoad, setTaskLoad] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const assistant = props.assistant;
  console.log(props);
  function handleModal() {
    setModalStatus(!modalStatus);
  }
  useEffect(
    () => {
      setTaskLoad(0);
    },
    [props.assistant],
  );
  return (
    <AssistantBar className={assistant.className}>
      <AsstDetail>
        <ThumbNail className='detail-img' src={img} alt={assistant.full_name} />
        <div className='detail-txt'>
          <h2>{assistant.full_name}</h2>
          <h3>{assistant.address}</h3>
        </div>
      </AsstDetail>
      <AsstProperty>
        <div className='button-group'>
          <Button text='Edit Assistant' />
          <Button
            onClick={() => props.goBack()}
            text=' Go Back'
            className='fas fa-arrow-left'
          />
        </div>
        <PropertyContainer>
          <PropertyHeading>
            <h2>Default Properties</h2>
            {/* <Button className='button-new' text='+ New' /> */}
          </PropertyHeading>
          <PropertyList>
            {assistant.default_house.map((house: any) =>
              taskLoad === house.house_id ? (
                <img
                  key={house.house_id}
                  src={loadingIndicator}
                  alt='animated loading indicator'
                />
              ) : (
                <HouseItem key={house.house_id}>
                  <span>
                    <i className='fas fa-home' />{' '}
                  </span>
                  {house.house_name}
                  <span
                    onClick={() => {
                      props.removeDefault(house.house_id);
                      setTaskLoad(house.house_id);
                    }}
                    className='hide'
                  >
                    <i className='pointer fas fa-arrow-down' />
                  </span>
                  <span
                    onClick={() => {
                      props.addRemoveHouse(house.house_id, false);
                      props.removeDefault(house.house_id);
                      setTaskLoad(house.house_id);
                    }}
                    className='hide'
                  >
                    <i
                      style={{ color: 'red' }}
                      className='pointer fas fa-times'
                    />
                  </span>
                </HouseItem>
              ),
            )}
          </PropertyList>
        </PropertyContainer>

        <PropertyContainer>
          <PropertyHeading>
            <h2>Available Properties</h2>
            {assistant.avl_add_houses.length === 0 ? null : (
              <Button
                onClick={handleModal}
                className='button-new'
                text='+ New'
              />
            )}
          </PropertyHeading>
          <PropertyList>
            {assistant.avl_houses.map((house: any) =>
              taskLoad === house.house_id ? (
                <img
                  key={house.house_id}
                  src={loadingIndicator}
                  alt='animated loading indicator'
                />
              ) : (
                <HouseItem key={house.house_id}>
                  <span>
                    <i className='fas fa-home' />{' '}
                  </span>
                  {house.house_name}
                  <span
                    onClick={() => {
                      props.removeDefault(house.house_id, true);
                      setTaskLoad(house.house_id);
                    }}
                    className='hide'
                  >
                    <i className='pointer fas fa-arrow-up' />
                  </span>
                  <span
                    onClick={() => {
                      props.addRemoveHouse(house.house_id, false);
                      setTaskLoad(house.house_id);
                    }}
                    className='hide'
                  >
                    <i
                      style={{ color: 'red' }}
                      className='pointer fas fa-times'
                    />
                  </span>
                </HouseItem>
              ),
            )}
          </PropertyList>
        </PropertyContainer>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={modalStatus}
          onClose={handleModal}
        >
          <ModalStyle>
            <PropertyHeading>
              <h2>Add Property</h2>
            </PropertyHeading>
            <PropertyList>
              {assistant.avl_add_houses.map((house: any) =>
                taskLoad === house.house_id ? (
                  <img
                    key={house.house_id}
                    src={loadingIndicator}
                    alt='animated loading indicator'
                  />
                ) : (
                  <HouseItem key={house.house_id}>
                    <span>
                      <i className='fas fa-home' />{' '}
                    </span>
                    <span
                      onClick={() => {
                        props.addRemoveHouse(house.house_id, true);
                        setTaskLoad(house.house_id);
                      }}
                      className='pointer'
                    >
                      {house.house_name}
                    </span>
                    <span
                      onClick={() => {
                        props.addRemoveHouse(house.house_id, true);
                        setTaskLoad(house.house_id);
                      }}
                      className='hide'
                    >
                      <i className='pointer fa fa-plus' />
                    </span>
                  </HouseItem>
                ),
              )}
              <Button
                className='modalButton'
                onClick={handleModal}
                text='close'
              />
            </PropertyList>
          </ModalStyle>
        </Modal>
      </AsstProperty>
    </AssistantBar>
  );
};

const AssistantDetails = (props: any) => {
  const { id } = props.match.params;
  const [fetch, setFetch] = useState(false);
  const [assistant, error, loading] = useFetch(
    `${url}/assistants/${id}`,
    fetch,
  );

  async function removeDefault(houseId: number, addD: boolean = false) {
    const dAst = addD ? id : null;
    const nullDefault = { default_ast: dAst };
    await axiosFetch('put', `${url}/houses/${houseId}`, nullDefault).catch(
      (e: any) => {
        console.error(e);
      },
    );
    setFetch((prev) => !prev);
  }

  async function addRemoveHouse(houseId: number, addH: boolean) {
    const addRemove = addH ? 'addHouse' : 'removeHouse';
    await axiosFetch('post', `${url}/assistants/${id}?type=${addRemove}`, {
      houseId,
    }).catch((e: any) => {
      console.error(e);
    });
    setFetch((prev) => !prev);
  }
  function goBack() {
    console.log('test');
    props.history.push('/assistants');
  }
  return (
    <AssistantDetailContainer>
      {error.error ? 'Whoops! Something went wrong! :(' : null}
      {assistant ? (
        <AssistantCard
          className='assistant-card'
          assistant={assistant}
          removeDefault={removeDefault}
          addRemoveHouse={addRemoveHouse}
          goBack={goBack}
        />
      ) : null}
      <LeafletMap />
    </AssistantDetailContainer>
  );
};

export default AssistantDetails;
