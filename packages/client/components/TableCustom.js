import React, { Component } from 'react'
import { Table, Tag, Pagination, Input, Button } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { getColumn } from '../common/tableData'

class TableCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            searchedColumn: ""
        };
        this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }



    handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        this.props.handleResetData();
        if (selectedKeys) {
            this.props.getPokemonsByType(selectedKeys[0])
            this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex
            });
        }
    };

    handleReset(clearFilters) {
        clearFilters();
        this.setState({ searchText: "" });
        this.props.handleResetData();
    };

    getColumnSearchProps(dataIndex) {
        return ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters
            }) => (
                    <div style={{ padding: 8 }}>
                        <Input
                            ref={node => {
                                this.searchInput = node;
                            }}
                            placeholder={`Search ${dataIndex}`}
                            value={selectedKeys[0]}
                            onChange={e =>
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                            }
                            onPressEnter={() =>
                                this.handleSearch(selectedKeys, confirm, dataIndex)
                            }
                            style={{ width: 188, marginBottom: 8, display: "block" }}
                        />
                        <Button
                            type="primary"
                            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90, marginRight: 8 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => this.handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </div>
                ),
            filterIcon: filtered => (
                <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            render: types => (
                <span>
                    {types.map(type => (
                        <Tag color="blue" key={type}>
                            {type}
                        </Tag>
                    ))}
                </span>
            )
        })
    };


    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Classification',
                dataIndex: 'classification',
                key: 'classification'
            },
            {
                title: 'Types',
                dataIndex: 'types',
                key: 'types',
                ...this.getColumnSearchProps("types")
            },
        ];

        var dataTable;
        if (this.props.data) {
            dataTable = getColumn(this.props.data);
        }

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={dataTable}
                    rowKey="id"
                    pagination={false}
                />
                <Pagination
                    className="pagination"
                    current={this.props.page}
                    onChange={(page) => this.props.onChangePage(page, this.state.searchText)}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    total={this.props.dataPage ? this.props.dataPage.count : undefined}
                />
            </div>
        )
    }
}

export default TableCustom;