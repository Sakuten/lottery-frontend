import { CredentialObject } from '../credential'

describe('stores', () => {
  describe('CredentialObject', () => {
    let store

    beforeEach(() => {
      store = new CredentialObject()
    })

    it('can have username', () => {
      store.setUsername('username')
      expect(store.username).toBe('username')
    })

    it('can have token', () => {
      store.setToken('token')
      expect(store.token).toBe('token')
      expect(localStorage.getItem('Token')).toBe('token')
    })

    it('checks if logged in when token is set', () => {
      store.setToken('token')
      expect(store.isLoggedIn).toBe(true)
    })

    it('checks if logged in when token is not set', () => {
      expect(store.isLoggedIn).toBe(false)
    })

    it('sets status object as Map', () => {
      store.setStatus({
        username: 'Bob',
        application_history: [1, 2]
      })
      expect(store.status.get('username')).toBe('Bob')
      expect(store.status.get('application_history')[0]).toBe(1)
      expect(store.status.get('application_history')[1]).toBe(2)
    })

    it('fetches status', async () => {
      await store.fetchStatus()
      expect(store.status.size).not.toBe(0)
    })
  })
})