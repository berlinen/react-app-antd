/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { DatePicker } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;

const myDate = new Date();
const now = `${myDate.getFullYear()}/${myDate.getMonth()+1}/${myDate.getDate()}`
const nowYear = myDate.getFullYear()

const monday = moment().startOf('week').format('YYYY/MM/DD');// 周一日期
const sunday = moment().endOf('week').format('YYYY/MM/DD');// 周日日期
const numberOne = moment().startOf('month').format('YYYY/MM/DD');// 周日日期
const numberEnd = moment().endOf('month').format('YYYY/MM/DD');// 周日日期
const dateFormat = 'YYYY/MM/DD'

class DataPicker extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: 'day',
      defaultValue:[moment(now,dateFormat), moment(now,dateFormat)]
    }
  }

  selects = (e, item) => {
    this.setState( () => ({name: item}))
    item === 'day' && this.setState( () => ({ defaultValue:[moment(now,dateFormat), moment(now,dateFormat)]}))
    item === 'week' && this.setState( () => ({ defaultValue:[moment(monday,dateFormat), moment(sunday,dateFormat)]}))
    item === 'month' && this.setState( () => ({ defaultValue:[moment(numberOne,dateFormat), moment(numberEnd,dateFormat)]}))
    item === 'year' && this.setState( () => ({ defaultValue:[moment(`${nowYear}/01/01`,dateFormat), moment(`${nowYear}/12/31`,dateFormat)]}))
  }

  onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }


  onOk = (value) => {
    console.log('onOk: ', value);
  }

render () {
  const { name, defaultValue } = this.state
  return (
    <section className="datePickerrWrap">
      <div style={{marginTop: '10px'}} className="selectDate">
       <span className="selectDate"
             onClick={(e) => this.selects(e, 'day')}
             role="presentation"
             style={{color: name === 'day' ? '#0693e3' : '#666'}}>
             今日
       </span>
       <span className="selectDate"
             onClick={(e) => this.selects(e, 'week')}
             role="presentation"
             style={{color: name === 'week' ? '#0693e3' : '#666'}}>
             本周
       </span>
       <span className="selectDate"
             onClick={(e) => this.selects(e, 'month')}
             role="presentation"
             style={{color: name === 'month' ? '#0693e3' : '#666'}}>
             本月
        </span>
       <span className="selectDate"
             onClick={(e) => this.selects(e, 'year')}
             role="presentation"
             style={{color: name === 'year' ? '#0693e3' : '#666'}}>
             全年
       </span>
      </div>
      <div className="rangePicker">
       <RangePicker
         showTime={{ format: 'HH:mm' }}
         format="YYYY-MM-DD"
         placeholder={['Start Time', 'End Time']}
         defaultValue={defaultValue}
         value={defaultValue}
         onChange={this.onChange}
         onOk={this.onOk}
       />
      </div>

    </section>
  )
}

}

export default DataPicker