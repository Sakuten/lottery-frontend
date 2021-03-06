import { ErrorObject } from '../error'
import { Store } from '../../store'
import axios from 'axios'

describe('events', () => {
  describe('ErrorObject', () => {
    let event

    beforeEach(() => {
      event = new ErrorObject(new Store())
    })

    /* eslint handle-callback-err: "off" */
    it('catches network errors', async () => {
      await axios.get('http://dummy.invalid/')
        .catch(error => {
          expect(event.store.error.errorList.length).toBe(1)
        })
    })

    it('clears token when unauthorized', () => {
      event.store.credential.token = 'token'
      event.onError(0, 'Unauthorized')
      expect(event.store.credential.token.length).toBe(0)
    })
  })
})
