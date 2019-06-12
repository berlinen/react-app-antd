/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { PageHeader } from 'antd';
import {withRouter} from 'react-router-dom'
import { getRouteList } from './breadCrumb'
import RouteList from '../../router'

console.log(RouteList)

const routes = [
  {
    path: '/dashboard/analyze',
    breadcrumbName: '数据分析',
  },
  {
    path: '/dashboard/workbench',
    breadcrumbName: '工作台',
  }
];

@withRouter
class Bread extends React.Component {
  render () {
    console.log(this.props)
    const {children, contentWidth} = this.props

    return (
      <div>
        <PageHeader breadcrumb={getRouteList({routes})} wide={contentWidth === 'Fixed'}/>
        {children ? (
          <div>{children}</div>
        ): null}
      </div>
    )
  }
}

export default Bread

