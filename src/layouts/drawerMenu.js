import React from 'react'
import { Drawer, Icon } from 'antd'
import styles from './index.less'
import SideMenu from './sideMenu'

// eslint-disable-next-line react/prefer-stateless-function
class DrawerMenu extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
  }

  render () {
    const { drawerVisible, closeDrawer, collapsed } = this.props

    return (
        <Drawer
          placement='left'
          closable={false}
          width={200}
          className="menuDrawer"
          onClose={ () => closeDrawer() }
          visible={drawerVisible}
        >
         <SideMenu trigger={null} collapsed={collapsed} />
          { drawerVisible
          ? <Icon type="close" className={styles.drawerClose} onClick={() => closeDrawer() } />
          : ''}
        </Drawer>

    )
  }

}

export default DrawerMenu