import { CredentialObject } from '../credential'
import { Store } from '../../store'

describe('events', () => {
  describe('CredentialObject', () => {
    let event

    beforeEach(() => {
      event = new CredentialObject(new Store())
    })

    it('changes username', () => {
      event.onChangeUsername('username')
      expect(event.store.credential.username).toBe('username')
    })

    it('clears the token in logout', () => {
      event.onLogout()
      expect(event.store.credential.token.length).toBe(0)
    })

    it('can login', async () => {
      await event.onLogin()
      expect(event.store.credential.token.length).not.toBe(0)
    })

    it('fetches status in login', async () => {
      await event.onLogin()
      expect(event.store.credential.status.size).not.toBe(0)
    })
  })
})