import React from 'react';
import { observer } from 'mobx-react';

const ClassroomSelect = ({list, value, onChange}) => (
  <select name="classrooms" value={value} onChange={e => onChange(e.target.value)}>
    {
      list.map(c =>
        <option value={c.id}>{c.grade} {c.name}</option>
      )
    }
  </select>
)

export default observer(ClassroomSelect)

