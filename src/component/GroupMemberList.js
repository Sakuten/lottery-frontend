import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

const PublicIDWrap = styled.span`
  width: 3rem;
`

const GroupMemberList = ({list, onRemove}) => (
  <div>
    {
      list.length !== 0 ? list.map((publicId, i) =>
        <div data-test='groupmemberlist-member' key={i}>
          <PublicIDWrap>
            {publicId}
          </PublicIDWrap>
          <button className='button is-danger is-outlined' data-test='groupmemberlist-remove' onClick={() => onRemove(i)}>削除</button>
        </div>
      ) : <span data-test='groupmemberlist-notfound'>一緒に応募する人はいません。</span>
    }
  </div>
)

export default observer(GroupMemberList)
