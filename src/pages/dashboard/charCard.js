/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Card } from 'antd';
import { connect } from 'react-redux'
import api from '../../services/index'
import CardTitle from '../../components/layout/cardTitle'
import SaleCompare from './saleCompare'
import Progress from './progress'
import { analyizeAction } from '../../store/actions'
import Areanull from '../../components/charts/Areanull'
import Bar from '../../components/charts/bar'
import './index.less'

function mapStoP(state){
 return {
  interviewLoading: state.analyizeReducer.interviewLoading
 }
}

const mapDispatchToProps = {
  modifyInterviewLoading:  analyizeAction.modifyInterviewLoading
}

class charCard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      visitorData: [],
      bardata: []
    }
  }

  async componentDidMount () {
    const visitorData = await api.dataAnalyize.getSVisitorData()

    const bardata = await api.dataAnalyize.getSaleData()
    this.setState(() => ({
      visitorData: visitorData.payload,
      bardata: bardata.payload
    }))

    setTimeout(() => {
      this.ModifyInterviewLoading(false)
     },1000)
  }

  ModifyInterviewLoading = (data) => {
    const { modifyInterviewLoading } = this.props
    modifyInterviewLoading(data)
  }

  render () {
    const {title, icon, desNum, componentName, dayDesc, interviewLoading} = this.props
    const { visitorData, bardata } = this.state

    return (
      <section>
        <Card
        loading={interviewLoading}
        bordered={false}
        style={{borderRadius: '4px'}}>

          <CardTitle title={title} icon={icon} />

          <h2 className="fontStyle-30">{desNum}</h2>

          {componentName === 'SaleCompare'
          ? <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', height: '30px'}}>
              <SaleCompare desc="周同比" descNum="12%" descIcon="up-circle" color="#f5222d" />
              <SaleCompare desc="周同比" descNum="12%" descIcon="up-circle" color="#52c41a" />
            </div>
          : ''}

          {componentName === 'activityProgress'
          ? <div style={{marginTop: '10px', height: '30px'}}>
              <Progress percent={90} strokeColor="rgb(19, 194, 194)" />
            </div>
          : ''}

          {componentName === 'dayVisitChart'
          ? <div style={{marginTop: '10px', height: '30px'}}>
              <Areanull
              height={50}
              isHasAxis={false}
              color="#975FE4"
              isHasLegend={false}
              data={visitorData} />
            </div>
          : null}

        {componentName === 'payChart'
          ? <div style={{marginTop: '10px', height: '30px'}}>
             <Bar data={bardata}
             isHasAxis={false}
             height={50}
             padding={0} />
            </div>
          : null}

          <div className="line" />

          { componentName === 'activityProgress'
          ? <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', height: '20px'}}>
              <SaleCompare desc="周同比" descNum="12%" descIcon="up-circle" color="#f5222d" />
              <SaleCompare desc="周同比" descNum="12%" descIcon="up-circle" color="#52c41a" />
            </div>
          : <p style={{height: '20px'}}>{dayDesc}</p>}
        </Card>
      </section>
    )
  }

}

export default connect(mapStoP, mapDispatchToProps)(charCard)