import { Button, Input, Space, Table, Tag, AutoComplete, Popover, Popconfirm, Avatar, Image } from 'antd';
import { useRef, useState, useEffect } from 'react';
import { SearchOutlined,DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import HtmlReactParser from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_PROJECT_SAGA, EDIT_PROJECT, GET_ALL_PROJECT_SAGA } from '../../../redux/constants/Cyberbugs/CyberbugsConst';
import { OPEN_DRAWER, GET_USER_SAGA } from './../../../redux/constants/Cyberbugs/CyberbugsConst';
import FormEditProject from '../../../components/Forms/FormEditProject/FormEditProject';

function ProjectManagement() {
    const projectList = useSelector(state => state.ProjectReducer.projectList);
    const userSearch = useSelector(state => state.UserCyberBugReducer.userSearch);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        })
    }, []);

    // const handleEdit = () => {
    //   dispatch({
    //     type: OPEN_DRAWER
    //   })
    // }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
    });

    const columns = [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: '10%',
          ...getColumnSearchProps('id'),
          sorter: (item1, item2) => {
            return item1.id - item2.id;
          }
        },
        {
          title: 'projectName',
          dataIndex: 'projectName',
          key: 'projectName',
          width: '20%',
          ...getColumnSearchProps('projectName'),
          sorter: (a, b) => {
            let projectName1 = a.projectName?.trim().toLowerCase();
            let projectName2 = b.projectName?.trim().toLowerCase();
            if (projectName1 < projectName2) {
                return -1;
            }
            return 1;
          },
        },
        // {
        //   title: 'description',
        //   dataIndex: 'description',
        //   key: 'description',
        //   ...getColumnSearchProps('description'),
        //   sorter: (a, b) => a.description.length - b.description.length,
        //   sortDirections: ['descend', 'ascend'],
        //   render: (text, record, index) => {
        //     return <div key={index}>
        //         {HtmlReactParser(text)}
        //     </div>
        //   }
        // },
        {
            title: 'categoryName',
            dataIndex: 'categoryName',
            key: 'categoryName',
            ...getColumnSearchProps('categoryName'),
            sorter: (item1, item2) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName1 < categoryName2) {
                    return -1;
                }
                return 1;
            }
        },
        {
            title: 'creator',
            dataIndex: 'creator',
            key: 'creator',
            ...getColumnSearchProps('creator'),
            render: (text, record, index) => {
                return <Tag color="blue">{record.creator?.name}</Tag>
            },
            sorter: (item1, item2) => {
                let creatorName1 = item1.creator?.name.trim().toLowerCase();
                let creatorName2 = item2.creator?.name.trim().toLowerCase();
                if (creatorName1 < creatorName2) {
                    return -1;
                }
                return 1;
            }
        },
        {
          title: 'Member',
          dataIndex: 'member',
          key: 'member',
          width: '20%',
          render: (text, record, index) => {
            return <div>
              {record.members?.slice(0,2).map((value, index) => {
              return  <Avatar key={index} src={<Image src={value.avatar} style={{ width: 32 }} />} />
              })}

              {record.members?.length > 2 ? <Avatar>...</Avatar> : ''}
              
              <Popover placement='topLeft' title={"Them thanh vien"} content={() => {
                return <AutoComplete 
                style={{width: '100%'}} 
                options={ userSearch?.map((user, index) => {
                  return {label: user.name, value: user.userId}
                })}
                onSearch={(value) => {
                  dispatch({
                    type: GET_USER_SAGA,
                    keyword: value
                  })
                }} 
                onSelect={(value, option) => {
                  console.log('userId', value)
                  console.log('option', option)
                }}
                />
              }} trigger="click">
                <Button type="primary" shape="circle">+</Button>
              </Popover>
            </div>
          }
        },
        {
            title: "Action",
            dataIndex: 'action',
            key: "action",
            render: (text, record, index) => {
              return (
                <div key={index}>
                  <button className='btn mr-2 btn-primary' onClick={() => {
                    dispatch({
                      type: OPEN_DRAWER,
                      Component: <FormEditProject/>
                    })
                    dispatch({
                      type: EDIT_PROJECT,
                      projectEditModel: record
                    })
                  }}><EditOutlined/></button>
                  <Popconfirm placement="top" title={"Are you sure to delete this task?"} onConfirm={() => {
                    dispatch({
                      type: DELETE_PROJECT_SAGA,
                      projectId: record.id
                    })
                  }} okText="Yes" cancelText="No">
                    <Button className='btn btn-danger' type='button'><DeleteOutlined/></Button>
                  </Popconfirm>
                </div>
              )
            },
      
        }
    ];
    

    return (
        <div className="container pb-2">
            <h3>Project Management</h3>
            <Table rowKey={"id"} columns={columns} dataSource={projectList} />
        </div>
    );
}

export default ProjectManagement;