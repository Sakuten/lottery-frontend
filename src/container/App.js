import React from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import LoginView from './LoginView'
import ApplicationView from './ApplicationView'
import ErrorList from '../component/ErrorList'
import Home from '../component/Home'
import styled from 'styled-components'
import bg from '../sakuten.jpg'

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;

  width: 100vw;
  height: 100vh;

  position: fixed;
  z-index: -10;
  top: 0;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  overflow-x: scroll;
`

const Heading = withRouter(styled.header`
  background-color: ${props => props.theme.header_color_upper};
  width: 100%;
  display: ${props => props.location.pathname === '/' ? 'none' : 'block'};
  color: #000;
  z-index: 1;
  padding: 10px;
  font-size: 2rem;
  font-family: 'Roboto Condensed';
`)

const App = ({store, event}) => {
  const { location } = store.router
  const {
    onDelete
  } = event.error

  return (
    <div location={location}>
      <Heading>KOISHIKAWA</Heading>
      <Background />
      <Container>
        <Route exact path='/' component={Home} />
        <Route path='/lottery/login' render={() => store.credential.isLoggedIn ? <Redirect to='/lottery' /> : <LoginView credential={store.credential} />} />
        <Route exact path='/lottery' render={() => store.credential.isLoggedIn ? <ApplicationView user={store.credential.status} application={store.application} /> : <Redirect to='/lottery/login' />} />
        <ErrorList list={store.error.errorList} onDelete={onDelete} />
      </Container>
    </div>
  )
}

export default inject('event')(observer(App))
