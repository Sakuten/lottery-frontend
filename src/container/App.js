import React from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import { loadReCaptcha } from 'react-recaptcha-v3'
import LoginView from './LoginView'
import ApplicationView from './ApplicationView'
import CheckerView from './CheckerView'
import ErrorList from '../component/ErrorList'
import Home from '../component/Home'
import MessageDialog from '../component/MessageDialog'
import FooterMenu from '../component/FooterMenu'
import Map from '../component/Map'
import Info from '../component/Info'
import GroupIntroduction from '../component/ClassroomIntroduction'
import styled from 'styled-components'
import logo from '../header_2019.svg'

const Background = styled.div`
  background-size: cover;

  width: 100vw;
  height: 100vh;

  position: fixed;
  z-index: -10;
  top: 0;
`

const Container = styled.div`

  min-height: 100vh;

  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 100px;
`

const Heading = withRouter(styled.header`
  width: 100%;
  display: ${props => props.location.pathname === '/' ? 'none' : 'block'};
  color: #000;
  z-index: 1;
  font-size: 2rem;
  font-family: 'Roboto Condensed';
`)

const Outer = styled.div`
  overflow-x: hidden;
  position: relative;
`

@inject('event')
@observer
class App extends React.Component {
  componentDidMount () {
    loadReCaptcha(process.env.REACT_APP_RECAPTCHA_KEY)
  }

  render () {
    const { location } = this.props.store.router
    const {
      onDelete
    } = this.props.event.error

    const {
      onOpen,
      onClose
    } = this.props.event.dialog

    return (
      <Outer location={location}>
        <Heading><img src={logo} /></Heading>
        <Background />
        <Container>
          <Route exact path='/' render={() => <Home isUsedByStaff={this.props.store.credential.isUsedByStaff} />} />
          <Route exact path='/checker' render={() => this.props.store.credential.isLoggedInAsChecker ? <CheckerView store={this.props.store} /> : <Redirect to='/lottery/login' />} />
          <Route path='/lottery/login' render={() => this.props.store.credential.isLoggedIn ? <Redirect to='/lottery' /> : <LoginView credential={this.props.store.credential} />} />
          <Route exact path='/lottery' render={() => this.props.store.credential.isLoggedIn ? this.props.store.credential.isLoggedInAsChecker ? <Redirect to='/checker' /> : <ApplicationView credential={this.props.store.credential} application={this.props.store.application} /> : <Redirect to='/lottery/login' />} />
          <Route exact path='/map' component={Map} />
          <Route exact path='/groups' component={GroupIntroduction} />
          <Route exact path='/info' component={Info} />
          <ErrorList list={this.props.store.error.errorList} onDelete={onDelete} onShowDetails={msg => onOpen('エラー詳細', JSON.stringify(msg), '閉じる')} />
          <MessageDialog title={this.props.store.dialog.title} buttonText={this.props.store.dialog.buttonText} isButtonEnabled={this.props.store.dialog.isButtonEnabled} isOpen={this.props.store.dialog.isOpen} onClose={onClose}>
            {this.props.store.dialog.content}
          </MessageDialog>
        </Container>
        <Route exact path='/' render={() => <FooterMenu router={this.props.store.router} page='lottery' />} />
        <Route path='/lottery' render={() => <FooterMenu router={this.props.store.router} page='lottery' />} />
        <Route exact path='/map' render={() => <FooterMenu router={this.props.store.router} page='map' />} />
        <Route exact path='/groups' render={() => <FooterMenu router={this.props.store.router} page='groups' />} />
        <Route exact path='/info' render={() => <FooterMenu router={this.props.store.router} page='info' />} />
      </Outer>
    )
  }
}

export default App
