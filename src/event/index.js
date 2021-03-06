import React from 'react'

import {CredentialObject} from './credential'
import {ApplicationObject} from './application'
import {CheckerObject} from './checker'
import {ErrorObject} from './error'
import {DialogObject} from './dialog'

import {applyLottery, cancelLottery} from '../api/operation'

import LotteryListIsEmptyContent from '../component/LotteryListIsEmptyContent'
export class Event {
  constructor (store) {
    this.store = store
    this.error = new ErrorObject(store)
    this.credential = new CredentialObject(store)
    this.application = new ApplicationObject(store)
    this.dialog = new DialogObject(store)
    this.checker = new CheckerObject(store)

    // This can cause network error, to be caught in ErrorObject
    // So fetchStatus() have to be placed in here
    if (this.store.credential.isLoggedIn) { this.store.fetchStatus() }
  }

  onApplyLottery = async () => {
    this.dialog.onOpen('応募しています', 'しばらくお待ちください', 'お待ちください', false)
    if (this.store.application.lotteryList.length === 0) {
      this.dialog.onOpen('失敗しました', <LotteryListIsEmptyContent />, '戻る')
      return
    }

    if (this.store.application.classroom === 0 | this.store.application.classroom === '0') {
      this.dialog.onOpen('失敗しました', 'クラスが選択されていません', '戻る')
      return
    }
    let app
    try {
      app = await applyLottery(this.store.application.lottery, this.store.application.groupMemberList.map(pair => pair[0]), this.store.credential.token)
    } catch (err) {
      this.dialog.onClose()
      throw err
    }
    const data = app.data
    const content = (
      <div>
        <p><b>{data.lottery.name.slice(0, -2)}</b>の<b>第{data.lottery.index + 2}公演</b>です。</p>
        <p><b>{data.lottery.end_of_drawing}</b>の結果発表をお待ちください。</p>
      </div>
    )
    this.dialog.onOpen('応募しました', content, 'OK')

    this.store.application.clearInputs()
    await this.store.fetchStatus()
    if (this.store.credential.isUsedByStaff) {
      this.store.credential.logout()
    }
  }

  onCancelApplication = async (id) => {
    this.dialog.onOpen('キャンセルしています', 'しばらくお待ちください', 'お待ちください', false)
    try {
      await cancelLottery(id, this.store.credential.token)
    } catch (err) {
      this.dialog.onClose()
      throw err
    }
    this.dialog.onOpen('キャンセルしました', '応募は取り消されました', 'OK')
    await this.store.fetchStatus()
    if (this.store.credential.isUsedByStaff) {
      this.store.credential.logout()
    }
  }
}
