import { Menu } from 'antd';

const menuItems = [
  { key: '1', label: 'All Tasks' },
  // { key: '2', label: 'To Do' },
  // { key: '3', label: 'In Progress' },
  // { key: '4', label: 'Done' },
];

const CustomMenu = () => {
    return (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
        >
          {menuItems.map(item => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
      );
    };
    
export default CustomMenu;