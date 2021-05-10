import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Icon } from 'antd';
const { Header,  Sider, Footer } = Layout;

class Lu extends React.Component {


  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header className="header" style={{ height: "60px", color: '#12406A', background: '#EB8F90' }}>
          <div className="headertext">

            <Icon type="loading" style={{ color: "Blue", fontSize: "70%", float: "left", marginTop: "2%" }} />
            &nbsp;&nbsp;&nbsp;Numerical Method
            </div>
        </Header>

        <Layout>
          <Sider width={300} style={{ background: '#12406A' }}>           
          </Sider>
          <Layout>
            
              <div id="content">
              </div>

       
          </Layout>
        </Layout>
        <Footer style={{ backgroundColor: "#FFB471", minHeight: 60 }}>
        </Footer>
      </Layout>
    );
  }
}
export default Lu;