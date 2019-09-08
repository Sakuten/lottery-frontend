import React from 'react'
import { observer } from 'mobx-react'

const LotteryView = ({list, classroom, onChange}) => (
  <div>
    {
      list.length !== 0 ? list
        .filter(c => c.classroom_id === Number(classroom))
        .map(c => <PerformanceNumber onChange={onChange} c={c} />) : <span data-test='lottery-notfound'>現在応募は受け付けておりません。</span>
    }
  </div>
)

class PerformanceNumber extends React.Component {
  componentWillMount () {
    this.props.onChange(this.props.c.id)
  }
  render () {
    const { c } = this.props
    return <span data-test='lottery-lottery' key={c.id} value={c.id}>第{c.index + 2}公演</span>
  }
}
export default observer(LotteryView)
