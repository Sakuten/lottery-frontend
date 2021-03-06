import { observable, computed, action } from 'mobx'
import {getStatus} from '../api/operation'
import qs from 'querystring'

const savedToken = localStorage.getItem('Token')
const savedKind = localStorage.getItem('Kind')
const paramSecretId = qs.parse(location.search.substr(1)).sid

export class CredentialObject {
  @observable secretId = paramSecretId || ''
  @observable recaptchaResponse = ''
  @observable token = savedToken || ''
  @observable kind = savedKind || ''
  @observable status = new Map()

  @computed get isUsedByStaff () {
    return 'staff' in qs.parse(location.search.substr(1))
  }

  @computed get isLoggedIn () {
    return this.token.length !== 0 && this.kind.length !== 0
  }

  @computed get isAbleToAuthenicate () {
    return this.secretId.length !== 0 && this.recaptchaResponse.length !== 0
  }

  @computed get isLoggedInAsChecker () {
    return this.kind === 'checker'
  }

  @action.bound setSecretId (secretId) {
    this.secretId = secretId
  }

  @action.bound setRecaptchaResponse (recaptchaResponse) {
    this.recaptchaResponse = recaptchaResponse
  }

  @action.bound setToken (token) {
    localStorage.setItem('Token', token)
    this.token = token
  }

  @action.bound setKind (kind) {
    localStorage.setItem('Kind', kind)
    this.kind = kind
  }

  @action.bound logout () {
    this.setToken('')
    this.setKind('')
    this.setSecretId('')
    this.setRecaptchaResponse('')
  }

  @action.bound setStatus (obj) {
    Object.keys(obj).forEach(key => {
      this.status.set(key, obj[key])
    })
    this.setKind(this.status.get('kind'))
  }

  @action.bound async fetchStatus () {
    const response = await getStatus(this.token)
    this.setStatus(response.data)
  }
}
