import { ApplicationObject } from '../application'

describe('stores', () => {
  describe('ApplicationObject', () => {
    let store

    beforeEach(() => {
      store = new ApplicationObject()
    })

    it('can have classroom id', () => {
      store.setClassroom(2)
      expect(store.classroom).toBe(2)
    })

    it('can have lottery id', () => {
      store.setLottery(2)
      expect(store.lottery).toBe(2)
    })

    it('can add a group member', () => {
      store.addGroupMember('secret_id1', 'public_id1')
      store.addGroupMember('secret_id2', 'public_id2')
      expect(store.groupMemberList).toEqual([['secret_id1', 'public_id1'], ['secret_id2', 'public_id2']])
    })

    it('can clear user inputs', () => {
      const initialLottery = store.lottery
      const initialClassroom = store.classroom
      store.setClassroom(2)
      store.setLottery(2)
      store.addGroupMember('secret_id1', 'public_id1')
      store.addGroupMember('secret_id2', 'public_id2')
      store.clearInputs()
      expect(store.lottery).toBe(initialLottery)
      expect(store.classroom).toBe(initialClassroom)
      expect(store.groupMemberList).toEqual([])
    })

    it('can remove a group member by id', () => {
      store.addGroupMember('secret_id1', 'public_id1')
      store.addGroupMember('secret_id2', 'public_id2')
      store.removeGroupMemberById('secret_id2', 'public_id2')
      expect(store.groupMemberList).toEqual([['secret_id1', 'public_id1']])
    })

    it('can remove a group member by index', () => {
      store.addGroupMember('secret_id1', 'public_id1')
      store.addGroupMember('secret_id2', 'public_id2')
      store.removeGroupMemberByIdx(1)
      expect(store.groupMemberList).toEqual([['secret_id1', 'public_id1']])
    })

    it('can have classroom list', () => {
      store.setClassroomList([1, 2])
      expect(store.classroomList).toEqual([1, 2])
    })

    it('can have lottery list', () => {
      store.setLotteryList([1, 2])
      expect(store.lotteryList).toEqual([1, 2])
    })

    it('can have application list', () => {
      store.setApplicationList([1, 2])
      expect(store.applicationList).toEqual([1, 2])
    })

    it('fetches lottery list', async () => {
      await store.fetchLotteryList()
      expect(store.lotteryList.length).not.toBe(0)
    })

    it('fetches classroom list', async () => {
      await store.fetchClassroomList()
      expect(store.classroomList.length).not.toBe(0)
    })

    it('fetches application list', async () => {
      await store.fetchApplicationList('')
      expect(store.applicationList.length).not.toBe(0)
    })
  })
})
