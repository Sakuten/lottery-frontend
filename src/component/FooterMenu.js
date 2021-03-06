import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media (min-width: 1025px) {
    display: none;
  }
  background: #87CEEB;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
  box-shadow: 0 0 10px gray;
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 50%;
  background: ${props => setColor(props.type, props.page)};
`
const Icon = styled.div`
  color: #fff;
  font-size: 0.8rem;
`
const Text = styled.p`
  color: #fff;
  font-size: 0.6rem;
`

const setColor = (type, page) => {
  let color = '#78bfdc'
  if (page === 'lottery') {
    color = type === 'lottery' ? '#87CEEB' : '#78bfdc'
  } else if (page === 'map') {
    color = type === 'map' ? '#87CEEB' : '#78bfdc'
  } else if (page === 'groups') {
    color = type === 'groups' ? '#87CEEB' : '#78bfdc'
  } else if (page === 'info') {
    color = type === 'info' ? '#87CEEB' : '#78bfdc'
  }
  return color
}
export default class FooterMenu extends React.Component {
  moveTo = (path) => {
    this.props.router.push(path)
  }
  render () {
    return (
      <Menu>
        <Item onClick={() => this.moveTo('/lottery')} page={this.props.page} type='lottery'>
          <Icon>
            <FontAwesome name='poll' size='3x' />
          </Icon>
          <Text>
            応募
          </Text>
        </Item>
        <Item onClick={() => this.moveTo('/map')} page={this.props.page} type='map'>
          <Icon>
            <FontAwesome name='map-marked' size='3x' />
          </Icon>
          <Text>
            マップ
          </Text>
        </Item>
        <Item onClick={() => this.moveTo('/groups')} page={this.props.page} type='groups'>
          <Icon>
            <FontAwesome name='user-friends' size='3x' />
          </Icon>
          <Text>
            団体紹介
          </Text>
        </Item>
        <Item onClick={() => this.moveTo('/info')} page={this.props.page} type='info'>
          <Icon>
            <FontAwesome name='info' size='3x' />
          </Icon>
          <Text>
            案内
          </Text>
        </Item>
      </Menu>
    )
  }
}
